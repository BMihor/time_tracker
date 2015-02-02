<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <!--" "-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--" "-->
    <title>Time Tracker</title>
    <!--" "-->
    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <link href="resources/style_sheet/error_403.css" rel="stylesheet" />
    <link href="resources/style_sheet/login.css" rel="stylesheet" />
    <link href="resources/style_sheet/index.css" rel="stylesheet" />
    <!--" "-->
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/vendor/spin.js" type="text/javascript"></script>
    <script src="resources/js/app/spinner.js" type="text/javascript"></script>
    <script src="resources/js/app/login.js" type="text/javascript"></script>
    <script src="resources/js/app/authorization.js" type="text/javascript"></script>
    <script src="resources/js/app/facebook.js" type="text/javascript"></script>
    <script src="resources/js/app/registration.js" type="text/javascript"></script>
    <!--" "-->
</head>
<body>
    <div id="fb-root"></div>
    <div id="loading"></div>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="index.aspx">
                <span>Time Tracker</span></a>
            <div class="btn-group pull-right">
                <button class="btn btn-default dropdown-toggle enter" data-toggle="dropdown">
                    <i class="glyphicon">Войти </i><span class="hidden-sm hidden-xs"></span>
                </button>
            </div>
        </div>
    </div>
    <div class="ch-container error_403_js">
        <div class="row row_pos">
            <div class="well center col-md-5 login-box">
                <div class="wH1">
                    <h1>403</h1>
                </div>
                <div class="wH2">
                    <h2>Ошибка
                        <br />
                        Извините, доступ запрещен :(</h2>
                </div>
                <p>
                    Страница не может быть доступна, у Вас отключен JavaScript.
                    Вы пытаетесь открыть страницу, доступную только c использованием JavaScript-а.
                    Чтобы продолжить, достаточно зайти в настройки включить JavaScript.
                </p>
            </div>
        </div>
    </div>
    <div class="content enter_user">
        <div class="ch-container">
            <div class="row">
                <div class="row row_pos">
                    <div class="well col-md-5 center login-box user_login">
                        <div class="alert alert-info">
                            Пожалуйста, войдите через социальную сеть.      
                        </div>
                        <div class="form-horizontal contact_form">
                            <ul>
                                <li>
                                    <img src="resources/images/timetracker.png" title="timetracker" />
                                    <p class="center col-md-5">
                                        <button type="submit" onclick=" enter_facebook()" class="btn btn-primary">
                                            Войти через
                                            <br />
                                            facebook</button>
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
            <asp:ScriptManager ID="ScriptManager" runat="server" EnablePageMethods="true"></asp:ScriptManager>
        </div>
    </form>
</body>
</html>
