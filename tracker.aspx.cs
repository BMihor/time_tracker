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

public partial class tracker : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static void create_session(string id, int day, int month, int year, int sec, int min, int hour)
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
        return count_sec;
    }
    [WebMethod]
    public static void save_session_time(int count_sec, string id)
    {
        database Database = new database();
        current_user CurrentUser = new current_user(id);
        Database.open_connection();
        Database.update_datebase_session_time_count(count_sec, CurrentUser);
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
}