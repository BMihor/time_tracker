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

public partial class registration : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static bool check_ip()
    {
        database _database_ = new database();
        _database_.open_connection();
        bool enable_access = false;
        ip_address address = new ip_address();
        enable_access = address.check_ip();
        _database_.close_connection();
        return enable_access;
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
    public static bool initialization(string id, string first_name, string last_name, string email, string type)
    {
        bool boolean = false;
        current_user CurrentUser = new current_user(id, first_name, last_name, email);
        database Database = new database();
        Database.open_connection();
        if (type == "registration")
        {
            boolean = CurrentUser.function_registration(Database);
        }
        Database.close_connection();
        return boolean;
    }
}