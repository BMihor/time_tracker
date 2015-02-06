using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace office
{
    public class company_office
    {
        private string office_ip;
        private string office_name;
        public company_office(string _office_name_, string _office_ip_)
        {
            office_ip = _office_ip_;
            office_name = _office_name_;
        }
        public string Get_office_ip()
        {
            return office_ip;
        }
        public void Set_office_ip(string _office_ip_)
        {
            office_ip = _office_ip_;
        }
        public string Get_office_name()
        {
            return office_name;
        }
        public void Set_office_name(string _office_name_)
        {
            office_name = _office_name_;
        }
    }
}