using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models
{
    public class Enums
    {
        public enum Organization
        {
            Public,
            GCC,
            GCCH,
            DOD
        }

        public enum FilterRangeExecution
        {
            LastHalfHour,
            LastHour,            
            Today,
            Yesterday,
            Last48Hours,
            SinceLastWeek
        }
    }
}
