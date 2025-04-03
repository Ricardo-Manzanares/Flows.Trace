using FlowsTrace.API.Models;
using FlowsTrace.API.Models.Flow;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;

namespace FlowsTrace.Services.API
{
    public class DynamicsService
    {
        private IOrganizationService _service;
        private ITracingService _tracingService;

        public DynamicsService(IOrganizationService service, ITracingService tracingService)
        {
            _service = service;
            _tracingService = tracingService;
        }

        public EnvironmentsValues GetEnvironmentsValues()
        {
            EnvironmentsValues environmentsValues = new EnvironmentsValues();

            try
            {
                var queryEnvironmentValues = new QueryExpression("environmentvariabledefinition")
                {
                    ColumnSet = new ColumnSet("schemaname", "defaultvalue"),
                    Criteria = {
                    FilterOperator = LogicalOperator.Or,
                    Conditions =
                    {
                        new ConditionExpression("schemaname", ConditionOperator.Equal, "axa_flowstraceclientid"),
                        new ConditionExpression("schemaname", ConditionOperator.Equal, "axa_flowstracetenantid"),
                        new ConditionExpression("schemaname", ConditionOperator.Equal, "axa_flowstracesecretid")
                    }
                }
                };

                var environmentValuesResponse = _service.RetrieveMultiple(queryEnvironmentValues);
                if (environmentValuesResponse != null && environmentValuesResponse.Entities != null)
                {
                    foreach (var environmentValue in environmentValuesResponse.Entities)
                    {
                        if (environmentValue["schemaname"].ToString() == "axa_flowstraceclientid")
                            environmentsValues.client_id = environmentValue["defaultvalue"].ToString();
                        if (environmentValue["schemaname"].ToString() == "axa_flowstracesecretid")
                            environmentsValues.client_secret = environmentValue["defaultvalue"].ToString();
                        if (environmentValue["schemaname"].ToString() == "axa_flowstracetenantid")
                            environmentsValues.tenant_id = environmentValue["defaultvalue"].ToString();
                    }
                }

               
            }
            catch (Exception ex)
            {
                string error = "Execute error in DynamicsService - GetEnvironmentsValues : " + ex.ToString() + " - StackTrace:" + ex.StackTrace;
                if (_tracingService != null)
                    _tracingService.Trace(error);
                else
                    System.Diagnostics.Trace.WriteLine(error);
            }

            return environmentsValues;
        }

        public List<FlowTraceResponse> GetFlowsFromEnvironment()
        {
            try
            {
                List<FlowTraceResponse> flows = new List<FlowTraceResponse>();
                var queryFlows = new QueryExpression("workflow")
                {
                    ColumnSet = new ColumnSet("workflowid", "workflowidunique", "name", "statecode", "statuscode", "ismanaged"),
                    Criteria =
                    {
                        Conditions =
                        {
                            new ConditionExpression("category", ConditionOperator.Equal, 5),
                            new ConditionExpression("ismanaged", ConditionOperator.Equal, false)
                        }
                    }
                };
                var flowsResponse = _service.RetrieveMultiple(queryFlows);
                if (flowsResponse != null && flowsResponse.Entities != null && flowsResponse.Entities.Count > 0)
                {
                    foreach (var flow in flowsResponse.Entities)
                    {
                        flows.Add(new FlowTraceResponse
                        {
                            Name = flow["name"].ToString(),
                            Id = flow["workflowid"].ToString(),
                            WorkflowId = Guid.Parse(flow["workflowidunique"].ToString()),
                            Status = (FlowStatus)((OptionSetValue)flow["statecode"]).Value,
                        });
                    }
                }
                return flows;
            }
            catch (Exception ex)
            {
                string error = "Execute error in DynamicsService - GetFlowsFromEnvironment : " + ex.ToString() + " - StackTrace:" + ex.StackTrace;
                if (_tracingService != null)
                    _tracingService.Trace(error);
                else
                    System.Diagnostics.Trace.WriteLine(error);
                throw;
            }            
        }
    }
}
