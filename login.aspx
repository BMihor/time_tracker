<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <!--" "-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--" "-->
    <title>Авторизация</title>
    <!--" "-->
    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <link href="resources/style_sheet/login.css" rel="stylesheet" />
    <!--" "-->
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/app/registration.js" type="text/javascript"></script>
    <script src="resources/js/app/facebook.js" type="text/javascript"></script>
    <script src="resources/js/app/login.js" type="text/javascript"></script>
    <!--" "-->
</head>
<body>
    <div id="fb-root"></div>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="index.aspx">
                <span>Time Tracker</span></a>
            <div class="btn-group pull-right">
                <button class="btn btn-default dropdown-toggle enter go_to_user_panel" data-toggle="dropdown">
                    <i class="glyphicon">Войти через facebook</i><span class="hidden-sm hidden-xs"></span>
                </button>
                <button class="btn btn-default dropdown-toggle enter go_to_admin_panel" data-toggle="dropdown">
                    <i class="glyphicon">Панель администратора</i><span class="hidden-sm hidden-xs"></span>
                </button>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="ch-container">
            <div class="row">
                <div class="row row_pos">
                    <div class="well col-md-5 center login-box user_login">
                        <div class="alert alert-info">
                            Авторизация
                            <br />
                            Пожалуйста, войдите через социальную сеть.      
                        </div>
                        <div class="form-horizontal contact_form">
                            <ul>
                                <li>
                                    <p class="center col-md-5">
                                        <input type="submit" class="btn btn-primary submit" onclick=" enter_facebook();" value="Войти через facebook" />
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
            <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true"></asp:ScriptManager>
        </div>
    </form>
</body>
</html>