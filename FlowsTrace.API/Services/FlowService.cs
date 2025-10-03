using FlowsTrace.API.Models;
using FlowsTrace.API.Models.Flow;
using FlowsTrace.Services.API;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.PluginTelemetry;
using Microsoft.Xrm.Sdk.Query;
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
        private string _timeZoneUser;
        private ITracingService _tracingService;

        private const string _pathRunIdReplace = "/providers/Microsoft.ProcessSimple/";
        private const string _environmentRunIdReplace = "https://make.powerautomate.com/";
        private const string _pathRuns = "https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments";

        public FlowService(string timeZoneUser, string environment_url, string envionment_id, string client_id, string client_secret, string tenant_id, ITracingService tracingService)
        {
            _timeZoneUser = timeZoneUser;
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

                    var userTz = TimeZoneInfo.FindSystemTimeZoneById(_timeZoneUser);

                    // 2. Hora actual UTC y local
                    var nowUtc = DateTime.UtcNow;
                    var nowLocal = TimeZoneInfo.ConvertTimeFromUtc(nowUtc, userTz);

                    // 3. Filter end siempre en UTC
                    var filterEnd = nowUtc.ToString("yyyy-MM-ddTHH:mm:ssZ");

                    var filterFrom = string.Empty;

                    switch (filterRangeExecution)
                    {
                        case FilterRangeExecution.LastHalfHour:
                            filterFrom = nowUtc.AddMinutes(-30).ToString("yyyy-MM-ddTHH:mm:ssZ");
                            break;

                        case FilterRangeExecution.LastHour:
                            filterFrom = nowUtc.AddHours(-1).ToString("yyyy-MM-ddTHH:mm:ssZ");
                            break;

                        case FilterRangeExecution.Today:
                            {
                                var todayLocal = new DateTime(nowLocal.Year, nowLocal.Month, nowLocal.Day, 0, 0, 0, DateTimeKind.Unspecified);
                                var todayUtc = TimeZoneInfo.ConvertTimeToUtc(todayLocal, userTz);
                                filterFrom = todayUtc.ToString("yyyy-MM-ddTHH:mm:ssZ");
                            }
                            break;

                        case FilterRangeExecution.Yesterday:
                            {
                                var yesterdayLocal = new DateTime(nowLocal.Year, nowLocal.Month, nowLocal.Day, 0, 0, 0, DateTimeKind.Unspecified).AddDays(-1);
                                var yesterdayUtc = TimeZoneInfo.ConvertTimeToUtc(yesterdayLocal, userTz);
                                filterFrom = yesterdayUtc.ToString("yyyy-MM-ddTHH:mm:ssZ");
                            }
                            break;

                        case FilterRangeExecution.Last48Hours:
                            {
                                // Arranca desde "hace 2 días a medianoche local"
                                var baseLocal = new DateTime(nowLocal.Year, nowLocal.Month, nowLocal.Day, 0, 0, 0, DateTimeKind.Unspecified).AddDays(-2);
                                var baseUtc = TimeZoneInfo.ConvertTimeToUtc(baseLocal, userTz);
                                filterFrom = baseUtc.ToString("yyyy-MM-ddTHH:mm:ssZ");
                            }
                            break;

                        case FilterRangeExecution.SinceLastWeek:
                            {
                                // Arranca desde "hace 7 días a medianoche local"
                                var baseLocal = new DateTime(nowLocal.Year, nowLocal.Month, nowLocal.Day, 0, 0, 0, DateTimeKind.Unspecified).AddDays(-7);
                                var baseUtc = TimeZoneInfo.ConvertTimeToUtc(baseLocal, userTz);
                                filterFrom = baseUtc.ToString("yyyy-MM-ddTHH:mm:ssZ");
                            }
                            break;

                        default:
                            throw new InvalidEnumArgumentException(
                                "DynamicsService - GetFlowsFromRecord : FilterRangeExecution not valid"
                            );
                    }

                    if (_tracingService != null)
                    {
                        _tracingService.Trace("DynamicsService - GetFlowsFromRecord : Filter from : " + filterFrom);
                        _tracingService.Trace("DynamicsService - GetFlowsFromRecord : Filter end : " + filterEnd);
                    }

                    Parallel.ForEach(flows, parallelOptions, flow =>
                    {
                        var client = new HttpClient();
                        var runsFlowRequest = new HttpRequestMessage(HttpMethod.Get, string.Format("{0}/{1}/flows/{2}/runs?$filter=starTtime ge {3} and startTime le {4}", _pathRuns, _environment_id, flow.Id, filterFrom, filterEnd));
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

                    foreach (var node in new List<string> { "headers", "body", "parameters", "value", "variables" })
                    {
                        if (jsonObject[node] != null && properties == null)
                        {
                            switch (node)
                            {
                                case "variables":
                                    properties = FilterProperties(jsonObject[node].Children().ToList().Children().ToList());
                                    break;
                                default:
                                    properties = FilterProperties(jsonObject[node].Children().ToList());
                                    break;
                            }
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
                                flowNew.RunStatus = Enum.TryParse(run.properties.status, out FlowRunStatus statusRunFlow) ? statusRunFlow : FlowRunStatus.Unknown;
                                flowNew.RunId = run.id.Replace(_pathRunIdReplace, _environmentRunIdReplace);
                                flowNew.RunName = run.name;
                                flowNew.DateExecution = run.properties.startTime;
                                if (actionName != null && action != null)
                                {
                                   
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
        private IEnumerable<dynamic> FilterProperties(IEnumerable<dynamic> properties)
        {
            // List of proerties to exclude from the results
            var excludedProperties = new HashSet<string>
           {
                "accept",
                "entityName",
                "@odata.context",
                "@odata.etag",
                "@OData.Community.Display.V1.FormattedValue",
                "merged",
                "schema",
                "contentVersion",
                "defaultValue",
                "metadata",
                "kind",
                "connection",
                "connectionReferenceKey",
                "operationId",
                "api",
                "apiVersion",
                "authentication",
                "modifiedon@OData.Community.Display.V1.FormattedValue",
                "modifiedon",
                "statecode@OData.Community.Display.V1.FormattedValue",
                "statecode",
                "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname",
                "_modifiedby_type",
                "name",
                "type"
           };

            // Filter properties based on the excluded list
            return properties.Where(property => property != null && !excludedProperties.Contains(property.Name)).ToList();
        }
    }
}
