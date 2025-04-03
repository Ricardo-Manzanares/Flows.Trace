using FlowsTrace.Core.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using static FlowsTrace.Core.Models.Enums;

namespace FlowsTrace.Core
{
    public static class Authentication
    {
        public static async Task<AccessToken> GetToken(string environment, string client_id, string client_secret, string tenant_id)
        {
            try
            {
                Organization organization = GetLocation(environment);
                string authority = GetAuthority(organization);
                string audience = GetAudience(organization);

                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Post, string.Format("{0}/{1}/oauth2/v2.0/token", authority, tenant_id));
                var collection = new List<KeyValuePair<string, string>>
                            {
                                new("client_id", client_id),
                                new("client_secret", client_secret),
                                new("grant_type", "client_credentials"),
                                new("scope", audience + "/.default")
                            };

                var content = new FormUrlEncodedContent(collection);
                request.Content = content;
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();

                var responseString = await response.Content.ReadAsStringAsync();
                var accessToken = JsonSerializer.Deserialize<AccessToken>(responseString);

                return accessToken;
            }
            catch (Exception ex)
            {
                throw ex;
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
