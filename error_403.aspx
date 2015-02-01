<%@ Page Language="C#" AutoEventWireup="true" CodeFile="error_403.aspx.cs" Inherits="error_403" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Error 403</title>
    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <link href="resources/style_sheet/error_403.css" rel="stylesheet" />
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
</head>
<body>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="default.aspx">
                <span>Time Tracker</span></a>
        </div>
    </div>
    <div class="error">
        <div id="fof" class="clear">
            <div class="positioned">
                <div class="hgroup clear">
                    <div class="wH1">
                    <h1>403</h1>
                        </div>
                    <div class="wH2">
                    <h2>Ошибка <br/> Извините, доступ запрещен :(</h2>
                        </div>
                    
                </div>
                <p>Страница не может быть доступна, у Вас нету прав чтобы открыть страницу.
                    Вы пытаетесь открыть страницу, доступную только через сеть компании.
                    Чтобы продолжить, достаточно зайти через внутреннею сеть компании. </p>
            </div>
        </div>
        </div>
    <script src="resources/js/vendor/bootstrap/bootstrap.js"></script>
    <form id="error403" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
