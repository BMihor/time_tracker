<%@ Page Language="C#" AutoEventWireup="true" CodeFile="default.aspx.cs" Inherits="_default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="resources/style_sheet/default.css" rel="stylesheet"/>
    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
</head>
<body>
        <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="default.aspx">
                <span>Time Tracker</span></a>
            <div class="btn-group pull-right">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i><span class="hidden-sm hidden-xs"> Ihor Drevetskyi</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">Profile</a></li>
                    <li class="divider"></li>
                    <li><a href="login.html">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
    <script src="resources/js/vendor/bootstrap/bootstrap.js"></script>
    <form id="form1" runat="server">
    <div>  
    </div>
    </form>
</body>
</html>