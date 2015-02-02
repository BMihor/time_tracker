using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ip;
using sql_database;
using user;
using using_registration;

public partial class registration : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static bool check_ip()
    {
        bool enable_access = false;
        ip_address address = new ip_address();
        enable_access = address.check_ip();
        return enable_access;
    }
    [WebMethod]
    public static bool check_is_user(string id)
    {
        bool boolean = false;
        database Database = new database();
        Database.open_connection();
        List<string> list;
        list = Database.get_from_datebase("user_id", "user_account", "where user_id='" + id + "'");
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
        Database.close_connection();
        return boolean;
    }
    [WebMethod]
    public static bool initialization(string id, string first_name, string last_name, string email, string type)
    {
        bool boolean = false;
        current_user CurrentUser = new current_user(id, first_name, last_name, email);
        database Database = new database();
        Database.open_connection();
        reg register = new reg();
        if (type == "registration")
        {
            boolean = register.function_registration(CurrentUser, Database);
        }
        Database.close_connection();
        return boolean;
    }
}