using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FlowsTrace.Core.Models
{
    public class AccessToken
    {
        [JsonPropertyName("token_type")]
        public string token_type { get; set; }

        [JsonPropertyName("expires_in")]
        public int expires_in { get; set; }

        [JsonPropertyName("ext_expires_in")]
        public int ext_expires_in { get; set; }

        [JsonPropertyName("access_token")]
        public string access_token { get; set; }

        [JsonPropertyName("recordId")]
        public string recordId { get; set; }
    }
}
