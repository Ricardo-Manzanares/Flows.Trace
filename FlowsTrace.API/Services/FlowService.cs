using FlowsTrace.API.Models;
using FlowsTrace.API.Models.Flow;
using FlowsTrace.API.Utils;
using FlowsTrace.Services.API;
using Microsoft.Xrm.Sdk;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static FlowsTrace.API.Models.Enums;
using static System.Collections.Specialized.BitVector32;

namespace FlowsTrace.API.Services
{
    public class FlowService
    {
        private AccessToken _token;
        private string _environment_url;
        private string _environment_id;
        private string _client_id;
        private string _client_secret;
        private string _tenant_id;
        private ITracingService _tracingService;

        private const string _pathRunIdReplace = "/providers/Microsoft.ProcessSimple/";
        private const string _environmentRunIdReplace = "https://make.powerautomate.com/";
        private const string _pathRuns = "https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments";

        public FlowService(string environment_url, string envionment_id, string client_id, string client_secret, string tenant_id, ITracingService tracingService)
        {
            _environment_url = environment_url;
            _environment_id = envionment_id;
            _client_id = client_id;
            _client_secret = client_secret;
            _tenant_id = tenant_id;
            _tracingService = tracingService;
        }

        public List<FlowTraceResponse> GetFlowsFromRecord(string recordId, List<FlowTraceResponse> flows, FilterRangeExecution filterRangeExecution)
        {
            string traceRecordId = "DynamicsService - GetFlowsFromRecord : " + recordId;
            if (_tracingService != null)
                _tracingService.Trace(traceRecordId);
            else
                System.Diagnostics.Trace.WriteLine(traceRecordId);

            List<FlowTraceResponse> flowsResult = new List<FlowTraceResponse>();
            try
            {
                _token = AuthenticationService.GetToken(_environment_url, _client_id, _client_secret, _tenant_id, _tracingService);

                if (_token != null)
                {
                    //Get runs from flow
                    
                    var parallelOptions = new ParallelOptions { MaxDegreeOfParallelism = 2 };

                    var filterYesterdateStart = string.Empty;
                    var filterYesterdateEnd = DateTime.Now.ToLocalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");

                    switch (filterRangeExecution)
                    {
                        case FilterRangeExecution.LastHalfHour:
                            filterYesterdateStart = DateTime.Now.ToLocalTime().AddMinutes(-30).ToString("yyyy-MM-ddTHH:mm:ssZ");
                            break;
                        case FilterRangeExecution.LastHour:
                            filterYesterdateStart = DateTime.Now.ToLocalTime().AddMinutes(-60).ToString("yyyy-MM-ddTHH:mm:ssZ");
                            break;
                        case FilterRangeExecution.Today:
                            filterYesterdateStart = DateTime.Now.ToLocalTime().ToString("yyyy-MM-ddT00:00:00Z");
                            break;
                        case FilterRangeExecution.Yesterday:
                            filterYesterdateStart = DateTime.Now.ToLocalTime().AddDays(-1).ToString("yyyy-MM-ddT00:00:00Z");
                            break;
                        case FilterRangeExecution.Last48Hours:
                            filterYesterdateStart = DateTime.Now.ToLocalTime().AddDays(-2).ToString("yyyy-MM-ddT00:00:00Z");
                            break;
                        case FilterRangeExecution.SinceLastWeek:
                            filterYesterdateStart = DateTime.Now.ToLocalTime().AddDays(-7).ToString("yyyy-MM-ddT00:00:00Z");
                            break;
                        default:
                            throw new InvalidEnumArgumentException("DynamicsService - GetFlowsFromRecord : FilterRangeExecution not valid");
                            break;
                    }

                    Parallel.ForEach(flows, parallelOptions, flow =>
                    {
                        var client = new HttpClient();
                        var runsFlowRequest = new HttpRequestMessage(HttpMethod.Get, string.Format("{0}/{1}/flows/{2}/runs?$filter=starTtime ge {3} and startTime le {4}", _pathRuns, _environment_id, flow.Id, filterYesterdateStart, filterYesterdateEnd));
                        runsFlowRequest.Headers.Add("Authorization", "Bearer " + _token.access_token);
                        var runsFlowResponse = client.SendAsync(runsFlowRequest).Result;
                        if (runsFlowResponse.StatusCode == HttpStatusCode.OK)
                        {
                            runsFlowResponse.EnsureSuccessStatusCode();
                            var responseRunsFlowJSON = runsFlowResponse.Content.ReadAsStringAsync().Result;

                            #region Validate Record in Trigger
                            FlowRunsResponse flowRunsResponse = JsonConvert.DeserializeObject<FlowRunsResponse>(responseRunsFlowJSON);
                            foreach (var run in flowRunsResponse.value)
                            {
                                var triggerOutPutsLink = run.properties.trigger.outputsLink;

                                if (triggerOutPutsLink != null)
                                {
                                    var triggerOutPutsLinkResponse = client.SendAsync(new HttpRequestMessage(HttpMethod.Get, triggerOutPutsLink.uri)).Result;
                                    ValidateMessage(triggerOutPutsLinkResponse, recordId, run, flow, flowsResult);
                                }

                                #region Validate Record in Action
                                var runFlowRequest = new HttpRequestMessage(HttpMethod.Get, string.Format("{0}/{1}/flows/{2}/runs/{3}/?$expand=properties/actions,properties/flow", _pathRuns, _environment_id, flow.Id, run.name));
                                runFlowRequest.Headers.Add("Authorization", "Bearer " + _token.access_token);
                                var runFlowResponse = client.SendAsync(runFlowRequest).Result;
                                if (runFlowResponse.StatusCode == HttpStatusCode.OK)
                                {
                                    runFlowResponse.EnsureSuccessStatusCode();
                                    var responseRunFlowJSON = runFlowResponse.Content.ReadAsStringAsync().Result;

                                    FlowRunResponse flowRunResponse = JsonConvert.DeserializeObject<FlowRunResponse>(responseRunFlowJSON);

                                    var actions = flowRunResponse.properties.actions;

                                    foreach (var action in actions)
                                    {
                                        if (action.Value != null)
                                        {
                                            if (action.Value.inputsLink != null)
                                            {
                                                var triggerRunInPutsLinkResponse = client.SendAsync(new HttpRequestMessage(HttpMethod.Get, action.Value.inputsLink.uri)).Result;
                                                ValidateMessage(triggerRunInPutsLinkResponse, recordId, run, flow, flowsResult, action.Key, action.Value);
                                            }
                                            if (action.Value.outputsLink != null)
                                            {
                                                var triggerRunOutPutsLinkResponse = client.SendAsync(new HttpRequestMessage(HttpMethod.Get, action.Value.outputsLink.uri)).Result;
                                                ValidateMessage(triggerRunOutPutsLinkResponse, recordId, run, flow, flowsResult, action.Key, action.Value);
                                            }
                                        }
                                    }                                    
                                }
                                #endregion
                            }
                            #endregion
                        }
                    });
                }

                return flowsResult;
            }
            catch (Exception ex)
            {
                string error = "Execute error in DynamicsService - GetFlowsFromRecord : " + ex.ToString() + " - StackTrace:" + ex.StackTrace;
                if (_tracingService != null)
                    _tracingService.Trace(error);
                else
                    System.Diagnostics.Trace.WriteLine(error);
                throw;
            }
        }

