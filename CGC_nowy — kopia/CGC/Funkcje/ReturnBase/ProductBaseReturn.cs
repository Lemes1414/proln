﻿using CGC.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CGC.Funkcje.ProductFuncFolder.ProductBase
{
    public class ProductBaseReturn
    {
        private static ProductBaseReturn m_oInstance = null;
        private static readonly object m_oPadLock = new object();

        public static ProductBaseReturn Instace
        {
            get
            {
                lock (m_oPadLock)
                {
                    if (m_oInstance == null)
                    {
                        m_oInstance = new ProductBaseReturn();
                    }
                    return m_oInstance;
                }
            }
        }

        private Connect connect = new Connect();

        public List<Product_History> GetProductHistory(int Id)
        {
            List<Product_History> product_Histories = new List<Product_History>();

            SqlCommand command = new SqlCommand("SELECT * FROM [Product_History] WHERE Id = @Id;", connect.cnn);
            connect.cnn.Open();

            command.Parameters.Add("@Id", SqlDbType.Bit).Value = Id;

            SqlDataReader sqlDataReader = command.ExecuteReader();
            while (sqlDataReader.Read())
            {
                Product_History product_History = new Product_History();
                product_History.Id = Convert.ToInt32(sqlDataReader["Id"]);
                product_History.Date = sqlDataReader["Data"].ToString();
                product_History.Description = sqlDataReader["Description"].ToString();

                product_Histories.Add(product_History);
            }
            sqlDataReader.Close();
            command.Dispose();
            connect.cnn.Close();

            return product_Histories;
        }

        public List<Product> GetProducts()
        {
            List<Product> temp = new List<Product>();
            SqlCommand command = new SqlCommand("SELECT * FROM [Product];", connect.cnn);
            connect.cnn.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();
            while (sqlDataReader.Read())
            {
                Product product = new Product();
                product.Id = Convert.ToInt32(sqlDataReader["Id"]);
                product.Owner = sqlDataReader["Owner"].ToString();
                product.Status = sqlDataReader["Status"].ToString();
                product.Desk = sqlDataReader["Desk"].ToString();
                product.Id_item = Convert.ToInt32(sqlDataReader["Id_item"]);
                product.Id_order = sqlDataReader["Id_order"].ToString();

                temp.Add(product);
            }

            sqlDataReader.Close();
            command.Dispose();
            connect.cnn.Close();

            return temp;
        }

        public List<Product> GetProductsUser()
        {
            List<Product> temp = new List<Product>();
            SqlCommand command = new SqlCommand("SELECT * FROM [Product] Where Status = @Status;", connect.cnn);

            command.Parameters.Add("@Status", SqlDbType.VarChar, 40).Value = "Gotowy";

            connect.cnn.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();
            while (sqlDataReader.Read())
            {
                Product product = new Product();
                product.Id = Convert.ToInt32(sqlDataReader["Id"]);
                product.Owner = sqlDataReader["Owner"].ToString();
                product.Status = sqlDataReader["Status"].ToString();
                product.Desk = sqlDataReader["Desk"].ToString();
                product.Id_item = Convert.ToInt32(sqlDataReader["Id_item"]);
                product.Id_order = sqlDataReader["Id_order"].ToString();

                temp.Add(product);
            }

            sqlDataReader.Close();
            command.Dispose();
            connect.cnn.Close();

            return temp;
        }

        public List<Product> GetDeletedProductsUser()
        {
            List<Product> temp = new List<Product>();
            SqlCommand command = new SqlCommand("SELECT * FROM [Product] Where Status = @Status;", connect.cnn);

            command.Parameters.Add("@Status", SqlDbType.Decimal).Value = "Usuniety";

            connect.cnn.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();
            while (sqlDataReader.Read())
            {
                Product product = new Product();
                product.Id = Convert.ToInt32(sqlDataReader["Id"]);
                product.Owner = sqlDataReader["Owner"].ToString();
                product.Status = sqlDataReader["Status"].ToString();
                product.Desk = sqlDataReader["Desk"].ToString();
                product.Id_item = Convert.ToInt32(sqlDataReader["Id_item"]);
                product.Id_order = sqlDataReader["Id_order"].ToString();

                temp.Add(product);
            }

            sqlDataReader.Close();
            command.Dispose();
            connect.cnn.Close();

            return temp;
        }
    }  
}
