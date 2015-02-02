<%@ Page Language="C#" AutoEventWireup="true" CodeFile="registration.aspx.cs" Inherits="registration" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <!--" "-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--" "-->
    <title>Регистрация</title>
    <!--" "-->
    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <link href="resources/style_sheet/login.css" rel="stylesheet" />
    <!--" "-->
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/app/login.js" type="text/javascript"></script>
    <script src="resources/js/app/facebook.js" type="text/javascript"></script>
    <script src="resources/js/app/user_registration.js" type="text/javascript"></script>
    <script src="resources/js/app/registration.js" type="text/javascript"></script>
    <!--" "-->
</head>
<body>
    <div id="fb-root"></div>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="index.aspx">
                <span>Time Tracker</span></a>
        </div>
    </div>
    <div class="content">
        <div class="ch-container">
            <div class="row">
                <div class="row row_pos">
                    <div class="well col-md-5 center login-box user_login">
                        <div class="alert alert-info">
                            Форма реестрации: 
                            <br />
                            Пожалуйста, введите ваши данные.      
                        </div>
                        <div class="form-horizontal contact_form">
                            <ul>
                                <li>
                                    <div class="input-group input-group-lg">
                                        <span class="input-group-addon">
                                            <i class="glyphicon glyphicon-user red"></i>
                                        </span>
                                        <input type="text" class="form-control name" id="name" placeholder="Введите свое имя." autocomplete="off" onfocus="placeholder='';" onblur="placeholder='Введите свое имя.';" required="required" title="Maximum 16 characters" pattern="^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$" />
                                    </div>
                                    <div class="clearfix"></div>
                                    <br />
                                </li>
                                <li>
                                    <div class="input-group input-group-lg">
                                        <span class="input-group-addon">
                                            <i class="glyphicon glyphicon-user red"></i>
                                        </span>
                                        <input type="text" class="form-control surname" id="surname" placeholder="Введите свою фамилию." autocomplete="off" onfocus="placeholder='';" onblur="placeholder='Введите свою фамилию.';" required="required" title="Maximum 16 characters" pattern="^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$" />
                                    </div>
                                    <div class="clearfix"></div>
                                    <br />
                                </li>
                                <li>
                                    <div class="input-group input-group-lg">
                                        <span class="input-group-addon">
                                            <i class="glyphicon glyphicon-envelope red"></i>
                                        </span>
                                        <input type="text" class="form-control email" id="email" placeholder="Введите e-mail." autocomplete="off" onfocus="placeholder='';" onblur="placeholder='Введите e-mail.';" required="required" title="" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" />
                                    </div>
                                    <div class="clearfix"></div>
                                </li>
                                <li>
                                    <p class="center col-md-5">
                                        <input type="submit" class="btn btn-primary" onclick=" user_registration()" value="Зарегистрироватся" />
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="resources/js/vendor/bootstrap/bootstrap.js"></script>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager2" runat="server" EnablePageMethods="true"></asp:ScriptManager>
        </div>
    </form>
</body>
</html>