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
        string []arr = list.ToArray();
        string[] finalarr = new string[(list.LongCount() / 15) * 4];
        int k = arr.Length / 15;
        int j = 0;
        for (int i = 0; i < arr.Length / 15; i++)
        {
           // for (int j = 0; j < arr.Length / 15; j++)
               // {
                    finalarr[j + 0] = arr[i] + "." + arr[i + k] + "." + arr[i + 2 * k] + " " + arr[i + k * 3] + ":" + arr[i + k * 4] + ":" + arr[i + k * 5];
                    finalarr[j + 1] = arr[i + k * 6] + "." + arr[i + k * 7] + "." + arr[i + k * 8] + " " + arr[i + k * 9] + ":" + arr[i + k * 10] + ":" + arr[i + k * 11];
                    finalarr[j + 2] = arr[i + k * 12];
                    finalarr[j + 3] = arr[i + k * 14];
        //}
                    j += 4;
        }
   
        _database_.close_connection();
        return finalarr;
    }
}