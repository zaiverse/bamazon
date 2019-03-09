var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",

    database: "bamazon"
});
  

connection.connect(function(err) {
    if (err) throw err;
    checkDepartments();
});

function checkDepartments(){
    connection.query("", function(err, res){
        if (err) throw err;
        for(var i = 0; i < res.length; i++){
            var totalProfit = res[i].product_sales - res[i].overheadCosts;

        }

    })
}