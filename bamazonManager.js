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
    connection.query("SELECT id,product_name,department_name,price,stock_quantity FROM products WHERE stock_quantity BETWEEN 1 AND 5",function(err, res){
        console.log("\nIF NOTHING SHOWS THEN THERE ARE NO ITEMS THAT HAVE STOCK UNDER 5");
        for (var i = 0; i < res.length; i++) {
            console.log("\n");
            console.log("ID: " + res[i].id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("\n");
        manageBamazon();
    })
}

//add inventory
function addInventory(){
    inquirer.prompt([
        {
            name: "addInventory",
            type:"list",
            message:"Which of the following would you like to add inventory to?",
            choices:[
                "1","2","3","4","5","6","7","8","9","10"
            ]
        },
        {
            name:"amount",
            type:"input",
            message:"Amount you would like to add to inventory?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                } 
        }
    ]).then(function(answer){
        connection.query("SELECT product_name,department_name,price,stock_quantity FROM products WHERE ?",{id: answer.addInventory},function(err, res){
            if(err) throw err;
            var adding = res[0].stock_quantity + parseInt(answer.amount);
            continuedAdd(adding, answer);
        })

    })
}

function continuedAdd(adding, answer){
    connection.query("UPDATE products SET stock_quantity=? WHERE id=?", [adding, answer.addInventory], function(err, res){
        if(err) throw err;
    })

    connection.query("SELECT product_name,department_name,price,stock_quantity FROM products WHERE ?",{id: answer.addInventory},function(err, res){
        if(err) throw err;
        console.log("\n");
        console.log("Product Name: " + res[0].product_name);
        console.log("Department: " + res[0].department_name);
        console.log("Price: " + res[0].price);
        console.log("Stock Quantity: " + res[0].stock_quantity);
        console.log("\n\n");

    manageBamazon();
    })
}

//add a new product
function newProducts(){
    inquirer.prompt([
        {
            name:"",
            type:"",
            message:""
        }
    ]).then(function(answer){

    })
}