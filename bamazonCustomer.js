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
    welcomeToBamazon();
});

function welcomeToBamazon(){
    inquirer.prompt([
        {
            name:"decide",
            type:"list",
            message:"Welcome to Bamazon, would you like to view our items for purchase?",
            choices:[
                "yes", "no, exit program"
            ]
        }
    ]).then(function(answer){
        if(answer.decide === "yes"){
            displayItems();
        }else{
            connection.end();
        }
    })
}

///display all items for sale
function displayItems(){
    connection.query("SELECT * FROM products", function(err, res) {
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
          inquirer.prompt([
            //prompt user and ask which item (by id) they would like to buy
            {
                name: "chooseID",
                type: "list",
                message: "Which ID would you like to purchase?",
                choices:[
                    "1","2","3","4","5","6","7","8","9","10"
            ]},
            //prompt user how much of the item they would like to buy
            {
                name:"amount",
                type:"input",
                message:"How many would you like to buy?",
                validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                } 

            }]).then(function(answer) {
            connection.query("SELECT product_name,department_name,price,stock_quantity FROM products WHERE ?",{id: answer.chooseID}, function(err, res){
                if(err) throw err;
                //check whether the users amount does not exceed the amount in inventory
                if(answer.amount > res[0].stock_quantity || res[0].stock_quantity < 0){
                    console.log("\nThere is not enough inventory, please buy a lower quantity\n");
                    return welcomeToBamazon();
                }
                var subtract = res[0].stock_quantity - answer.amount;
                //if inventory sufficent; update sql 
                updataDatabase(subtract, answer)
            })
        });
    })
}


function updataDatabase(subtract, answer){
    connection.query("UPDATE products SET stock_quantity=? WHERE id=?", [subtract, answer.chooseID], function(err, res){
        if(err) throw err;
    })

    connection.query("SELECT product_name,department_name,price,stock_quantity FROM products WHERE ?",{id: answer.chooseID}, function(err, res){
        if(err) throw err;
        var total = answer.amount * res[0].price;
        //display amount user was charged
        console.log("\n");
        console.log("--------------------You purchased-------------------------\n");
        console.log("Product Name: " + res[0].product_name);
        console.log("quantity: " + answer.amount);
        console.log("amount due: " + total);
        console.log("\n");
        welcomeToBamazon();
    })
}