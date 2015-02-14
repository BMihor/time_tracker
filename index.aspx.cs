using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using program_logic;
using System.Web.Services;
using user;
using sql_database;

public partial class index : System.Web.UI.Page
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
    public static bool check_is_user_and_connected(string id)
    {
        Program_logic logic = new Program_logic();
        return logic.check_is_user_and_connected(id);;
    }
    [WebMethod]
    public static bool initialization(string id, string type)
    {
        Program_logic logic = new Program_logic();
        return logic.initialization_login(id, type);
    }
    [WebMethod]
    public static void session_connection(string id, bool status)
    {
        database _database_ = new database();
        _database_.open_connection();
        _database_.update_datebase_session_connection(id, status);
        _database_.close_connection();
    }
}