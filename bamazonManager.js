var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",

    database: "bamazon"
});
  

connection.connect(function(err) {
    if (err) throw err;
    manageBamazon();
});

//prompt manager with options
function manageBamazon(){
    inquirer.prompt([
        {
            name:"managerOptions",
            type:"list",
            message:"Welcome manager, please choose which of the following you would like to do: ",
            choices:[
                "View products for sale","View low inventory","Add to inventory","Add new product","exit"
            ]
        }
    ]).then(function(answer){
        switch(answer.managerOptions){
            case "View products for sale":
            viewProducts();
            break;
            case "View low inventory":
            lowInventory();
            break;
            case "Add to inventory":
            addInventory();
            break;
            case "Add new product":
            newProducts();
            break;
            case "exit":
            connection.end();
            break;
        }
    })
}

//display all products for sale
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\n\nITEMS FOR SALE: \n" );
        for (var i = 0; i < res.length; i++) {
            console.log("\n");
            console.log("ID: " + res[i].id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("\n")
        manageBamazon();
    })
}

//display products that have an inventory less than five
function lowInventory(){
    connection.query("SELECT ",function(err, res){
        if (err) throw err;
        if(){

        }

    })
}