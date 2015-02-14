using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using user;
using time_user;
using office;

namespace sql_database
{
    public class database
    {
        private List<string> database_records;
        private SqlConnection connect = null;
        private string connectionString;
        // строка подключения
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
            { }
        }
        // закрить соединение
        public void close_connection()
        {
            try
            {
                connect.Close();
            }
            catch (SqlException ex)
            { }
        }
        // взять что-то из базы 
        public List<string> get_from_datebase(string what, string where, string conditions)
        {
            try
            {
                using (SqlConnection cnn = new SqlConnection(connectionString))
                {
                    SqlDataAdapter da = new SqlDataAdapter("Select " + what + " From " + where + " " + conditions, cnn);
                    DataSet ds = new DataSet();
                    da.Fill(ds, where);
                    List<string> list = new List<string>();
                    string[] arr = what.Split(',', ' ');
                    for (int i = 0; i < arr.Length; i += 2)
                    {
                        foreach (DataRow row in ds.Tables[where].Rows)
                        {
                            list.Add(row[arr[i]].ToString());
                        }
                    }
                    database_records = list;
                }
            }
            catch (SqlException ex)
            { }
            return database_records;
        }
        // новый пользователь
        public void insert_datebase_user(string user_id, string user_first_name,
         string user_last_name, string user_email)
        {
            try
            {
                string sql = string.Format("Insert Into user_account" +
                "(user_id, user_first_name, user_last_name, user_email) Values('{0}','{1}','{2}','{3}')",
                user_id, user_first_name, user_last_name, user_email);
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            { }
        }
        // вставить запись что пользователь авторизировался
        public void insert_datbase_session_connection(string user_id, database Database)
        {
            bool start = false;
            bool finish = false;
            bool connection = true;
            try
            {
                string sql = string.Format("Insert Into user_session " + "(user_id, start_status, finish_status, connection_status)Values('{0}', '{1}','{2}','{3}')",
                   user_id, start, finish, connection);
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            { }
        }
        // обновить запись сессии (количество времени после нажатия кнопки старт)
        public void update_datebase_session_connection(string user_id, bool status)
        {
            try
            {
                string sql = string.Format("UPDATE user_session" + " " +
                       "set connection_status='" + status + "' " +
                   "where user_id='" + user_id + "'" + ";");
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            { }
        }
        public bool session_status_connection(string user_id, bool status)
        {
            bool boolean = false;
            List<string> list;
            list = get_from_datebase("connection_status", "user_session", "where user_id='" + user_id + "' and connection_status='true'");
            if (list == null)
            {
                boolean = false;
            }
            else
                if (list.LongCount() > 0)
                {
                    boolean = true;
                }
                else
                {
                    boolean = false;
                }
            return boolean;
        }
        // статус кнопок
        public bool session_button(current_user CurrentUser)
        {
            bool boolean = false;
            List<string> list;
            list = get_from_datebase("start_status", "user_session", "where user_id='" + CurrentUser.Get_user_id() + "' and start_status='true'");
            if (list == null)
            {
                boolean = false;
            }
            else
                if (list.LongCount() > 0)
                {
                    boolean = true;
                }
                else
                {
                    boolean = false;
                }
            return boolean;
        }
        // обновить запись сессии (количество времени после нажатия кнопки старт)
        public void update_datebase_session_time_count(int counts, current_user CurrentUser)
        {
            try
            {
                string sql = string.Format("UPDATE user_session" + " " +
                       "set data_timer=" + counts + " " +
                   "where user_id='" + CurrentUser.Get_user_id() + "'" + ";");
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            { }
        }
        // удалить что-то из базы
        public void delete_datebase(string what, string condition)
        {
            try
            {
                string sql = string.Format("delete " + what + " " + condition);
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            { }
        }
        // обновить что-то в базе 
        public void update_datebase_user_session_finish_on_file(current_user user, user_time time)
        {
            string sql = string.Format("UPDATE user_recording" + " " +
                    "set data_finish_Day=" + time.Get_day() + ", data_finish_Month=" + time.Get_month() +
                    ", data_finish_Year=" + time.Get_year() + ", data_finish_Sec=" + time.Get_sec() +
                    ", data_finish_Min=" + time.Get_min() + ", data_finish_Hour=" + time.Get_hour() + " "
                    + "where user_id='" + user.Get_user_id() + "'" + " and data_finish_Hour=0;");
            using (SqlCommand cmd = new SqlCommand(sql, this.connect))
            {
                cmd.ExecuteNonQuery();
            }
        }
        // обновить запись сессии после нажатия кнопки стоп
        public void update_datebase_user_session_finish(current_user user, user_time time)
        {
            try
            {
                string sql = string.Format("UPDATE user_session" + " " +
                    "set data_finish_Day=" + time.Get_day() + ", data_finish_Month=" + time.Get_month() +
                    ", data_finish_Year=" + time.Get_year() + ", data_finish_Sec=" + time.Get_sec() +
                    ", data_finish_Min=" + time.Get_min() + ", data_finish_Hour=" + time.Get_hour() + ", finish_status='true'" + ", "
                    + "start_status='false'" + " " + "where user_id='" + user.Get_user_id() + "'" + ";");
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
                update_datebase_user_session_finish_on_file(user, time);
            }
            catch (SqlException ex)
            { }
        }
        // вставить что-то в базу
        // новый офис
        public void insert_datebase(company_office _office_)
        {
            try
            {
                string sql = string.Format("Insert Into access_connect" +
                    "(permitted_ip, office_name) Values('{0}','{1}')", _office_.Get_office_ip(), _office_.Get_office_name());
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            { }
        }
        // вставить записи в табличку записей
        public void insert_datebase_session_on_file(current_user CurrentUser, user_time time, database Database)
        {
            int finish_time = 0;
            int count_hours_all = 0;
            int count_hours_for_day = 0;
            string type_created = "button";
            try
            {
                string sql = string.Format("Insert Into user_recording " + "(user_id, data_start_Day, data_start_Month, data_start_Year, data_start_Hour, data_start_Min, data_start_Sec, data_finish_Day, data_finish_Month, data_finish_Year, data_finish_Sec, data_finish_Min, data_finish_Hour, type_created, count_hours_all, count_hours_for_day)Values('{0}', '{1}','{2}','{3}','{4}','{5}','{6}','{7}', '{8}','{9}','{10}','{11}','{12}', '{13}', '{14}', '{15}')",
                       CurrentUser.Get_user_id(), time.Get_day(), time.Get_month(), time.Get_year(), time.Get_hour(), time.Get_min(), time.Get_sec(), finish_time, finish_time, finish_time, finish_time, finish_time, finish_time, type_created, count_hours_all, count_hours_for_day);
                using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            { }
        }

        // вставить запись сессии после нажатия кнопки старт
        public void insert_datbase_session_start(current_user CurrentUser, user_time time, database Database)
        {
            bool start = true;
            bool finish = false;
            bool connection = true;
            int finish_time = 0;
            try
            {
                List<string> list;
                list = Database.get_from_datebase("data_start_Day, data_start_Month, data_start_Year, data_start_Hour, data_start_Min, data_start_Sec", "user_session", "where user_id='" + CurrentUser.Get_user_id() + "' and start_status='1'");
                if (list == null || list.LongCount() == 0)
                {
                    string sql = string.Format("Insert Into user_session " + "(user_id, start_status, finish_status, connection_status, data_start_Day, data_start_Month, data_start_Year, data_start_Hour, data_start_Min, data_start_Sec, data_finish_Day, data_finish_Month, data_finish_Year, data_finish_Sec, data_finish_Min, data_finish_Hour)Values('{0}', '{1}','{2}','{3}','{4}','{5}','{6}','{7}', '{8}','{9}','{10}','{11}','{12}','{13}', '{14}', '{15}')",
                       CurrentUser.Get_user_id(), start, finish, connection, time.Get_day(), time.Get_month(), time.Get_year(), time.Get_hour(), time.Get_min(), time.Get_sec(), finish_time, finish_time, finish_time, finish_time, finish_time, finish_time);
                    using (SqlCommand cmd = new SqlCommand(sql, this.connect))
                    {
                        cmd.ExecuteNonQuery();
                    }
                    insert_datebase_session_on_file(CurrentUser, time, Database);
                }
            }
            catch (SqlException ex)
            { }
        }
    }
}