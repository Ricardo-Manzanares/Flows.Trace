using FlowsTrace.API;
using FlowsTrace.API.Models;
using FlowsTrace.API.Services;
using FlowsTrace.Services.API;
using FlowsTrace.Test;
using Microsoft.Extensions.Configuration;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
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

var userId = "82fb0ac7-1bb7-ee11-a569-0022489c9f89"; // Usuario a validar

string TimeZoneUser()
{
    // 1. Obtener la configuración del usuario actual
    var query = new QueryExpression("usersettings")
    {
        ColumnSet = new ColumnSet("timezonecode")
    };
    query.Criteria.AddCondition("systemuserid", ConditionOperator.Equal, userId);

    var userSettings = service.RetrieveMultiple(query).Entities.FirstOrDefault();
    if (userSettings == null)
        throw new InvalidPluginExecutionException("No se encontró la configuración de zona horaria del usuario");

    var timeZoneCode = (int)userSettings["timezonecode"];

    // 2. Resolver el nombre de la zona horaria a partir de timezonedefinition
    var tzQuery = new QueryExpression("timezonedefinition")
    {
        ColumnSet = new ColumnSet("standardname")
    };
    tzQuery.Criteria.AddCondition("timezonecode", ConditionOperator.Equal, timeZoneCode);

    var tzDef = service.RetrieveMultiple(tzQuery).Entities.FirstOrDefault();
    if (tzDef == null)
        throw new InvalidPluginExecutionException("No se encontró la definición de zona horaria para el código " + timeZoneCode);

    var standardName = tzDef.GetAttributeValue<string>("standardname");
    return standardName;
}

var timeZoneUser = TimeZoneUser();

var flowService = new FlowService(timeZoneUser, configuration["environment_url"].ToString(), configuration["environment_id"].ToString(), configuration["client_id"].ToString(), configuration["client_secret"].ToString(), configuration["tenant_id"].ToString(), null);
Enums.FilterRangeExecution filter = Enums.FilterRangeExecution.Today;

Console.WriteLine("Filter apply " + filter.ToString());

var flowsRunningFromRecord = flowService.GetFlowsFromRecord("f22405f3-d99f-f011-bbd2-000d3a674ede", flows, filter);

Console.WriteLine("FlowsTrace.Test end..." + flowsRunningFromRecord.Count);

Console.ReadLine();
