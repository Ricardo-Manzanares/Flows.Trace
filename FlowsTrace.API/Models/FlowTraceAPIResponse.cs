using FlowsTrace.API.Models.Flow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models
{    
    internal class FlowTraceAPIResponse
    {
        public bool error { get; set; }
        public string message { get; set; }
        public List<FlowTraceResponse> data { get; set; }
    }
}
