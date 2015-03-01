using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sql_database;

namespace teacher_admin
{
    public class current_teacher
    {
        private string login;
        private string password;

        public current_teacher(string _login_, string _password_)
        {
            login = _login_;
            password = _password_;
        }
        public bool function_registration_check(database Database)
        {
            bool boolean = false;
            List<string> list;
            list = Database.get_from_datebase("login", "teacher_account", "where login='" + login + "' and password='" + password + "'");
            if (list == null)
            {
                boolean = false;
            }
            else
                if (list.LongCount() > 0)
                {
                    boolean = true;
                    Database.update_datebase_session_teacher(login, password, true);
                }
                else
                {
                    boolean = false;
                }
            return boolean;
        }
        public bool function_teacher_connection_status(database Database)
        {
            bool boolean = false;
            List<string> list;
            list = Database.get_from_datebase("login", "teacher_account", "where login='" + login + "' and password='" + password + "' and connection_status='" + true + "'");
            if (list == null)
            {
                boolean = false;
            }
            else
                if (list.LongCount() > 0)
                {
                    boolean = true;
                    Database.update_datebase_session_teacher(login, password, false);
                }
                else
                {
                    boolean = false;
                }
            return boolean;
        }
    }
}