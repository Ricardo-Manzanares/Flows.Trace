using Microsoft.Xrm.Sdk;
using System;

namespace FlowsTrace.API.Utils
{
    internal static class FlowsTraceUtils
    {
        public static bool ValidationExecutionCustomAPI(IPluginExecutionContext context, out Exception ex)
        {
            ex = null;

            if (context.PrimaryEntityName == "none" && context.MessageName != "rmc_flowstrace")
            {
                ex = new Exception("The Custom API only execute from messageName rmc_flowstrace");
            }

            return ex == null;
        }       
    }
}
