var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//establish connection
var connection = mysql.createConnection({
    host:       'localHost',
    user:       'root',
    port:       '3306',
    database:   'bamazon',
    password:   'roooooots'
});
//check to see if connection is successful
connection.connect(function(err){
    if(err) throw err;
    //console.log("connection id is", connection.threadId);
    console.log("\n" + "Welcome to (.this) Electronics Store!");
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
    }
     
    console.log(table.toString());
})
connection.end();
}
