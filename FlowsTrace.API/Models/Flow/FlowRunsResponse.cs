using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models.Flow
{

    public class FlowRunsResponse
    {
        public FlowRunsReponseValue[] value { get; set; }
        public string nextLink { get; set; }
    }

    public class FlowRunsReponseValue
    {
        public string name { get; set; }
        public string id { get; set; }
        public string type { get; set; }
        public Properties properties { get; set; }
        public bool isMigrationSource { get; set; }
    }
}
