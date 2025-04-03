using FlowsTrace.API.Models;
using Microsoft.Xrm.Sdk;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using static FlowsTrace.API.Models.Enums;

namespace FlowsTrace.Services.API
{
    public static class AuthenticationService
    {
        public static AccessToken Token { get; private set; }

        public static AccessToken GetToken(string environment, string client_id, string client_secret, string tenant_id, ITracingService tracingService)
        {
            try
            {
                if (Token == null || (Token != null && DateTime.Parse(Token.date_expire).ToLocalTime() <= DateTime.Now.ToLocalTime()))
                {
                    Organization organization = GetLocation(environment);
                    string authority = GetAuthority(organization);
                    string audience = GetAudience(organization);

                    if (tracingService != null)
                    {
                        tracingService.Trace("FlowsTrace organization " + organization);
                        tracingService.Trace("FlowsTrace authority " + authority);
                        tracingService.Trace("FlowsTrace audience " + audience);
                    }

                    var client = new HttpClient();
                    var request = new HttpRequestMessage(HttpMethod.Post, string.Format("{0}/{1}/oauth2/v2.0/token", authority, tenant_id));
                    var collection = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("client_id", client_id),
                        new KeyValuePair<string, string>("client_secret", client_secret),
                        new KeyValuePair<string, string>("grant_type", "client_credentials"),
                        new KeyValuePair<string, string>("scope", audience + "/.default")
                    };

                    var content = new FormUrlEncodedContent(collection);
                    request.Content = content;

                    var response = client.SendAsync(request).Result;
                    response.EnsureSuccessStatusCode();

                    var responseString = response.Content.ReadAsStringAsync().Result;

                    Token = JsonConvert.DeserializeObject<AccessToken>(responseString);
                    Token.date_expire = DateTime.Now.AddSeconds(Token.expires_in).ToLocalTime().ToString();

                    return Token;
                }
                else
                {
                    return Token;
                }                
            }
            catch (Exception ex)
            {
                string error = "Execute error in AuthenticationService - GetToken : " + ex.ToString() + " - StackTrace:" + ex.StackTrace;
                if (tracingService != null)
                    tracingService.Trace(error);
                else
                    System.Diagnostics.Trace.WriteLine(error);
                throw;
            }
        }

        private static Organization GetLocation(string environment)
        {
            switch (environment)
            {
                case "crm9.dynamics.com":
                    return Organization.GCC;
                case "crm.microsoftdynamics.us":
                    return Organization.GCCH;
                case "crm.appsplatform.us":
                    return Organization.DOD;
                default:
                    return Organization.Public;
            }
        }

        private static string GetAuthority(Organization organization)
        {
            switch (organization)
            {
                case Organization.GCC:
                case Organization.GCCH:
                case Organization.DOD:
                    return "https://login.microsoftonline.us";
                default:
                    return "https://login.microsoftonline.com";
            }
        }

        private static string GetAudience(Organization organization)
        {
            switch (organization)
            {
                case Organization.GCC:
                    return "https://gov.service.flow.microsoft.us";
                case Organization.GCCH:
                    return "https://high.service.flow.microsoft.us";
                case Organization.DOD:
                    return "https://service.flow.appsplatform.us";
                default:
                    return "https://service.flow.microsoft.com";
            }
        }
    }
}
