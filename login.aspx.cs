using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using user;
using sql_database;
using using_registration;

public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    { }
    [WebMethod]
    public static bool initialization(string id, string first_name, string last_name, string email, string type)
    {
        bool boolean = false;
        current_user CurrentUser = new current_user(id, first_name, last_name, email);
        database Database = new database();
        Database.open_connection();
        reg register = new reg();
        if (type == "login")
        {
            boolean = register.function_registration_check(CurrentUser, Database);
        }
        Database.close_connection();
        return boolean;
    }
}