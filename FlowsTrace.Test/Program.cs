using FlowsTrace.API;
using FlowsTrace.API.Models;
using FlowsTrace.API.Services;
using FlowsTrace.Services.API;
using FlowsTrace.Test;
using Microsoft.Extensions.Configuration;
using Microsoft.Xrm.Sdk;
using System.Data;


var builder = new ConfigurationBuilder();
builder.SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
IConfigurationRoot configuration = builder.Build();

Console.WriteLine("FlowsTrace.Test init...");

if(configuration["environment_url"] == null || configuration["environment_id"] == null || configuration["client_id"] == null || configuration["client_secret"] == null || configuration["tenant_id"] == null)
{
    Console.WriteLine("Configuration in appsettings.json not found : environment, client_id, client_secret or tenant_id any is null");
    Console.ReadLine();
    return;
}

/* Get Token */
//var token = AuthenticationService.GetToken(configuration["environment_url"].ToString(), configuration["client_id"].ToString(), configuration["client_secret"].ToString(), configuration["tenant_id"].ToString(), null);

/* Get Service */
var service = CRMConnection.GetConnection(configuration["environment_url"].ToString(), configuration["client_id"].ToString(), configuration["client_secret"].ToString());

/* Get Dynamics Service */
var dynamicService = new DynamicsService(service, null);

/* Get Environments Values */
//var EnvironmentsValues = dynamicService.GetEnvironmentsValues();

/* Get Flows */
var flows = dynamicService.GetFlowsFromEnvironment();

foreach (var flow in flows)
{
    Console.WriteLine("Flow to validate "+ flow.Name);
}


var flowService = new FlowService(configuration["environment_url"].ToString(), configuration["environment_id"].ToString(), configuration["client_id"].ToString(), configuration["client_secret"].ToString(), configuration["tenant_id"].ToString(), null);
Enums.FilterRangeExecution filter = Enums.FilterRangeExecution.SinceLastWeek;

Console.WriteLine("Filter apply " + filter.ToString());

var flowsRunningFromRecord = flowService.GetFlowsFromRecord("14000e87-6210-f011-998a-6045bde0eb12", flows, filter);

Console.WriteLine("FlowsTrace.Test end..." + flowsRunningFromRecord.Count);

Console.ReadLine();
