using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using user;
using sql_database;

namespace using_registration
{
    public class reg
    {
        public reg()
        {
        }
        public bool function_registration_check(current_user CurrentUser, database Database)
        {
            bool boolean = false;
            List<string> list;
            list = Database.get_from_datebase("user_id", "user_account", "where user_id='" + CurrentUser.Get_user_id() + "'");
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
        public bool function_registration(current_user CurrentUser, database Database)
        {
            bool boolean = false;
            Database.Insert_registration(CurrentUser.Get_user_id(), CurrentUser.Get_user_first_name(),
        CurrentUser.Get_user_last_name(), CurrentUser.Get_user_email());
            boolean = true;
            return boolean;
        }
    }
}