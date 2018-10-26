var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//establish connection
var connection = mysql.createConnection({
    host:       'localHost',
    user:       'root',
    port:       '3306',
    database:   'bamazon',
    password:   'Faster45'
});
//check to see if connection is successful
connection.connect(function(err){
    if(err) throw err;
    //console.log("connection id is", connection.threadId);
    console.log("\n" + "Welcome to our Electronics Store!");
    ourProducts();
});

function ourProducts(){
// instantiate
connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    var table = new Table({
        head: ['Id:', 'Product:', 'Price:', 'Quantity:']
      , colWidths: [5, 20, 20, 20,]
    });
     
    for(let i = 0; i < res.length; i++){
        table.push(
            [res[i].item_id,
            res[i].product_name,
            res[i].price,
            res[i].stock_quantity]
        );
    }//completes for loop
     
    console.log(table.toString() + '\n');
    orderingPrompt();
}) //ends connection.query();
} //closes ourProducts();

function orderingPrompt(){
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What item ID would you like to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\n" + " Please enter Item Id #:" + "\n");
                return false;
            }
        }
    },
    {  
        name: "amount",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
        }
    }]).then(function(userSelection){
        //connects to db, updates table
        var id = userSelection.item;
        var quantity = userSelection.amount;
    connection.query("SELECT * FROM products WHERE ?", {item_id: id}, function(err, res){
        console.log('user Selection', userSelection);
        console.log('Poruduct id', id);
        console.log('quantity', quantity);
        console.log('res', res.length);
        //console.log('err', err);
        
    })
    }); //ends .then function

    connection.end();
} //closes orderingPrompt();