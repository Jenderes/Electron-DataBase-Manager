///////////////////////////////////////////////
//CreateTable
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const { remote } = require('electron')
const { Menu, MenuItem } = remote
const menu = new Menu()
// delete start text 
function DeleteStartText (){
    if($('.lab').attr('id') === 'lab'){
        $( ".lab" ).remove();
        }
}
// get rows on first table
function getFirstTenRows(callback){
    var mysql = require("mysql");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 'rosq1921',
        database: "Company"
    });

    connection.connect((err) => {
        if(err){
            return console.log(err.stack);
    
        }
        console.log("Connection sucsefully enstabled");
    });

    var sql = 'Select `DokID`, `DokN`, `DokDat` From `dokum`';
    connection.query(sql, (err,rows, fields) => {
        
        if (err) {
            console.log("An error ocurred perfoming the query.");
            console.log(err);
            return;
        }
        callback(rows);

        console.log("Query succesfully executed");
    });
    connection.end(() => {
    console.log("Connection succesfully closed");
    });}
$("#First_ms").on("click", () => {
    FirstCreateTable();
    DeleteStartText();
});
// get rows on Second table 
function getSecondTenRows(callback){
    var mysql = require("mysql");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 'rosq1921',
        database: "Company"
    });

    connection.connect((err) => {
        if(err){
            return console.log(err.stack);
    
        }
        console.log("Connection sucsefully enstabled");
    });

    var sql = 'Select `N_tov`, `Tovar`, `El`, `Cena` From `tovary`';
    connection.query(sql, (err,rows, fields) => {
        
        if (err) {
            console.log("An error ocurred perfoming the query.");
            console.log(err);
            return;
        }
        callback(rows);

        console.log("Query succesfully executed");
    });
    connection.end(() => {
    console.log("Connection succesfully closed");
    });
}   
$("#Second_ms").on("click",() => {
    SecondCreateTable();
    DeleteStartText();
});
///////////////////////////////////////////////
//GetNumberRow
$(document).on('click', 'table tbody tr', function(e) {
    console.log('You clicked row '+ ($(this).index()+1) );
    var strk = $(this).index()+1;
    $('tr').css('background-color','#fff');
    $('tr').css('color','#000');
    $(this).css('background-color','#333335');
    $(this).css('color','#fff');
    localStorage.setItem('key',strk);
    console.log($('table').attr('id'));
    if ($('table').attr('id') === 'First_table') {
        localStorage.removeItem('NameTov');
        localStorage.removeItem('elem');
        localStorage.removeItem('Cen');
        var oTable = document.getElementById('First_table');
        var Nd= oTable.rows.item(strk).cells[1].innerHTML;
        var Dd = oTable.rows.item(strk).cells[2].innerHTML;
        localStorage.setItem('Numberdokc',Nd);
        localStorage.setItem('Datadock',Dd);
    }
    if ($('table').attr('id') === 'Second_table') {
        localStorage.removeItem('Numberdokc');
        localStorage.removeItem('Datadock');
        var oTable = document.getElementById('Second_table');
        var Nametov = oTable.rows.item(strk).cells[1].innerHTML;
        var element = oTable.rows.item(strk).cells[2].innerHTML;
        var Cena = oTable.rows.item(strk).cells[3].innerHTML;
        localStorage.setItem('NameTov',Nametov);
        localStorage.setItem('elem',element);
        localStorage.setItem('Cen',Cena);
    }
    
});
///////////////////////////////////////////////
//ContextMenu
menu.append(new MenuItem({ label: 'Add', click() {   
    var mainWindowtwo = new BrowserWindow({
      width: 350,
      height: 150
    });
    mainWindowtwo.loadURL(url.format({
      pathname: path.join(__dirname,'adding.html'),
      protocol:'file',
      slashes: true
    }));
    } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Edit', click() {   
        var mainWindowThird = new BrowserWindow({
          width: 350,
          height: 150
        });
        mainWindowThird.loadURL(url.format({
          pathname: path.join(__dirname,'edditing.html'),
          protocol:'file',
          slashes: true
        }));
    } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Delete', click() {  
    DeleteRow(); 
    } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Refresh', click() {   
     RefreshTable();
    } }))
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      menu.popup({ window: remote.getCurrentWindow() })
    }, false)
    function DeleteRow() {
        var mysql = require("mysql");
        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: 'rosq1921',
            database: "Company"
        });
        connection.connect((err) => {
            if(err){
                return console.log(err.stack);
        
            }
            console.log("Connection sucsefully enstabled");
        });
        if (localStorage.getItem('table') === 'tovary') {
            var sql = "DELETE FROM `company`.`tovary` WHERE (`N_tov` = '"+localStorage.getItem('key')+"')";
            connection.query(sql, (err,rows, fields) => { 
                if (err) throw err;
                console.log("1 record inserted");
            });  
            console.log(sql);
        }
        if (localStorage.getItem('table') === 'dokum') {
            var sql = "DELETE FROM `company`.`dokum` WHERE (`DokID` = '"+localStorage.getItem('key')+"')";
            connection.query(sql, (err,rows, fields) => { 
                if (err) throw err;
                console.log("1 record inserted");
            });  
            console.log(sql);
        }
    connection.end(() => {
    console.log("Connection succesfully closed");
    });
    };
    function FirstCreateTable() {
        localStorage.setItem('key',1);
        localStorage.setItem('table','dokum');
        getFirstTenRows(function(rows){
            var tbods = '';
            var theads = '';
            var theads = '<tr><th>Dokument ID</th><th>Number Dokument</th><th>Data Dokument</th></tr>';
            $("table thead").html(theads);
            rows.forEach(function(row){
                tbods += '<tr>';
                tbods += '<td>';
                tbods += row.DokID;
                tbods += '</td>';
                tbods += '<td>';
                tbods += row.DokN;
                tbods += '</td>';
                tbods += '<td>';
                tbods += row.DokDat;
                tbods += '</td>';
                tbods += '</tr>';
            });
            $("table tbody").html(tbods);
            $('table').attr('id', 'First_table');
            var rowCount = MaxRowId();
            localStorage.setItem('rowcount',rowCount);
        });
    };
    function SecondCreateTable(){
        localStorage.setItem('key',1);
        localStorage.setItem('table','tovary');
        getSecondTenRows(function(rows){
                var tbods = '';
                var theads = '';
                var theads = '<tr><th>Number Tovar</th><th>Name Tovar</th><th>element</th><th>Cenа</th></tr>';
                $("table thead").html(theads);
                rows.forEach(function(row){
                    tbods += '<tr>';
                    tbods += '<td>';
                    tbods += row.N_tov;
                    tbods += '</td>';
                    tbods += '<td>';
                    tbods += row.Tovar;
                    tbods += '</td>';
                    tbods += '<td>';
                    tbods += row.El;
                    tbods += '</td>';
                    tbods += '<td>';
                    tbods += row.Cena;
                    tbods += '</td>';
                    tbods += '</tr>';
                });
                $("table tbody").html(tbods);
                $('table').attr('id', 'Second_table');
                var rowCount = MaxRowId();
                localStorage.setItem('rowcount',rowCount);
            });
    };
    function RefreshTable() {
        if (localStorage.getItem('table') === 'tovary') {
            SecondCreateTable();
        }
        if (localStorage.getItem('table') === 'dokum') {
            FirstCreateTable();
        }
    };
    function MaxRowId () {
        var max = 0;
        $('tr td:first-child').each(function () {
            thisis = parseInt($(this).text());
            if (thisis > max) {
                max = thisis;
            }
        });
        return max;
    };
    