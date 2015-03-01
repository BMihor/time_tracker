<%@ Page Language="C#" AutoEventWireup="true" CodeFile="teacher.aspx.cs" Inherits="teacher" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Teacher</title>
    <link href="resources/style_sheet/table.css" rel="stylesheet" />
    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/app/redirect.js" type="text/javascript"></script>
    <script src="resources/js/app/teacher.js" type="text/javascript"></script>
    <link href="resources/style_sheet/button.css" rel="stylesheet" />
    <link href="resources/style_sheet/timer.css" rel="stylesheet" />
    <link href="resources/style_sheet/teacher.css" rel="stylesheet" />
</head>
<body>
    <div id="loading"></div>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand">
                <span>Teacher page</span></a>
            <div class="btn-group pull-right">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i><span class="hidden-sm hidden-xs">&nbsp;Преподаватель</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li onclick="teacherPageShow()"><a>Teacher page</a></li>
                    <li onclick="propertiesShow()"><a>Properties</a></li>
                    <li onclick="officeConfigurationShow()"><a>Office configuration</a></li>
                    <li onclick="logout()"><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="block2 teacher-page">
        <div class="block-content collapse in">
            <div id="left-block">
                <table border="0" class=" table-striped table-bordered example user_name">
                    <thead>
                        <tr>
                            <th>Список студентів:</th>
                        </tr>
                    </thead>
                    <tbody id="name_user">
                    </tbody>
                </table>
            </div>
            <div id="center-block">
                <div id="head" class="navbar navbar-inner block-header">
                    <p></p>
                </div>
            </div>

            <div id="right-block">
                <table border="0" class=" table-striped table-bordered example year_count">
                    <thead>
                        <tr>
                            <th>Список годов:</th>
                        </tr>
                    </thead>
                    <tbody id="year_name">
                    </tbody>
                </table>
                <table border="0" class=" table-striped table-bordered example mounth">
                    <thead>
                        <tr>
                            <th>Список месяцев:</th>
                        </tr>
                    </thead>
                    <tbody class="wall">
                        <tr>
                            <td onclick="month_check(1, this)"><a>Январь</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(2, this)"><a>Февраль</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(3, this)"><a>Март</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(4, this)"><a>Апрель</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(5, this)"><a>Май</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(6, this)"><a>Июнь</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(7, this)"><a>Июль</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(8, this)"><a>Август</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(9, this)"><a>Сентябрь</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(10, this)"><a>Октябрь</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(11, this)"><a>Ноябрь</a></td>
                        </tr>
                        <tr>
                            <td onclick="month_check(12, this)"><a>Декабрь</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="block2 properties-page">
        <div class="block-content collapse in">
            <div>
                <div id="head_properties" class="navbar navbar-inner block-header">
                    Укажите минимальное количество времени работы студента<p></p>
                </div>               
                            <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
                    <thead>
                        <tr>
                            <th>За день</th>
                            <th>За неделю</th>
                            <th>За месяц</th>
                        </tr>
                    </thead>
                    <tbody id="wall_properties">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    
        <div class="block2 officeConfiguration">
        <div class="block-content collapse in">
            <div>
                <div id="head_officeConfiguration" class="navbar navbar-inner block-header">
                    Укажите ip адресов, с которого будет доступ<p></p>
                </div>               
                            <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered office_table"" id="example_2">
                    <thead>
                        <tr>
                            <th>Ип адрес</th>
                            <th>Название офиса</th>
                            <th></th>
                        </tr>
                                                                                                        <tr>
                            <th><input type="text" id="current_ip"/></th>
                            <th><input type="text" id="current_name"/></th>
                            <th><input type="button" value="Add" onclick="add_ip()"/></th>
                        </tr>
                    </thead>
                    <tbody id="wall_office">
                    </tbody>
                </table>
            </div>
        </div>
    </div>



    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager" runat="server" EnablePageMethods="true"></asp:ScriptManager>
        </div>
    </form>
    <script src="resources/js/vendor/bootstrap/bootstrap.js"></script>
</body>
</html>
