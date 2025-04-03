using FlowsTrace.API.Models;
using FlowsTrace.API.Services;
using FlowsTrace.API.Utils;
using FlowsTrace.Services.API;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Newtonsoft.Json;
using System;
using System.Linq;

namespace FlowsTrace.API
{
    public class FlowsTrace : IPlugin
    {
        const string parameterInputName = "axa_flowstracerequest";
        const string parameterOutputName = "axa_flowstraceresponse";

        IPluginExecutionContext _context;
        IOrganizationServiceFactory _serviceFactory;
        IOrganizationService _service;
        ITracingService _tracingService;

        public void Execute(IServiceProvider serviceProvider)
        {
            #region Config
            _context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            _serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            _service = _serviceFactory.CreateOrganizationService(_context.UserId);
            _tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            #endregion

            try
            {
                _tracingService.Trace("FlowsTrace init");

                if (!FlowsTraceUtils.ValidationExecutionCustomAPI(_context, out Exception ex))
                {
                    throw new Exception(ex.Message);
                }

                if (!_context.InputParameters.ContainsKey(parameterInputName))
                {
                    throw new Exception("FlowsTrace not found parameter " + parameterInputName);
                }

                FlowTraceRequest parameters = JsonConvert.DeserializeObject<FlowTraceRequest>(_context.InputParameters[parameterInputName].ToString());

                FlowTraceAPIResponse response = new FlowTraceAPIResponse();
                response.error = false;

                if (String.IsNullOrEmpty(parameters.record_id))
                {
                    response.error = true;
                    response.message = "FlowsTrace Not found record_id";
                }

                Enums.FilterRangeExecution filter_range_execution;
                if (!Enum.TryParse(parameters.filter_range_execution, out filter_range_execution))
                {
                    response.error = true;
                    response.message = "FlowsTrace Not valid parse filter_range_execution with value " + parameters.filter_range_execution;
                }

                if(!response.error)
                {
                    _tracingService.Trace("FlowsTrace record_id " + parameters.record_id);
                    _tracingService.Trace("FlowsTrace filter_range_execution " + parameters.filter_range_execution);

                    var dynamicsService = new DynamicsService(_service, _tracingService);
                    var environmentsValues = dynamicsService.GetEnvironmentsValues();

                    var requestOrganizationRequest = new RetrieveCurrentOrganizationRequest();
                    var responseOrganizationRequest = (RetrieveCurrentOrganizationResponse)_service.Execute(requestOrganizationRequest);
                    if (responseOrganizationRequest != null)
                    {
                        environmentsValues.environment_url = responseOrganizationRequest.Detail.Endpoints.Where(k => k.Key == Microsoft.Xrm.Sdk.Organization.EndpointType.WebApplication).First().Value;
                        environmentsValues.environment_id = responseOrganizationRequest.Detail.EnvironmentId;
                    }

                    _tracingService.Trace("FlowsTrace Organization Name " + _context.OrganizationName);
                    _tracingService.Trace("FlowsTrace client_id " + environmentsValues.client_id);
                    _tracingService.Trace("FlowsTrace environment_id " + environmentsValues.environment_id);
                    _tracingService.Trace("FlowsTrace Environment URL " + environmentsValues.environment_url);
                    _tracingService.Trace("FlowsTrace tenant_id " + environmentsValues.tenant_id);

                    var flows = dynamicsService.GetFlowsFromEnvironment();

                    var flowService = new FlowService(environmentsValues.environment_url, environmentsValues.environment_id, environmentsValues.client_id, environmentsValues.client_secret, environmentsValues.tenant_id, _tracingService);

                    var flowsRunningFromRecord = flowService.GetFlowsFromRecord(parameters.record_id, flows, filter_range_execution);

                    _tracingService.Trace("FlowsTrace flowsRunningFromRecord " + flowsRunningFromRecord.Count);

                    response.error = false;
                    response.message = "FlowsTrace success";
                    response.data = flowsRunningFromRecord;
                }

                _context.OutputParameters[parameterOutputName] = JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                _tracingService.Trace("Execute error in FlowsTrace : " + ex.ToString());
                throw new InvalidPluginExecutionException(ex.Message);
            }           
        }
    }
}
