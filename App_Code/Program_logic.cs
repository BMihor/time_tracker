using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using office;
using user;
using sql_database;
using ip;
using time_user;

namespace program_logic
{
    public class Program_logic
    {
        public Program_logic()
        {
        }
        public bool check_ip()
        {
            bool enable_access = false;
            database _database_ = new database();
            _database_.open_connection();
            ip_address address = new ip_address();
            enable_access = address.check_ip(_database_, address);
            _database_.close_connection();
            return enable_access;
        }
        public bool check_is_user_and_connected(string id)
        {
            bool boolean = false;
            database _database_ = new database();
            _database_.open_connection();
            current_user CurrentUser = new current_user(id);
            bool registration_check = false;
            registration_check = CurrentUser.function_registration_check(_database_);
            bool authorization_check = false;
            authorization_check = CurrentUser.function_authorization_check(_database_);
            if (registration_check == true && authorization_check == true)
            {
                boolean = true;
            }
            else
            {
                boolean = false;
            }
            _database_.close_connection();
            return boolean;
        }
        public bool initialization_login(string id, string type)
        {
            bool boolean = false;
            current_user CurrentUser = new current_user(id);
            database Database = new database();
            Database.open_connection();
            if (type == "login")
            {
                boolean = CurrentUser.function_registration_check(Database);
            }
            Database.close_connection();
            return boolean;
        }
    }
}