using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Utils
{
    internal class FlowsTraceRequest
    {
        [JsonProperty("record_id")]
        public string record_id { get; set; }
    }
}
