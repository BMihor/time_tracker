using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ip;


public partial class index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static bool check_ip()
    {
        bool enable_access = false;
        ip_address address = new ip_address();
        bool boolean = address.check_ip_registration();     
        if (boolean == true)
        {
            enable_access = true;
        }
        else
        {
            enable_access = false;
        }
        return enable_access;
    }
}