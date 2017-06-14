/* 
	All operations on data are done here. 
*/

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

const Cart = db.define('cart', {
    id: {
 		type: Sequelize.INTEGER,
 		 primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    quantity: Sequelize.BOOLEAN,
    price: Sequelize.INTEGER
});

db.sync({});

function getProducts () {
    return Cart.findAll({})
}

function addProduct (product) {
   
   return Cart
  .findOrCreate({where: {name: product.name}, defaults: {price: product.price, quantity: product.quantity}})
  .spread(function(productFound, created){
    
  	if(created){
  		console.log('created :',created);
  	}else{
  		console.log('found :',productFound);
  		Cart.find({
        where: {
            name: product.name
        }
    }).then((model)=>{
    	console.log('Inside the model');
        return model.increment({"quantity": product.quantity});
    });
  		
  	}
  })
    
  }


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


// UPDATE carts SET quantity = quantity - 1 WHERE product_id EQUAL TO id;
}


function deleteProduct(name){
	return Cart.destroy({
  	where: {
    name: name
  	}
});
// DELETE FROM post WHERE status = 'inactive';

}


module.exports = {
    getProducts,
    addProduct,
    incrementQuantity,
    decrementQuantity,
    deleteProduct

}
