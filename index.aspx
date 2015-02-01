<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Time Tracker</title>
    <link href="resources/style_sheet/default.css" rel="stylesheet"/>
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/vendor/spin.js" type="text/javascript"></script>
    <script src="resources/js/app/spinner.js" type="text/javascript"></script>
    <script src="resources/js/app/check_ip.js" type="text/javascript"></script>
    <script src="resources/js/app/authorization.js" type="text/javascript"></script>
</head>
<body>
        <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="index.aspx">
                <span>Time Tracker</span></a>
            <div class="btn-group pull-right">
                <button class="btn btn-default dropdown-toggle enter" data-toggle="dropdown">
                    <i class="glyphicon"> Войти</i><span class="hidden-sm hidden-xs"></span>
                </button>
            </div>
        </div>
    </div>
    <div id="loading"></div>
    <script src="resources/js/vendor/bootstrap/bootstrap.js"></script>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager" runat="server" EnablePageMethods="true"></asp:ScriptManager>
    </div>
    </form>
</body>
</html>