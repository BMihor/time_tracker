<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <title>Time Tracker</title>
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/vendor/spin.js" type="text/javascript"></script>
    <script src="resources/js/app/spinner.js" type="text/javascript"></script>
    <script src="resources/js/app/facebook.js" type="text/javascript"></script>
    <script src="resources/js/app/index.js" type="text/javascript"></script>

    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <link href="resources/style_sheet/error_403.css" rel="stylesheet" />
    <link href="resources/style_sheet/login.css" rel="stylesheet" />
    <link href="resources/style_sheet/index.css" rel="stylesheet" />
</head>
<body>
    <div id="fb-root"></div>
    <div id="loading"></div>

    <div class="ch-container error_403_js">
        <div class="row row_pos" id="None">
            <div class="well center col-md-5 login-box">
                <div class="wH1">
                    <h1></h1>
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

    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="index.aspx">
                <span>Time Tracker</span>
            </a>
            <div class="btn-group pull-right">
                <button class="btn btn-default dropdown-toggle enter go_to_admin_panel" data-toggle="dropdown">
                    <i class="glyphicon">Панель администратора</i>
                    <span class="hidden-sm hidden-xs"></span>
                </button>
            </div>
        </div>
    </div>

    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager" runat="server" EnablePageMethods="true"></asp:ScriptManager>
        </div>
    </form>
</body>
</html>
