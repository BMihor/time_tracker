<%@ Page Language="C#" AutoEventWireup="true" CodeFile="tracker.aspx.cs" Inherits="tracker" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Tracker</title>

    <link href="resources/style_sheet/table.css" rel="stylesheet" />
    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <link href="resources/style_sheet/button.css" rel="stylesheet" />
    <link href="resources/style_sheet/timer.css" rel="stylesheet" />

    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/vendor/spin.js" type="text/javascript"></script>
    <script src="resources/js/app/spinner.js" type="text/javascript"></script>

    <script src="resources/js/app/facebook.js" type="text/javascript"></script>
    <script src="resources/js/app/tracker.js" type="text/javascript"></script>
    <script src="resources/js/app/session.js" type="text/javascript"></script>
</head>
<body>
    <div id="fb-root"></div>
    <div id="loading"></div>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand">
                <span>Time Tracker</span></a>
            <div class="btn-group pull-right">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i><span class="hidden-sm hidden-xs user_name"></span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a onclick="logout()">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="block2">
        <div class="block-content collapse in">
            <form name="TestForm" class=" stats_overview overview_today">
                <div class="timerTest">
                    <input class="timer" name="stopwatch" size="10" value="" disabled="disabled" />
                    <input id="startButton" type="button" value="Start" class="action-button shadow animate green" onclick="start(0); activeButton(this)" />
                    <input type="button" id="stopButton" value="Stop" class="action-button shadow animate red" onclick="pause(); activeButton(this)" />
                </div>
            </form>
        </div>
    </div>

    <div class="container-fluid">
        <div class="span9" id="content">
            <div class="row-fluid">
                <div class="row-fluid">
                    <div class="block">
                        <div id="head" class="navbar navbar-inner block-header">
                            <br />
                            Время работы сегодня: 00:00<p></p>
                        </div>
                        <div class="block-content collapse in">
                            <div class="span12">
                                <input type="button" class="top-but" value="Add new record">
                                <a href="javascript://" onclick="addRow('example');return false;">Добавить строку</a>
                                <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
                                    <thead>
                                        <tr>
                                            <th>Время начала</th>
                                            <th>Время остановки</th>
                                            <th>Тип создания записи</th>
                                            <th>Количество часов всего </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="wall">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <!--<script src="resources/js/vendor/jquery/jquery.dataTables.min.js"></script>-->
        <!--<script src="resources/js/app/assets/DT_bootstrap.js"></script>
        <script>
            $(function () {

            });
        </script>-->
    </div>

    <script src="resources/js/vendor/bootstrap/bootstrap.js"></script>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager2" runat="server" EnablePageMethods="true"></asp:ScriptManager>
        </div>
    </form>
</body>
</html>
