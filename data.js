/* 
	All operations on the data are done here. 
*/

//Initialising Sequelize 
const Sequelize = require('sequelize');
const db = new Sequelize('ngrdb', 'nodecart', 'mypass', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    }
});

//defining the schema of the table/Model
const Cart = db.define('cart', {
    id: {
	   type: Sequelize.INTEGER,
 		 primaryKey: true,
     autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    quantity: Sequelize.BOOLEAN,
    price: Sequelize.INTEGER
});

//syncing to create the table if it doesn't exist earlier
db.sync({});

//get all the products 
function getProducts () {
    return Cart.findAll({})
}


/*
  findOrCreate to execute some logic if the entry exists earlier and executing some other logic 
  if it doesn't exist
*/
function addProduct (product) {
   
   return Cart
  .findOrCreate({where: {name: product.name}, defaults: {price: product.price, quantity: product.quantity}})
  .spread(function(productFound, created){
    //spread divides the array into its 2 parts and passes them as arguments to the callback function   
  	if(created){
  	   //when the entry is not found. It gets created.
    	console.log('Created :',created);
  	}else{
      //when the entry exists. the quantity value gets updated
  		console.log('Found :',productFound);
  		Cart.find({
        where: {
            name: product.name
        }
    }).then((model)=>{
    	console.log('Inside the model');
        //Incrementing the value of quantity column by product.quantity
        return model.increment({"quantity": product.quantity});
    });
  		
  	}
  })
    
  }

// UPDATE carts SET quantity = quantum (which is quantity-1) WHERE name EQUAL TO name;
function incrementQuantity(name, quantum){
	return Cart.update({
  		quantity: quantum,
	}, {
  	where: {
    	name: {
      	$eq: name
    }
  }
});
}

// UPDATE carts SET quantity = quantum (which is quantity-1) WHERE name EQUAL TO name;
function decrementQuantity(name, quantum){
	return Cart.update({
  		quantity: quantum,
	}, {
  	where: {
    	name: {
      	$eq: name
    }
  }
});	


}

// DELETE FROM carts WHERE name = 'name';
function deleteProduct(name){
	return Cart.destroy({
  	where: {
    name: name
  	}
});

}


module.exports = {
    getProducts,
    addProduct,
    incrementQuantity,
    decrementQuantity,
    deleteProduct

}
