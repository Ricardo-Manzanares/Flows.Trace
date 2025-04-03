using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models
{
    public class AccessToken
    {
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public string date_expire { get; set; }
        public string access_token { get; set; }
    }
}
