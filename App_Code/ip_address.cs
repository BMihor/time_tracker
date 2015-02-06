using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sql_database;
using office;
namespace ip
{
    public class ip_address
    {
        private string ip;
        public ip_address()
        {
            ip = HttpContext.Current.Request.UserHostAddress;
        }
        public string Get_ip_address()
        {
            return ip;
        }
        public bool check_ip()
        {
            bool enable_access = false;
            bool boolean = check_ip_registration();
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
        private bool check_ip_registration()
        {
            bool boolean = false;
            database _database_ = new database();
            _database_.open_connection();
            char [] _ip_address_false = new char[ip.Length];
            char[] _ip_address_true = new char[ip.Length - 2];
            _ip_address_false = ip.ToCharArray();
            string ip_true;
            if (_ip_address_false[0] == ':')
            {
                for (int i = 0; i < ip.Length - 2; i++)
                {
                    _ip_address_true[i] = _ip_address_false[i + 2];
                }
                ip_true = new string(_ip_address_true);
            }
            else
            {
                ip_true = ip;
            }
            List<string> address = _database_.get_from_datebase("permitted_ip", "access_connect", "where permitted_ip='" + ip_true + "'");
            if (address == null)
            {
                boolean = false;
            }
            else
            if (address.LongCount() > 0)
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
        public void registration_new_ip(company_office office, database Database)
        {
        }
    }
}