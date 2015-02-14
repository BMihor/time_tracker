using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sql_database;

namespace user
{
    public class current_user
    {
        private string user_id;
        private string user_first_name;
        private string user_last_name;
        private string user_email;
        public current_user(string _user_id)
        {
            user_id = _user_id;
            user_first_name = null;
            user_last_name = null;
            user_email = null;
        }
        public current_user(string _user_id, string _user_first_name, string _user_last_name, string _user_email)
        {
            user_id = _user_id;
            user_first_name = _user_first_name;
            user_last_name = _user_last_name;
            user_email = _user_email;
        }
        public string Get_user_id()
        {
            return user_id;
        }
        public string Get_user_first_name()
        {
            return user_first_name;
        }
        public string Get_user_last_name()
        {
            return user_last_name;
        }
        public string Get_user_email()
        {
            return user_email;
        }
        public string Get_user_name()
        {
            return user_first_name + " " + user_last_name;
        }

        public bool function_registration_check(database Database)
        {
            bool boolean = false;
            List<string> list;
            list = Database.get_from_datebase("user_id", "user_account", "where user_id='" + user_id + "'");
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
        public bool function_authorization_check(database Database)
        {
            bool boolean = false;
            List<string> list;
            list = Database.get_from_datebase("connection_status", "user_session", "where user_id='" + user_id + "' and connection_status='1'");
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
        public bool function_registration(database Database)
        {
            bool boolean = false;
            Database.insert_datebase_user(user_id, user_first_name,
        user_last_name, user_email);
            Database.insert_datbase_session_connection(user_id, Database);
            boolean = true;
            return boolean;
        }
    }
}