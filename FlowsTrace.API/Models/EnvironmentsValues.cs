﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models
{
    public class EnvironmentsValues
    {
        public string environment_url { get; set; }
        public string environment_id { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string tenant_id { get; set; }
    }
}
