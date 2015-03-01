var TABLE = {};

TABLE.formwork = function(table) {
  var $tables = $(table);
	
  $tables.each(function () {
    var _table = $(this);
    _table.find('tbody tr').append($('<td class="edit"><input type="button" value="EDIT"/></td>'));
	
  });
  $tables.find('.edit :button').on('click', function(e) {
    TABLE.editable(this);
  e.preventDefault();
  });
}

var iEdit=0;
var day,month,year,hour,min;
var day1,month1,year1,hour1,min1;

var day3,month3,year3,hour3,min3;
var day4,month4,year4,hour4,min4;
var str1,str2,str3,st4;
var j = 0;

TABLE.editable = function(button) {
  
  var $button = $(button);
  var $row = $button.parents('tbody tr');
  var $cells = $row.children('td.el');
  var $finde = $row.children('td.el');
  var $regcell = $row.children('td.reg');
  if ($row.data('flag')) {
	  save($button,$row,$cells,$finde,$regcell);
  } 
  else {
		edit($button,$row,$cells);
  }
}
function disableEditButton()
{ 
	var arr= document.getElementsByClassName("edit");
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].firstChild.value=="EDIT") arr[i].firstChild.disabled="disabled";	
	}
}
function enableEditButtons()
{
var arr = document.getElementsByClassName("edit");
for (var i = 0; i < arr.length; i++) {
arr[i].firstChild.disabled = "";
}
}
function parseDate(date)
{
	var regexp = /\d{1,4}/g;
	var matches = date.match(regexp);
	var arr=new Array(5);
	arr[0]=parseInt(matches[2]);
	arr[1]=parseInt(matches[1]);
	arr[2]=parseInt(matches[0]);
	arr[3]=parseInt(matches[3]);
	arr[4]=parseInt(matches[4]);
	return arr;
}
function editF(str1, str2, str3, str4) {

    FB.getLoginStatus(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    debugger;
                    PageMethods.changeEditStatus(response.id, str1, str2, str3, str4, onSucess, onError);
                    function onSucess(result) { }
                    function onError(result) { }
                });
            };
        });
}

function isTrueDate(arr)
{
	var year=parseInt(arr[3]);
	var month=parseInt(arr[2])-1;
	var day = parseInt(arr[1]);
	var hour = parseInt(arr[4]);
	var minute=parseInt(arr[5]);

	var testDate = new Date(year,month,day,hour,minute);
	if(testDate.getMinutes()==minute && testDate.getHours()==hour && testDate.getDate()==day && testDate.getMonth()==month && testDate.getFullYear()==year)return true;
	else return false;
}
function validNewDates(dateStart,dateStop)
{
var regexp=/^(\d{1,2})\.(\d{1,2})\.(\d{4}) (\d{1,2})\:(\d{1,2})$/;
if(!regexp.test(dateStart))return false;
if(!regexp.test(dateStop)) return false;
if(!isTrueDate(regexp.exec(dateStart)))return false;
if(!isTrueDate(regexp.exec(dateStop)))return false;
return true;
}
function edit($button,$row,$cells){
	$cells.each(function() {
      var _cell = $(this);
	  var date,date1,day,month,year,hour,min;
      _cell.data('text', _cell.html()).html('');
	  
	  date = _cell.data('text').substr(0,10);
	  date1 = _cell.data('text').substr(11,16);
	 
	if(iEdit==0){
		str1= _cell.data('text');
		iEdit++;
		}
	else
	{
		str2 = _cell.data('text');
		iEdit--;
	}
	
      var $input = $('<input type="text" class="q1"/>')
	  .val(date)
		.width("90");
	  var $input2 = $('<input type="text" class="q2"/>')	
		.val(date1)
		.width("90");
      _cell.append($input);
	  _cell.append($input2);
    });	
    $row.data('flag', true);
    $button.val('SAVE');
	disableEditButton();
}
function save($button,$row,$cells,$finde,$regcell){
		
	$finde.each(function() {
	var _cell1 = $(this);	
		if(j==0) {
			str3 = _cell1.find('input.q1').val()+ " " +_cell1.find('input.q2').val();
			j++;
		}
		else {
			str4 = _cell1.find('input.q1').val()+ " " +_cell1.find('input.q2').val();
			j--;
		}
	});
	var a = parseDate(str3);
	var b = parseDate(str4);
	var c = parseDate(str1);
	var d = parseDate(str2);
		if(validNewDates(str3,str4)){
				if (str3!=str1 || str4!=str2){
					$regcell.each(function() {
						var _cell = $(this);
						_cell.html("Edit");
					});
					editF(a,b,c,d);
				}
				$cells.each(function () {
				  var _cell = $(this);
				  _cell.html(_cell.find('input.q1').val()+ " " +_cell.find('input.q2').val());
			});
			$row.data('flag',false);
			$button.val('EDIT');
			enableEditButtons();
		}
	  else alert("Введите валидные данние");
		  //edit($button,$row,$cells);	  
}
function validDate(dateStart,dateStop)
{
	var i;
	var table=document.getElementById("example");
	dateStart=makeDate(dateStart);
	dateStop=makeDate(dateStop);

	if(dateStop<=dateStart)return false;
	var now = new Date();
	if(dateStop>now)return false;//дата стоп більше поточної
	if(dateStart>=makeDate(table.rows[1].cells[0].innerHTML) && (table.rows[1].cells[1].innerHTML=="0.0.0 0:00" || table.rows[1].cells[1].innerHTML==""))return false;
	if(dateStart>makeDate(table.rows[1].cells[1].innerHTML) && dateStop<now)return true;
	var flag=1;//при додаванні нового запису, а не редагуванні існуючого, потрібно щоб flag=0
	for(i =1;i<table.rows.length-1;i++)
	{
	if(flag==1) {
	if (table.rows[i + 1].cells[1].innerHTML == str2) {
	if (dateStop <= makeDate(table.rows[i].cells[0].innerHTML) && dateStart >= makeDate(table.rows[i + 2].cells[1].innerHTML))return true;
	i+=2;
	flag = 0;
	if(i<table.rows.length-1)break;
	}
	}
	if(dateStop<=makeDate(table.rows[i].cells[0].innerHTML)&& dateStart>=makeDate(table.rows[i+1].cells[1].innerHTML))return true;
	}
	if(dateStop<=makeDate(table.rows[table.rows.length-1].cells[0].innerHTML))return true;
	return false;
}