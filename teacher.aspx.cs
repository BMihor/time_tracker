using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using sql_database;
using teacher_admin;
using user;
using ip;
public partial class teacher : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static bool check_teacher_connection_status()
    {
        bool boolean = false;
        current_teacher CurrentTeacher = new current_teacher("admin", "admin");
        database _database_ = new database();
        _database_.open_connection();
        boolean = CurrentTeacher.function_teacher_connection_status(_database_);
        _database_.close_connection();
        return boolean;
    }
    [WebMethod]
    public static string[] get_user_name()
    {
        database _database_ = new database();
        _database_.open_connection();
        List<string> list;
        list = _database_.get_from_datebase("user_id, user_first_name, user_last_name", "user_account", "");
        string[] student = list.ToArray();
        _database_.close_connection();
        return student;
    }
    [WebMethod]
    public static string[] get_year()
    {
        database _database_ = new database();
        _database_.open_connection();
        List<string> list;
        list = _database_.get_from_datebase("data_finish_Year", "user_recording", "");
        int count_get_year = 0;
        string[] arr_year_null = { "" };
        if (list != null)
        {
            if (list.LongCount() > 0)
            {
                if (list[0] != 0.ToString())
                {
                    string year = list[0];
                    count_get_year = 1;
                    for (int i = 0; i < list.LongCount(); i++)
                    {
                        if (year != list[i] && list[i] != 0.ToString())
                        {
                            count_get_year++;
                        }
                    }
                }
            }
            if (count_get_year > 0)
            {
                string[] arr_year = new string[count_get_year];
                arr_year[0] = list[0];
                int j = 0;
                for (int i = 0; i < list.LongCount(); i++)
                {
                    if (arr_year[j] != list[i] && list[i] != 0.ToString())
                    {
                        j++;
                        arr_year[j] = list[i];
                    }
                }
                return arr_year;
            }
        }
        _database_.close_connection();
        return arr_year_null;
    }

    [WebMethod]
    public static string[] get_user_information(string user_id, int month, int year_number)
    {
        current_user CurrentUser = new current_user(user_id);
        string[] list_befor_month;
        string[] list_curent_month;
        string[] list_after_month;
        list_curent_month = CurrentUser.get_records_for_month(month, year_number);
        if (month != 1)
        {
            list_befor_month = CurrentUser.get_records_for_month(month - 1, year_number);
        }
        else
        {
            list_befor_month = CurrentUser.get_records_for_month(12, year_number - 1);
        }

        if (month != 12)
        {
            list_after_month = CurrentUser.get_records_for_month(month + 1, year_number);
        }
        else
        {
            list_after_month = CurrentUser.get_records_for_month(1, year_number + 1);
        }
        string[] finish_arr = CurrentUser.get_information(list_befor_month, list_curent_month, list_after_month, month, year_number);
        return finish_arr;
    }

    [WebMethod]
    public static string[] generation_table_properties()
    {
        database _database_ = new database();
        _database_.open_connection();
        List<string> list;
        list = _database_.get_from_datebase("count_work_day, count_work_week, count_work_month", "user_count_work", "");
        string[] arr = list.ToArray();
        _database_.close_connection();
        return arr;
    }
    [WebMethod]
    public static void update_table_properties(int[] befor, int[] after)
    {
        database _database_ = new database();
        _database_.open_connection();
        _database_.update_table_properties(befor, after);
        _database_.close_connection();
    }
    [WebMethod]
    public static int[] check_work()
    {
        int[] count_work = new int[3];
        database _database_ = new database();
        _database_.open_connection();
        List<string> list;
        list = _database_.get_from_datebase("count_work_day, count_work_week, count_work_month", "user_count_work", "");
        string[] arr = list.ToArray();
        for (int i = 0; i < 3; i++)
        {
            count_work[i] = int.Parse(arr[i]);
        }
        _database_.close_connection();
        return count_work;
    }
    [WebMethod]
    public static string[] check_ip_office()
    {     
        database _database_ = new database();
        _database_.open_connection();
        List<string> list;
        list = _database_.get_from_datebase("permitted_ip, office_name", "access_connect", "");
        string[] arr = list.ToArray();
        _database_.close_connection();
        return arr;
    }
    [WebMethod]
    public static void update_table_ip(string[] befor, string[] after)
    {
        database _database_ = new database();
        _database_.open_connection();
        _database_.update_table_ip(befor, after);
        _database_.close_connection();
    }


    [WebMethod]
    public static string get_ip_user()
    {
        string ip_address_user = HttpContext.Current.Request.UserHostAddress;
        char[] _ip_address_false = new char[ip_address_user.Length];
        char[] _ip_address_true = new char[ip_address_user.Length - 2];
        _ip_address_false = ip_address_user.ToCharArray();
        string ip_true;
        if (_ip_address_false[0] == ':')
        {
            for (int i = 0; i < ip_address_user.Length - 2; i++)
            {
                _ip_address_true[i] = _ip_address_false[i + 2];
            }
            ip_true = new string(_ip_address_true);
        }
        else
        {
            ip_true = ip_address_user;
        }

        return ip_true;
    }   
    [WebMethod]
    public static void add_ipAddress(string ip, string name)
    {
        database Database = new database();
        Database.open_connection();
        Database.insert_datbase_ip_connection(ip, name);
        Database.close_connection();
    }
}
