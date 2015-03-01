using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sql_database;
using time_user;

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
        public string[] get_records_for_month(int month, int year)
        {
            int[] month_days = new int[] { 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
            //если текущий год високосный - устанавливаем в феврале 28 дней
            if (((year % 4 != 0) && (year % 100 == 0)) ||
                ((year % 100 != 0) && (year % 400 != 0)))
            {
                month_days[1] = 28;
            }
            database _database_ = new database();

            _database_.open_connection();
            List<string> list_curent_month;
            list_curent_month = _database_.get_from_datebase("data_start_Day, data_start_Month, data_start_Year, data_start_Sec, data_start_Min, data_start_Hour, data_finish_Day, data_finish_Month, data_finish_Year, data_finish_Sec, data_finish_Min, data_finish_Hour", "user_recording", "where user_id='" + user_id + "' and data_finish_Month=" + month + " and data_finish_Year=" + year + "");
            string[] records_for_month = new string[month_days[month - 1] * 2];
            if (list_curent_month != null)
            {
                if (list_curent_month.Count >= 0)
                {
                    string[] day_of_month = new string[month_days[month - 1]];
                    for (int i = 0; i < month_days[month - 1]; i++)
                    {
                        day_of_month[i] = i + 1 + ":" + month + ":" + year;
                        records_for_month[i] = day_of_month[i];
                    }
                    int count_work = 0;
                    int count_all_day_work = 0;
                    int count_recording_month = list_curent_month.Count() / 12;
                    int pos = month_days[month - 1];
                    for (int zt = pos; zt < records_for_month.Length; zt++)
                    {
                        records_for_month[zt] = count_all_day_work.ToString();
                    }
                    int count_sec = 0;
                    int count_min = 0;
                    int count_hour = 0;
                    int count_day = 0;
                    for (int i = 0; i < month_days[month - 1]; i++)
                    {
                        for (int x = 0; x < count_recording_month; x++)
                        {
                            if (day_of_month[i] == list_curent_month[x] + ":" + list_curent_month[x + count_recording_month] + ":" + list_curent_month[x + count_recording_month * 2])
                            {
                                user_time time_finish = new user_time(int.Parse(list_curent_month[x + count_recording_month * 6]),
                                    int.Parse(list_curent_month[x + count_recording_month * 7]),
                                    int.Parse(list_curent_month[x + count_recording_month * 8]),
                                    int.Parse(list_curent_month[x + count_recording_month * 9]),
                                    int.Parse(list_curent_month[x + count_recording_month * 10]),
                                    int.Parse(list_curent_month[x + count_recording_month * 11]));
                                user_time time_start = new user_time(int.Parse(list_curent_month[x]),
                                    int.Parse(list_curent_month[x + count_recording_month]),
                                    int.Parse(list_curent_month[x + count_recording_month * 2]),
                                    int.Parse(list_curent_month[x + count_recording_month * 3]),
                                    int.Parse(list_curent_month[x + count_recording_month * 4]),
                                    int.Parse(list_curent_month[x + count_recording_month * 5]));
                                user_time different = new user_time();
                                different = time_start;
                                count_day = different.day_difference(time_finish);
                                count_hour = time_finish.Get_hour() - time_start.Get_hour();
                                count_min = time_finish.Get_min() - time_start.Get_min();
                                count_sec = time_finish.Get_sec() - time_start.Get_sec();
                                count_sec = count_sec + (count_min + (count_hour + count_day * 24) * 60) * 60;
                                count_work = count_sec;
                                count_all_day_work = count_work + int.Parse(records_for_month[pos]);
                                records_for_month[pos] = count_all_day_work.ToString();
                                if (day_of_month[i] != list_curent_month[x + 1] + ":" + list_curent_month[x + 1 + count_recording_month] + ":" + list_curent_month[x + 1 + count_recording_month * 2])
                                {
                                    break;
                                }
                            }
                            else
                            {
                                count_work = 0;
                                records_for_month[pos] = count_work.ToString();
                            }
                        }
                        pos++;
                    }
                }
            }
            _database_.close_connection();
            return records_for_month;
        }
        public string[] get_information(string[] list_befor_month, string[] list_curent_month, string[] list_after_month, int month, int year_number)
        {
            user_time UserTime = new user_time();          
            int day_number = 0;
            int count_week = 0;
            day_number =  UserTime.number_day(1 ,month, year_number);

            int[] month_days = new int[] { 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
            //если текущий год високосный - устанавливаем в феврале 28 дней
            if (((year_number % 4 != 0) && (year_number % 100 == 0)) ||
                ((year_number % 100 != 0) && (year_number % 400 != 0)))
            {
                month_days[1] = 28;
            }

            if ((month_days[month - 1] == 29 && (day_number == 6 || day_number == 7)) ||
                (month_days[month - 1] == 28 && (day_number == 6 || day_number == 7 || day_number == 1))
                || (day_number == 6 && month_days[month - 1] == 30))
            {
                count_week = 4;
            }
            else
            {
                count_week = 5;
            }

            string[] finish_arr = new string[5 * count_week * 2];

            if (day_number == 1)
            {
                int count_weeks_itr = 0;
                int i = day_number - 1;
                int ipoch = 5 - (month_days[month - 1] - 28);
                int j = 0;
                for (; j < finish_arr.Length / 2; j++)
                {
                    if (i == month_days[month - 1])
                    {
                        break;
                    }
                    finish_arr[j] = list_curent_month[i];
                    finish_arr[j + finish_arr.Length / 2] = list_curent_month[i + month_days[month - 1]];
                    i++;
                    if (i % 7 == 5)
                    {
                        i += 2;
                        count_weeks_itr++;
                    }
                }
                if (count_weeks_itr != count_week)
                {
                    for (int x = 0; x < ipoch; x++)
                    {
                        finish_arr[j] = list_after_month[x];
                        finish_arr[j + (finish_arr.Length / 2)] = list_after_month[x + month_days[month]];
                        j++;
                    }
                }
            }

            if (day_number >= 2 && day_number <= 5)
            {
                int count_weeks_itr = 0;
                int count = day_number - 1;
                int f = 5 - count;
                int k = 0, i = 0;
                for (; k < count; k++)
                {
                    if (month == 1)
                    {
                        month = 13;
                    }
                    finish_arr[k] = list_befor_month[month_days[month - 2] - count + k];
                    finish_arr[k + (finish_arr.Length / 2)] = list_befor_month[list_befor_month.Length - count + k];
                }
                if (month == 13)
                {
                    month = 12;
                }
                int ipoch = 5 - UserTime.number_day(month_days[month - 1], month, year_number);

                for (; k < finish_arr.Length / 2; k++)
                {
                    finish_arr[k] = list_curent_month[i];
                    finish_arr[k + (finish_arr.Length / 2)] = list_curent_month[i + month_days[month - 1]];
                    if (i == month_days[month - 1] - 1)
                    {
                        k++;
                        break;
                    }
                    i++;
                    if (i % 7 == f)
                    {
                        i += 2;
                        count_weeks_itr++;
                    }
                }
                if (count_weeks_itr != count_week)
                {
                    for (int x = 0; x < ipoch; x++)
                    {
                        finish_arr[k] = list_after_month[x];
                        if (month == 12)
                        {
                            month = 0;
                        }
                        finish_arr[k + (finish_arr.Length / 2)] = list_after_month[x + month_days[month]];
                        k++;
                    }
                }
            }

            if (day_number == 6 || day_number == 7)
            {
                int count_weeks_itr = 0;
                int i = 1 + (7 - day_number);
                int z = 0;
                if (i == 2)
                {
                    z = 0;
                }
                else
                {
                    if (i == 1)
                    {
                        z = 6;
                    }
                }
                int ipoch = 5 - UserTime.number_day(month_days[month - 1], month, year_number);
                int j = 0;
                for (; j < finish_arr.Length / 2; j++)
                {
                    finish_arr[j] = list_curent_month[i];
                    finish_arr[j + (finish_arr.Length / 2)] = list_curent_month[i + month_days[month - 1]];
                    if (i == month_days[month - 1] - 1)
                    {
                        j++;
                        break;
                    }
                    i++;
                    if (i % 7 == z)
                    {
                        i += 2;
                        count_weeks_itr++;
                    }
                }
                if (count_weeks_itr != count_week)
                {
                    for (int k = 0; k < ipoch; k++)
                    {
                        finish_arr[j] = list_after_month[k];
                        finish_arr[j + (finish_arr.Length / 2)] = list_after_month[k + month_days[month - 1]];
                        j++;
                    }
                }

            }
            return finish_arr;
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