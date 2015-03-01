using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using user;
using sql_database;
using time_user;
using program_logic;

public partial class tracker : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static bool check_ip()
    {
        Program_logic logic = new Program_logic();
        return logic.check_ip();
    }
    [WebMethod]
    public static bool check_is_user(string id)
    {
        bool boolean = false;
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        boolean = CurrentUser.function_registration_check(Database);
        Database.close_connection();
        return boolean;
    }
    [WebMethod]
    public static bool session_status_connection(string id, bool status)
    {
        bool boolean = false;
        database _database_ = new database();
        _database_.open_connection();
        boolean = _database_.session_status_connection(id, status);
        _database_.close_connection();
        return boolean;
    }
    [WebMethod]
    public static bool start_status(string id)
    {
        bool boolean = false;
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        boolean = Database.session_button(CurrentUser);
        Database.close_connection();
        return boolean;
    }
    [WebMethod]
    public static int session_time(int day, int month, int year, int sec, int min, int hour, string id)
    {
        int count_sec = 0;
        int count_min = 0;
        int count_hour = 0;
        int count_day = 0;
        user_time time_current = new user_time(day, month, year, sec, min, hour);
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        List<string> list;
        list = Database.get_from_datebase("data_start_Day, data_start_Month, data_start_Year, data_start_Hour, data_start_Min, data_start_Sec", "user_session", "where user_id='" + CurrentUser.Get_user_id() + "' and start_status='1'");
        if (list.LongCount() == 6)
        {
            int Day = int.Parse(list[0]);
            int Month = int.Parse(list[1]);
            int Year = int.Parse(list[2]);
            int Hour = int.Parse(list[3]);
            int Min = int.Parse(list[4]);
            int Sec = int.Parse(list[5]);
            user_time time_in_datebase = new user_time(Day, Month, Year, Sec, Min, Hour);
            user_time different = new user_time();
            different = time_in_datebase;
            count_day = different.day_difference(time_current);
            count_hour = time_current.Get_hour() - time_in_datebase.Get_hour();
            count_min = time_current.Get_min() - time_in_datebase.Get_min();
            count_sec = time_current.Get_sec() - time_in_datebase.Get_sec();
            count_sec = count_sec + (count_min + (count_hour + count_day * 24) * 60) * 60;
        }
        save_session_time(count_sec, id);
        return count_sec;
    }

    private static void save_session_time(int count_sec, string id)
    {
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        Database.update_datebase_session_time_count(count_sec, CurrentUser);
        Database.close_connection();
    }
    [WebMethod]
    public static void session_connection(string id, bool status)
    {
        database _database_ = new database();
        _database_.open_connection();
        _database_.update_datebase_session_connection(id, status);
        _database_.close_connection();
    }

    [WebMethod]
    public static void create_session(int day, int month, int year, int sec, int min, int hour, string id)
    {
        current_user CurrentUser = new current_user(id);
        database Database = new database();
        user_time time = new user_time(day, month, year, sec, min, hour);
        Database.open_connection();
        Database.insert_datbase_session_start(CurrentUser, time, Database);
        Database.close_connection();
    }
    [WebMethod]
    public static void session_finish(string id, int day, int month, int year, int sec, int min, int hour)
    {
        current_user CurrentUser = new current_user(id);
        database Database = new database();
        Database.open_connection();
        user_time time = new user_time(day, month, year, sec, min, hour);
        Database.update_datebase_user_session_finish(CurrentUser, time);
        Database.close_connection();
    }
    [WebMethod]
    public static void delete_session_time(string id)
    {
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        Database.delete_datebase("user_session", "where user_id='" + id + "' and start_status='0'");
        Database.close_connection();
    }
    [WebMethod]
    public static string[] generation_table(string id)
    {
        current_user CurrentUser = new current_user(id);
        database _database_ = new database();
        _database_.open_connection();
        List<string> list;
        list = _database_.get_from_datebase("data_start_Day, data_start_Month, data_start_Year, data_start_Hour, data_start_Min, data_start_Sec, data_finish_Day, data_finish_Month, data_finish_Year, data_finish_Hour, data_finish_Min, data_finish_Sec, count_hours_all, count_hours_for_day, type_created", "user_recording", "where user_id='" + CurrentUser.Get_user_id() + "'");
        string[] arr = list.ToArray();
        string[] finalarr = new string[(list.LongCount() / 15) * 4];
        int k = arr.Length / 15;
        int j = 0;
        for (int i = 0; i < arr.Length / 15; i++)
        {
            //минути
            if (int.Parse(arr[i + k * 4]) < 10)
                arr[i + k * 4] = "0" + arr[i + k * 4];
            if (int.Parse(arr[i + k * 10]) < 10)
                arr[i + k * 10] = "0" + arr[i + k * 10];
            //месяц
            if (int.Parse(arr[i + k]) < 10)
                arr[i + k] = "0" + arr[i + k];
            if (int.Parse(arr[i + k * 7]) < 10)
                arr[i + k * 7] = "0" + arr[i + k * 7];
            //секунди
            /*if (int.Parse(arr[i + k * 5]) < 10)
                arr[i + k * 5] = "0" + arr[i + k * 5];
            if (int.Parse(arr[i + k * 11]) < 10)
                arr[i + k * 11] = "0" + arr[i + k * 11];
             * */
            finalarr[j + 0] = arr[i] + "." + arr[i + k] + "." + arr[i + 2 * k] + " " + arr[i + k * 3] + ":" + arr[i + k * 4];
            finalarr[j + 1] = arr[i + k * 6] + "." + arr[i + k * 7] + "." + arr[i + k * 8] + " " + arr[i + k * 9] + ":" + arr[i + k * 10];
            //finalarr[j + 0] = arr[i] + "." + arr[i + k] + "." + arr[i + 2 * k] + " " + arr[i + k * 3] + ":" + arr[i + k * 4] + ":" + arr[i + k * 5];
            // finalarr[j + 1] = arr[i + k * 6] + "." + arr[i + k * 7] + "." + arr[i + k * 8] + " " + arr[i + k * 9] + ":" + arr[i + k * 10] + ":" + arr[i + k * 11];
            finalarr[j + 2] = arr[i + k * 12] = countInterval(arr, k, i);
            finalarr[j + 3] = arr[i + k * 14];
            j += 4;
        }
        _database_.close_connection();
        return finalarr;
    }
    public static string countInterval(string[] arr, int k, int i)
    {
        try
        {
            DateTime dtStart = new DateTime(int.Parse(arr[i + 2 * k]), int.Parse(arr[i + k]), int.Parse(arr[i]), int.Parse(arr[i + k * 3]), int.Parse(arr[i + k * 4]), int.Parse(arr[i + k * 5]));
            DateTime dtEnd = new DateTime(int.Parse(arr[i + k * 8]), int.Parse(arr[i + k * 7]), int.Parse(arr[i + k * 6]), int.Parse(arr[i + k * 9]), int.Parse(arr[i + k * 10]), int.Parse(arr[i + k * 11]));
            string strMinute = "";
            DateTime g = new DateTime((dtEnd - dtStart).Ticks);
            string total = "";
            if (g.Minute < 10)
            {
                strMinute = "0" + g.Minute.ToString();
                total = string.Format("{0}:{1}", (g.Hour), strMinute);
            }
            else total = string.Format("{0}:{1}", (g.Hour), (g.Minute));
            //string total = string.Format("{0}.{1}.{2} {3}:{4}:{5}", (g.Day - 1), (g.Month - 1), (g.Year - 1), (g.Hour), (g.Minute), (g.Second));
            return total;
        }
        catch (Exception)
        {
            return null;
        }

    }
    [WebMethod]
    public static bool checkTimeDelete(string id, int day, int month, int year, int sec, int min, int hour)
    {
        bool boolean = false;
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        user_time time_curent = new user_time(day, month, year, sec, min, hour);
        List<string> list;
        list = Database.get_from_datebase("data_start_Day, data_start_Month, data_start_Year, data_start_Hour, data_start_Min, data_start_Sec", "user_session", "where user_id='" + CurrentUser.Get_user_id() + "'");
        if (list != null)
        {
            if (list.LongCount() != 0)
            {

                user_time time_start = new user_time(int.Parse(list[0]), int.Parse(list[1]), int.Parse(list[2]), int.Parse(list[5]),
                    int.Parse(list[4]), int.Parse(list[3]));

                user_time different = new user_time();
                different = time_start;
                int count_day = different.day_difference(time_curent);
                int count_hour = time_curent.Get_hour() - time_start.Get_hour();
                int count_min = time_curent.Get_min() - time_start.Get_min();
                int count_sec = time_curent.Get_sec() - time_start.Get_sec();
                count_sec = count_sec + (count_min + (count_hour + count_day * 24) * 60) * 60;

                if (count_sec < 60)
                {
                    Database.delete_datebase("user_recording", "where user_id='" + id + "' and data_finish_Day='0'");
                    boolean = true;    
                }

            }
        }

        Database.close_connection();
        return boolean;
    }
    [WebMethod]
    public static void changeEditStatus(string id, string[] time_start_after, string[] time_finish_after, string[] time_start_befor, string[] time_finish_befor)
    {
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        Database.update_user_recording(CurrentUser, time_start_befor, time_finish_befor, time_start_after, time_finish_after);

        /*string aa = "reg";
        //UPDATE  SET type_created = 'reg' where user_id='665603526895217' 
        Database.update_datebase("user_recording","SET type_created = '123'" + "where user_id='1392912441014483'");
        //and data_stop_Month='"+old1[1]+"' and data_stop_Day='"+old1[2]+"' and data_stop_Hour='"+old1[3]+"' and data_stop_Min="+old1[4]+"'and data_stop_Year='"+old2[0]+"' and data_stop_Month='"+old2[1]+"' and data_stop_Day='"+old2[2]+"' and data_stop_Hour='"+old2[3]+"' and data_stop_Min="+old2[4]+"'");

           // string sql = string.Format("UPDATE user_recording" + " " +"set type_created='" + aa + "'"+"where user_id='1392912441014483'");
        */


        Database.close_connection();
    }


}