        private void ValidateMessage (HttpResponseMessage messege, string recordId, FlowRunsReponseValue run, FlowTraceResponse flow, List<FlowTraceResponse> flowsResult, string actionName = null, CustomAction action = null)
        {
            if (messege.StatusCode == HttpStatusCode.OK)
            {
                messege.EnsureSuccessStatusCode();

                IEnumerable<dynamic> properties = null;

                using (var stringReader = new StringReader(messege.Content.ReadAsStringAsync().Result))
                using (var jsonReader = new JsonTextReader(stringReader))
                {
                    var jsonObject = JObject.Load(jsonReader);

                    foreach (var node in new List<string> { "body", "parameters", "value" })
                    {
                        if (jsonObject[node] != null && properties == null)
                        {
                            properties = jsonObject[node].Children().ToList();
                        }
                    }
                }

                Guid guidParse = Guid.Empty;

                if (properties == null || properties.Count() == 0)
                    return;

                foreach (var property in properties.Where(property => property != null && !String.IsNullOrEmpty(property.Value.ToString()) && Guid.TryParse(property.Value.ToString(), out guidParse)).Select(property => Guid.Parse(property.Value.ToString())))
                {
                    if (property == Guid.Parse(recordId))
                    {

                        lock (flowsResult)
                        {
                            if (!flowsResult.Any(f => f.RunName == run.name && (actionName == null || f.Action == actionName)))
                            {
                            
                                FlowTraceResponse flowNew = new FlowTraceResponse();
                                flowNew.Status = flow.Status;
                                flowNew.Id = flow.Id;
                                flowNew.WorkflowId = flow.WorkflowId;
                                flowNew.Name = flow.Name;
                                flowNew.DateExecution = run.properties.startTime;

                                if (actionName != null && action != null)
                                {
                                    flowNew.RunStatus = Enum.TryParse(run.properties.status, out FlowRunStatus statusRunFlow) ? statusRunFlow : FlowRunStatus.Unknown;
                                    flowNew.RunId = run.id.Replace(_pathRunIdReplace, _environmentRunIdReplace);
                                    flowNew.RunName = run.name;
                                    flowNew.Action = actionName;
                                    flowNew.ActionStatus = Enum.TryParse(action.status, out FlowRunStatus statusAction) ? statusAction : FlowRunStatus.Unknown;
                                    flowNew.DateExecution = action.startTime;
                                }
                                flowsResult.Add(flowNew);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}
