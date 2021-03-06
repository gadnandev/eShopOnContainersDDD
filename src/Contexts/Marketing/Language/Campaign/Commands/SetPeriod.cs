﻿using System;
using System.Collections.Generic;
using System.Text;
using Infrastructure.Commands;

namespace eShop.Marketing.Campaign.Commands
{
    public class SetPeriod : StampedCommand
    {
        public Guid CampaignId { get; set; }

        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
