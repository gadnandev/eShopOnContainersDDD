﻿using System;
using System.Collections.Generic;
using System.Text;
using Infrastructure.Queries;

namespace eShop.Ordering.Order.Queries
{
    public class BuyerOrders : Paged
    {
        public string UserName { get; set; }

        public Status OrderStatus { get; set; }

        public string From { get; set; }
        public string To { get; set; }
    }
}
