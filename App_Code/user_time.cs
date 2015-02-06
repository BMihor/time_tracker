using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using user;
using sql_database;

namespace time_user
{
    public class user_time
    {
        private int day;
        private int month;
        public int year;
        private int sec;
        private int min;
        private int hour;
        public user_time() { }
        public user_time(int _day_, int _month_, int _year_, int _sec_, int _min_, int _hour_)
        {
            day = _day_;
            month = _month_;
            year = _year_;
            sec = _sec_;
            min = _min_;
            hour = _hour_;
        }
        public int Get_day()
        {
            return day;
        }
        public void Set_day(int _day_)
        {
            day = _day_;
        }
        public int Get_month()
        {
            return month;
        }
        public void Set_month(int _month_)
        {
            month = _month_;
        }
        public int Get_year()
        {
            return year;
        }
        public void Set_year(int _year_)
        {
            year = _year_;
        }
        public int Get_sec()
        {
            return sec;
        }
        public void Set_sec(int _sec)
        {
            sec = _sec;
        }
        public int Get_min()
        {
            return min;
        }
        public void Set_min(int _min)
        {
            min = _min;
        }
        public int Get_hour()
        {
            return hour;
        }
        public void Set_hour(int _hour)
        {
            hour = _hour;
        }
        public string Get_time()
        {
            return day.ToString() + "." + month.ToString() + "." +
                year.ToString() + ":" + hour.ToString() + ":" + min.ToString() + ":" + sec.ToString();
        }
        public int get_timer_time(user_time time, current_user CurrentUser, database Database)
        {
            int timer = 0;

            return timer;
        }
        public int day_difference(user_time date_finish)
        {
            int count = 0;
            //число дней по месяцам в году (невисокосном)
            int[] month_days = new int[] { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
            //если обе даты равны - возвращаем "0"
            if (year == date_finish.Get_year() &&
                month == date_finish.Get_month() &&
                day == date_finish.Get_day())
                count = 0;
            if (year == date_finish.Get_year())
                if (month == date_finish.Get_month())
                {
                    count = date_finish.Get_day() - day;
                    return count;
                }
                else /*if(m != date.GateM())*/
                {
                    int days = 0;
                    //если текущий год високосный - устанавливаем в феврале 28 дней
                    if (((year % 4 != 0) && (year % 100 == 0)) ||
                        ((year % 100 != 0) && (year % 400 != 0)))
                    {
                        month_days[1] = 29;
                    }
                    //получаем остаток дней до конца месяца;
                    days = month_days[month - 1] - day;
                    //суммируем дни "целых" месяцов
                    for (int i = month; i < date_finish.Get_month() - 1; i++)
                    {
                        days += month_days[i];
                    }
                    //прибавляем оставшие дни и возвращаем значение в вызывающую ф-ю
                    count = days += date_finish.Get_day();
                    return count;
                }
            else /*if(y != date.GateY())*/
            {
                int days = 0;
                //сначала вычисляем число дней до конца текущего года
                //если начальный год високосный - устанавливаем в феврале 28 дней
                if (((year % 4 != 0) && (year % 100 == 0)) ||
                            ((year % 100 != 0) && (year % 400 != 0)))
                {
                    month_days[1] = 29;
                }
                //плюсуем остаток дней до конца месяца
                days = month_days[month - 1] - day;
                //далее плюсуем число дней каждого месяца до конца года
                for (int i = month; i < 12; i++)
                    days += month_days[i];
                //потом плюсуем дни по годам (365 и 366 в високосном)
                for (int i = year + 1; i < date_finish.Get_year(); i++)
                    if (((year % 4 != 0) && (year % 100 == 0)) ||
                           ((year % 100 != 0) && (year % 400 != 0)))
                        days += 366;
                    else days += 365;
                //если последний год високосный - устанавливаем в феврале 28 дней
                //иначе - 30   
                if (((date_finish.Get_year() % 4 != 0) && (date_finish.Get_year() % 100 == 0)) ||
                        ((date_finish.Get_year() % 100 != 0) && (date_finish.Get_year() % 400 != 0)))
                    month_days[1] = 29;
                else month_days[1] = 28;
                //плюсуем число дней "целых" месяцев
                for (int i = 0; i < date_finish.Get_month() - 1; i++)
                    days += month_days[i];
                //плюсуем оставшиеся дний
                count = days += date_finish.Get_day();
                return count;
            }
        }
        public void day_add(int days)
        {
            //число дней по месяцам в году (невисокосном)
            int[] month_days = new int[] { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
            if (((year % 4 != 0) && (year % 100 == 0)) ||
                        ((year % 100 != 0) && (year % 400 != 0)))
            {
                month_days[1] = 29;
            }
            //вычисляем сколько до дней до конца месяца, точнее вычитаем этот остаток от days
            if (days <= month_days[month - 1] - day)
                day += days;
            else
            {
                days -= month_days[month - 1] - day + 1;
                day = 1;
                if (month < 11)
                    month += 1;
                else
                {
                    month = 1;
                    year += 1;
                    if (((year % 4 != 0) && (year % 100 == 0)) ||
                    ((year % 100 != 0) && (year % 400 != 0)))
                        month_days[1] = 29;
                    else month_days[1] = 28;
                }
                while (days > 0)
                {
                    for ( int m = month; days >= month_days[month - 1]; )
                        if (days >= month_days[month - 1])
                        {
                            days -= month_days[month - 1];
                            m += 1;
                            month = m;
                            if (m == 13)
                            {
                                m = 1;
                                month = m;
                                year += 1;
                                if (((year % 4 != 0) && (year % 100 == 0)) ||
                       ((year % 100 != 0) && (year % 400 != 0)))
                                    month_days[1] = 29;
                                else month_days[1] = 28;
                            }
                        }
                        else
                        {
                            day += days;
                            days = 0;
                            break;
                        }
                    if (days > 0)
                    {
                        day += days;
                        days = 0;
                    }
                }
            }
        }
    }
}