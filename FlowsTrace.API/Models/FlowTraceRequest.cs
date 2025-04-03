using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models
{
    internal class FlowTraceRequest
    {
        public string record_id { get; set; }
        public string filter_range_execution { get; set; }
    }
}
