using FlowsTrace.Core.Models;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.Core
{
    public static class Dynamics
    {
        public static EnvironmentsValues GetEnvironmentsValues(IOrganizationService service)
        {
            EnvironmentsValues environmentsValues = new EnvironmentsValues();

            var queryEnvironmentValues = new QueryExpression("environmentvariabledefinition")
            {
                ColumnSet = new ColumnSet("schemaname", "defaultvalue"),
                Criteria = {
                    FilterOperator = LogicalOperator.Or,
                    Conditions =
                    {
                        new ConditionExpression("schemaname", ConditionOperator.Equal, "rmc_flowstraceclientid"),
                        new ConditionExpression("schemaname", ConditionOperator.Equal, "rmc_flowstracetenantid"),
                        new ConditionExpression("schemaname", ConditionOperator.Equal, "rmc_flowstracesecretid")
                    }
                }
            };

            var environmentValuesResponse = service.RetrieveMultiple(queryEnvironmentValues);
            if (environmentValuesResponse != null && environmentValuesResponse.Entities != null && environmentValuesResponse.Entities.Count == 3)
            {
                foreach (var environmentValue in environmentValuesResponse.Entities)
                {
                    if (environmentValue["schemaname"].ToString() == "rmc_flowstraceclientid")
                        environmentsValues.client_id = environmentValue["defaultvalue"].ToString();
                    if (environmentValue["schemaname"].ToString() == "rmc_flowstracesecretid")
                        environmentsValues.client_secret = environmentValue["defaultvalue"].ToString();
                    if (environmentValue["schemaname"].ToString() == "rmc_flowstracetenantid")
                        environmentsValues.tenant_id = environmentValue["defaultvalue"].ToString();
                }
            }

            return environmentsValues;
        }
    }
}
