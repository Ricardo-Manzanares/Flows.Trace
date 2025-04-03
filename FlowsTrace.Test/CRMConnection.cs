using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.Test
{
    internal static class CRMConnection
    {
        public static ServiceClient GetConnection(string serviceUrl, string clientId, string secret)
        {

            try
            {
                String ConnectionString = string.Format("AuthType=ClientSecret;Url={0};ClientId={1};ClientSecret={2}", serviceUrl, clientId, secret);

                var service = new ServiceClient(ConnectionString);

                if (!service.IsReady)
                {
                    if (service.LastException != null)
                        throw service.LastException;

                    throw new InvalidOperationException(service.LastError);
                }

                return service;
            }
            catch (Exception ex)
            {
                throw new Exception("Authentication Failed!");
            }
        }
    }
}
