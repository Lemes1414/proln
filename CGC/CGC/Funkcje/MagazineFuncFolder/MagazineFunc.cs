﻿using CGC.Funkcje.MagazineFuncFolder.MagazineBase;
using CGC.Funkcje.UserFuncFolder.UserReturn;
using CGC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CGC.Funkcje.MagazineFuncFolder
{
    public class MagazineFunc
    {
        private static MagazineFunc m_oInstance = null;
        private static readonly object m_oPadLock = new object();
        private MagazineBaseModify magazineBaseModify = new MagazineBaseModify();
        private MagazineBaseReturn magazineBaseReturn = new MagazineBaseReturn();
        private UserBaseReturn userBaseReturn = new UserBaseReturn();

        public static MagazineFunc Instace
        {
            get
            {
                lock (m_oPadLock)
                {
                    if (m_oInstance == null)
                    {
                        m_oInstance = new MagazineFunc();
                    }
                    return m_oInstance;
                }
            }
        }

        public List<string> Return_All_Colors()
        {
            return magazineBaseReturn.GetColor();
        }

        public List<Glass_Receiver> Return_All_Glass()
        {
            return magazineBaseReturn.Getglass(false,false);
        }

        public List<string> Return_All_Type()
        {
            return magazineBaseReturn.GetTypes();
        }

        public List<Magazine_History> Return_Magazine_History()
        {
            return magazineBaseReturn.GetMagazineHistories();
        }

        public List<Glass> Add_Glass(Receiver receiver)
        {
            List<Glass> temp = new List<Glass>();

            Glass glass = receiver.glass;
            User user = receiver.user;
            int code = 0;

            foreach (User usere in userBaseReturn.GetUser(user.Login, false))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    return magazineBaseModify.Add_Glass(usere, glass, code, magazineBaseReturn.Getglass());
                }
            }
            glass.Error_Messege = "Uzytkownik nie istnieje";
            temp.Add(glass);
            return temp;
        }

        public List<Glass> Edit_Glass(Receiver receiver)
        {
            List<Glass> temp = new List<Glass>();
            User user = receiver.user;
            Glass glass = receiver.glass;
            glass.Glass_id = receiver.glass.Glass_id;

            foreach (User usere in userBaseReturn.GetUser(user.Login, false))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    magazineBaseModify.Edit_Glass(usere, glass);
                }
            }

            glass.Error_Messege = "User not exist";
            temp.Add(glass);

            return temp;
        }

        public List<Glass> Remove_Glass(Receiver receiver)
        {
            List<Glass> temp = new List<Glass>();
            List<string> Id_glasses = receiver.glass_Id;
            List<int> i = new List<int>();

            foreach(string s in Id_glasses)
            {
                i.Add(Convert.ToInt32(s));
            }

            Glass glass = new Glass();

            User user = receiver.user;

            foreach (User usere in userBaseReturn.GetUser(user.Login,false))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    return magazineBaseModify.Remove_Glass(usere, i);
                }
            }
            glass.Error_Messege = "User not exist";
            temp.Add(glass);
            return temp;
        }

        public List<Glass> Restore_Glass(Receiver receiver)
        {
            List<Glass> temp = new List<Glass>();
            List<string> Id_glasses = receiver.glass_Id;
            List<int> i = new List<int>();

            foreach (string s in Id_glasses)
            {
                i.Add(Convert.ToInt32(s));
            }

            Glass glass = new Glass();

            User user = receiver.user;

            foreach (User usere in userBaseReturn.GetUser(user.Login, false))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    return magazineBaseModify.Restore_Glass(usere, i);
                }
            }
            glass.Error_Messege = "User not exist";
            temp.Add(glass);
            return temp;
        }


        public List<string> Add_Type_Admin(Receiver receiver)
        {
            User user = receiver.user;
            string type = receiver.type;
            List<string> temp = new List<string>();

            foreach (User usere in userBaseReturn.GetUser(user.Login))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    foreach (string types in magazineBaseReturn.GetTypes())
                    {
                        if (types == type)
                        {
                            temp.Add("Type already exist");
                            return temp;
                        }
                    }
                    return magazineBaseModify.Add_Type_Admin(usere, type);
                }
            }
            temp.Add("User not exist, os password is wrong");
            return temp;
        }

        public List<string> Add_Color_Admin(Receiver receiver)
        {
            User user = receiver.user;
            List<string> temp = new List<string>();
            string color = receiver.color;

            foreach (User usere in userBaseReturn.GetUser(user.Login))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    foreach (string colors in magazineBaseReturn.GetColor())
                    {
                        if (colors == color)
                        {
                            temp.Add("Color already exist");
                            return temp;
                        }
                    }
                    return magazineBaseModify.Add_Color_Admin(usere, color);
                }
            }
            temp.Add("User not exist, os password is wrong");
            return temp;
        }

        public List<string> Change_Type_Admin(Receiver receiver)
        {
            User user = receiver.user;
            string new_type = receiver.new_type;
            string old_type = receiver.old_type;
            List<string> temp = new List<string>();

            foreach (string type in magazineBaseReturn.GetTypes())
            {
                if (type == new_type)
                {
                    temp.Add("Type already exist");
                    return temp;
                }
            }

            foreach (User usere in userBaseReturn.GetUser(user.Login, false))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    foreach (string type in magazineBaseReturn.GetTypes())
                    {
                        if (type == old_type)
                        {
                            magazineBaseModify.Change_Type_Admin(usere, new_type, old_type);
                        }
                    }
                    temp.Add("Type already exist");
                    return temp;
                }
            }
            temp.Add("User not exist, os password is wrong");
            return temp;
        }

        public List<string> Change_Color_Admin (Receiver receiver)
        {
            User user = receiver.user;
            List<string> temp = new List<string>();
            string new_color = receiver.new_color;
            string old_color = receiver.old_color;

            foreach (string type in magazineBaseReturn.GetColor())
            {
                if (type == new_color)
                {
                    temp.Add("Color already exist");
                    return temp;
                }
            }

            foreach (User usere in userBaseReturn.GetUser(user.Login, false))
            {
                if (usere.Manager == true || usere.Super_Admin == true || usere.Admin || usere.Magazine_management == true)
                {
                    foreach (string color in magazineBaseReturn.GetColor())
                    {
                        if (color == old_color)
                        {
                            magazineBaseModify.Change_Color_Admin(usere, new_color, old_color);
                        }
                    }
                    temp.Add("Color not exist");
                    return temp;
                }
            }
            temp.Add("User not exist, os password is wrong");
            return temp;
        }
    }
}
