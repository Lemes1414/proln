﻿using CGC.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CGC.Models
{
    public class Send_Mail_old
    {
        public static string RandomString(int range)
        {
            var chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(chars, range)
                            .Select(s => s[random.Next(s.Length)])
                            .ToArray());

            return result;
        }

        public bool Check_Code(string code)
        {
            UsersController usersController = new UsersController();

            foreach(User user in usersController.GetUsers())
            {
                if(code == user.Reset_pass)
                {
                    return false;
                }
            }
            return true;
        }

        public void Repeat(string code)
        {
            var temp = rand.Next(100000, 999999);
            bool check;

            check = Check_Code(code);
            if (check == false)
            {
                temp = rand.Next(100000, 999999);
                code = temp.ToString();
                Repeat(code);
            }
        }

        Random rand = new Random();
        public Helper Reset_Pass_Code(string email)
        {
            Helper helper = new Helper();
            var temp = rand.Next(100000, 999999);
            string code = temp.ToString();

            Repeat(code);

            try
            {
                MailMessage mail = new MailMessage("inzynierkacgc@gmail.com", email);
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.Subject = "Reset password to CGC";
                mail.Body = "Your code: " + code;

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("inzynierkacgc@gmail.com", "inz2020CGC");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);

                helper.word = code;
                helper.check = true;
                return helper;
            }
            catch (Exception ex)
            {
                helper.check = false;
                return helper;
            }
        }

        public Helper Reset_Pass_Pass(string email)
        {
            Helper helper = new Helper();
            string password = RandomString(10);
            
            try
            {
                MailMessage mail = new MailMessage("inzynierkacgc@gmail.com", email);
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.Subject = "Reset password to CGC";
                mail.Body = "Your password is: " + password;

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("inzynierkacgc@gmail.com", "inz2020CGC");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);

                helper.word = password;
                helper.check = true;
                return helper;
            }
            catch(Exception ex)
            {
                helper.check = false;
                return helper;
            }
        }

    }
}
