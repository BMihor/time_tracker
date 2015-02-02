using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace user
{
    public class current_user
    {
        private string user_id;
        private string user_first_name;
        private string user_last_name;
        private string user_email;

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
    }
}