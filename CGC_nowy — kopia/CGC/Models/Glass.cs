﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CGC.Models
{
    public class Glass
    {
        public double Hight { get; set; } //z
        public double Width { get; set; } //y
        public double Length { get; set; } //x
        public int Count { get; set; }

        public string Type { get; set; }
        public string Color { get; set; }

        //public string Id { get; set; }
        public string Owner { get; set; }
        public string Desk { get; set; }

        public List<Glass_Id> Glass_info = new List<Glass_Id>();
        public string Error_Messege { get; set; }

        public List<int> Glass_id = new List<int>();

         
    }
}