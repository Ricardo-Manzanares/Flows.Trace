using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models.Flow
{
    public class Properties
    {
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public string status { get; set; }
        public Correlation correlation { get; set; }
        public Trigger trigger { get; set; }
        public Dictionary<string, CustomAction> actions { get; set; }
        public FlowResponse flow { get; set; }
        public bool isAborted { get; set; }
    }

    public class Trigger
    {
        public string name { get; set; }
        public Inputslink inputsLink { get; set; }
        public Outputslink outputsLink { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public string originHistoryName { get; set; }
        public Correlation correlation { get; set; }
        public string status { get; set; }
    }

    public class Inputslink
    {
        public string uri { get; set; }
        public string contentVersion { get; set; }
        public int contentSize { get; set; }
        public Contenthash contentHash { get; set; }
    }

    public class Contenthash
    {
        public string algorithm { get; set; }
        public string value { get; set; }
    }

    public class Outputslink
    {
        public string uri { get; set; }
        public string contentVersion { get; set; }
        public int contentSize { get; set; }
        public Contenthash contentHash { get; set; }
    }

    public class Correlation
    {
        public string clientTrackingId { get; set; }
        public string actionTrackingId { get; set; }
    }

    public class Metadata
    {
        public string operationMetadataId { get; set; }
    }
    public class Defaultvalue
    {
    }

    public class Runafter
    {
    }
}
