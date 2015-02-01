using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace sql_database
{
    public class database
    {
        private List<string> database_records;

        private SqlConnection connect = null;

        private string connectionString;

        public database()
        {
            connectionString = "Data Source=SQL5004.Smarterasp.net;Initial Catalog=DB_9BA98E_ISMTimeTracker;User Id=DB_9BA98E_ISMTimeTracker_admin;Password=BDXVxNmJ2;";
        }
        // открыть соединение
        public void open_connection()
        {
            connect = new SqlConnection(connectionString);
            try
            {
                connect.Open();
            }
            catch (SqlException ex)
            {
                // Протоколировать исключение
                Console.WriteLine(ex.Message);
            }
        }
        // закрить соединение
        private void close_connection()
        {
            connect.Close();
        }
        // взять, что-то из базы
        private List<string> get_database_records()
        {
            return database_records;
        }
        // взять, что-то из базы
        public List<string> get_from_datebase(string what, string where, string conditions)
        {
            security_get_from_datebase(what, where, conditions);
            return get_database_records();
        }
        // записать записи из базы
        private void set_from_datebase(List<string> records)
        {
            database_records = records;
        }
        // взять, что-то из базы
        private void security_get_from_datebase(string what, string where, string conditions)
        {
            try 
            {
                using (SqlConnection cnn = new SqlConnection(connectionString))
                {
                    SqlDataAdapter da = new SqlDataAdapter("Select " + what + " From " + where + " " + conditions, cnn);
                    DataSet ds = new DataSet();
                    da.Fill(ds, where);
                    List<string> list = new List<string>();
                    foreach (DataRow row in ds.Tables[where].Rows)
                    {
                        list.Add(row[what].ToString());
                    }
                    set_from_datebase(list);
                }
            }
            catch (SqlException ex)
            {
                // Протоколировать исключение
                Console.WriteLine(ex.Message);
            }            
        }


        public void Insert_registration(string user_id, string user_first_name)
        {
            string sql = string.Format("Insert Into access_connect" +
            "(permitted_ip, office_name) Values('{0}','{1}')", user_id, user_first_name);

            using (SqlCommand cmd = new SqlCommand(sql, this.connect))
            {
                cmd.ExecuteNonQuery();
            }
        }
    }
}