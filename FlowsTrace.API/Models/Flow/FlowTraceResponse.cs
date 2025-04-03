using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models.Flow
{
    public class FlowTraceResponse
    {
        public string Id { get; set; }
        public Guid WorkflowId { get; set; }
        public string Name { get; set; }
        public string Action { get; set; }
        public FlowRunStatus ActionStatus { get; set; }
        public FlowStatus Status { get; set; }       
        public DateTime DateExecution { get; set; }
        public FlowRunStatus RunStatus { get; set; }
        public string RunId { get; set; }
        public string RunName { get; set; }
    }



    public enum FlowStatus
    {
        Draft = 0,
        Activated = 1,
        Suspended = 2,
    }

    public enum FlowRunStatus
    {
        Failed,
        Succeeded,
        Cancelled,
        Unknown
    }
}
