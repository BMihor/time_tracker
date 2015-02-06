<%@ Page Language="C#" AutoEventWireup="true" CodeFile="tracker.aspx.cs" Inherits="tracker" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Tracker</title>
    <link href="resources/style_sheet/default.css" rel="stylesheet" />
    <link href="resources/style_sheet/button.css" rel="stylesheet" />
    <link href="resources/style_sheet/timer.css" rel="stylesheet" />

    <script src="resources/js/vendor/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>
    <script src="resources/js/app/facebook.js" type="text/javascript"></script>
    <script src="resources/js/app/tracker.js" type="text/javascript"></script>
    <script src="resources/js/app/session.js" type="text/javascript"></script>


    <!--

        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen"/>
        <link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen"/>
        <link href="assets/styles.css" rel="stylesheet" media="screen"/>
        <link href="assets/DT_bootstrap.css" rel="stylesheet" media="screen"/>
		<link rel="stylesheet" type="text/css" href="ForTable.css"/>
    -->

    <link href="resources/style_sheet/table.css" rel="stylesheet" />
    <script src="resources/js/app/table.js" type="text/javascript"></script>

</head>
<body>
    <div id="fb-root"></div>
    <div id="loading"></div>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <a class="navbar-brand" href="index.aspx">
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

    <!--
            <div class="container-fluid">
                <div class="span9" id="content">
                    <div class="row-fluid">
                     <div class="row-fluid">
                        <div class="block">
                            <div id="head" class="navbar navbar-inner block-header"><br/>Working hours Today: 00:40<p></p>
                            </div>
                            <div class="block-content collapse in">
                                <div class="span12">
									<input type="button" class="top-but" value ="Add new record">
  									<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
										<thead>
											<tr>
												<th>Start time</th>
												<th>Stop time</th>
												<th>Amonth of hours </th>
												<th>Type of record</th>
												<th>Buttons</th>
											</tr>
										</thead>
										<tbody>
											<tr class="odd gradeX">
												<td>Trident</td>
												<td>Internet
													 Explorer 4.0</td>
												<td>Win 95+</td>
												<td class="center"> 4</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="even gradeC">
												<td>Trident</td>
												<td>Internet
													 Explorer 5.0</td>
												<td>Win 95+</td>
												<td class="center">5</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="odd gradeA">
												<td>Trident</td>
												<td>Internet
													 Explorer 5.5</td>
												<td>Win 95+</td>
												<td class="center">5.5</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="even gradeA">
												<td>Trident</td>
												<td>Internet
													 Explorer 6</td>
												<td>Win 98+</td>
												<td class="center">6</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="odd gradeA">
												<td>Trident</td>
												<td>Internet Explorer 7</td>
												<td>Win XP SP2+</td>
												<td class="center">7</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="even gradeA">
												<td>Trident</td>
												<td>AOL browser (AOL desktop)</td>
												<td>Win XP</td>
												<td class="center">6</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Firefox 1.0</td>
												<td>Win 98+ / OSX.2+</td>
												<td class="center">1.7</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Firefox 1.5</td>
												<td>Win 98+ / OSX.2+</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Firefox 2.0</td>
												<td>Win 98+ / OSX.2+</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Firefox 3.0</td>
												<td>Win 2k+ / OSX.3+</td>
												<td class="center">1.9</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Camino 1.0</td>
												<td>OSX.2+</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Camino 1.5</td>
												<td>OSX.3+</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Netscape 7.2</td>
												<td>Win 95+ / Mac OS 8.6-9.2</td>
												<td class="center">1.7</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Netscape Browser 8</td>
												<td>Win 98SE+</td>
												<td class="center">1.7</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Netscape Navigator 9</td>
												<td>Win 98+ / OSX.2+</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>20:20</td>
												<td>21:00</td>
												<td>05.02 20:20</td>
												<td class="center">hand</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.1</td>
												<td>Win 95+ / OSX.1+</td>
												<td class="center">1.1</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.2</td>
												<td>Win 95+ / OSX.1+</td>
												<td class="center">1.2</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.3</td>
												<td>Win 95+ / OSX.1+</td>
												<td class="center">1.3</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.4</td>
												<td>Win 95+ / OSX.1+</td>
												<td class="center">1.4</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.5</td>
												<td>Win 95+ / OSX.1+</td>
												<td class="center">1.5</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.6</td>
												<td>Win 95+ / OSX.1+</td>
												<td class="center">1.6</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.7</td>
												<td>Win 98+ / OSX.1+</td>
												<td class="center">1.7</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Mozilla 1.8</td>
												<td>Win 98+ / OSX.1+</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Seamonkey 1.1</td>
												<td>Win 98+ / OSX.2+</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Gecko</td>
												<td>Epiphany 2.20</td>
												<td>Gnome</td>
												<td class="center">1.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Webkit</td>
												<td>Safari 1.2</td>
												<td>OSX.3</td>
												<td class="center">125.5</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Webkit</td>
												<td>Safari 1.3</td>
												<td>OSX.3</td>
												<td class="center">312.8</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Webkit</td>
												<td>Safari 2.0</td>
												<td>OSX.4+</td>
												<td class="center">419.3</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Webkit</td>
												<td>Safari 3.0</td>
												<td>OSX.4+</td>
												<td class="center">522.1</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Webkit</td>
												<td>OmniWeb 5.5</td>
												<td>OSX.4+</td>
												<td class="center">420</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Webkit</td>
												<td>iPod Touch / iPhone</td>
												<td>iPod</td>
												<td class="center">420.1</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Webkit</td>
												<td>S60</td>
												<td>S60</td>
												<td class="center">413</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera 7.0</td>
												<td>Win 95+ / OSX.1+</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera 7.5</td>
												<td>Win 95+ / OSX.2+</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera 8.0</td>
												<td>Win 95+ / OSX.2+</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera 8.5</td>
												<td>Win 95+ / OSX.2+</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera 9.0</td>
												<td>Win 95+ / OSX.3+</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera 9.2</td>
												<td>Win 88+ / OSX.3+</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera 9.5</td>
												<td>Win 88+ / OSX.3+</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Opera for Wii</td>
												<td>Wii</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Nokia N800</td>
												<td>N800</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Presto</td>
												<td>Nintendo DS browser</td>
												<td>Nintendo DS</td>
												<td class="center">8.5</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeC">
												<td>KHTML</td>
												<td>Konqureror 3.1</td>
												<td>KDE 3.1</td>
												<td class="center">3.1</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>KHTML</td>
												<td>Konqureror 3.3</td>
												<td>KDE 3.3</td>
												<td class="center">3.3</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>KHTML</td>
												<td>Konqureror 3.5</td>
												<td>KDE 3.5</td>
												<td class="center">3.5</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeX">
												<td>Tasman</td>
												<td>Internet Explorer 4.5</td>
												<td>Mac OS 8-9</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeC">
												<td>Tasman</td>
												<td>Internet Explorer 5.1</td>
												<td>Mac OS 7.6-9</td>
												<td class="center">1</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeC">
												<td>Tasman</td>
												<td>Internet Explorer 5.2</td>
												<td>Mac OS 8-X</td>
												<td class="center">1</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeA">
												<td>Misc</td>
												<td>NetFront 3.4</td>
												<td>Embedded devices</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeX">
												<td>Misc</td>
												<td>Dillo 0.8</td>
												<td>Embedded devices</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeX">
												<td>Misc</td>
												<td>Links</td>
												<td>Text only</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeX">
												<td>Misc</td>
												<td>Lynx</td>
												<td>Text only</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeC">
												<td>Misc</td>
												<td>IE Mobile</td>
												<td>Windows Mobile 6</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeC">
												<td>Misc</td>
												<td>PSP browser</td>
												<td>PSP</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
											<tr class="gradeU">
												<td>Other browsers</td>
												<td>All others</td>
												<td>-</td>
												<td class="center">-</td>
												<td class="center"><input type="button" value="Edit" width="50"></td>
											</tr>
										</tbody>
									</table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <script src="vendors/jquery-1.9.1.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
        <script src="vendors/datatables/js/jquery.dataTables.min.js"></script>


        <script src="assets/scripts.js"></script>
        <script src="assets/DT_bootstrap.js"></script>
        <script>
            $(function () {

            });
        </script>
    </div>
    -->
    <script src="resources/js/vendor/bootstrap/bootstrap.js"></script>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager2" runat="server" EnablePageMethods="true"></asp:ScriptManager>
        </div>
    </form>
</body>
</html>
