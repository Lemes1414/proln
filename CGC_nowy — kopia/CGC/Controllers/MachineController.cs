﻿using CGC.Funkcje;
using CGC.Funkcje.MachineFuncFolder;
using CGC.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CGC.Controllers
{
    [Route("api/[controller]")]
    public class MachineController : Controller
    {
        private MachineFunc machineFunc = new MachineFunc();

        private static MachineController m_oInstance = null;
        private static readonly object m_oPadLock = new object();

        public static MachineController Instace
        {
            get
            {
                lock (m_oPadLock)
                {
                    if (m_oInstance == null)
                    {
                        m_oInstance = new MachineController();
                    }
                    return m_oInstance;
                }
            }
        }

        [HttpGet("Return_All_Type")]
        public async Task<List<string>> Return_All_Type()
        {
            return machineFunc.Return_All_Type();
        }

        [HttpGet("Return_All_Machines")]
        public async Task<List<Machines>> Return_All_Machines()
        {
            return machineFunc.Return_All_Machines();
        }
        
        [HttpPost("Return_Machines_History")]
        public async Task<List<Machines_History>> Return_Machines_History(Receiver receiver)
        {
            return machineFunc.Return_Machines_History(receiver);
        }
        
        [HttpGet("Return_All_Machines_History")]
        public async Task<List<Machines_History_All>> Return_All_Machines_History()
        {
            return machineFunc.Return_All_Machines_History();
        }

        [HttpPost("Add_Machine")]
        public async Task<List<Machines>> Add_Machine([FromBody] Receiver receiver)
        {
            return machineFunc.Add_Machine(receiver);
        }

        [HttpPost("Change_Status_Machine")]
        public async Task<List<Machines>> Change_Status_Machine([FromBody] Receiver receiver)
        {
            return machineFunc.Change_Status_Machine(receiver);
        }

        [HttpPost("Change_Type_Machine")]
        public async Task<List<Machines>> Change_Type_Machine([FromBody] Receiver receiver)
        {
            return machineFunc.Change_Type_Machine(receiver);
        }

        [HttpPost("Remove_Machine")]
        public async Task<List<Machines>> Remove_Machine([FromBody] Receiver receiver)
        {
            return machineFunc.Remove_Machine(receiver);
        }

        [HttpPost("Restore_Machine")]
        public async Task<List<Machines>> Restore_Machine([FromBody] Receiver receiver)
        {
            return machineFunc.Restore_Machine(receiver);
        }

        [HttpPost("Add_Type_Admin")]
        public async Task<List<string>> Add_Type_Admin([FromBody] Receiver receiver)
        {
            return machineFunc.Add_Type_Admin(receiver);
        }

        [HttpPost("Change_Type_Admin")]
        public async Task<List<string>> Change_Type_Admin([FromBody] Receiver receiver)
        {
            return machineFunc.Change_Type_Admin(receiver);
        }
    }
}