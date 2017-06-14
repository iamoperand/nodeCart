$(function(){



	$('[data-id]').click(function(){
		console.log($(this).attr('data-id'));
			var siblings = $(this).siblings();
            var name, price, quantity;
            
            price = siblings[0].innerText;
            //size = siblings[2].innerText;
            quantity = siblings[2].value;
            //Condition-check for QUANTITY input
            if(!quantity){
                alert('This is a required field');
                return false;
            }
            if (isNaN(quantity)) 
            {
                alert("Quantity must be a number!");
                return false;
            }

            if(quantity <= 0){
                alert("Quantity must be a positive number!");
                return false;   
            }

            if(quantity%1){
                alert("Quantity can't be a float!");
                return false;
            }
			var parent = siblings.parent();
            //console.log('Parent: ' ,  parent);
            

            name = parent.siblings()[0].innerText;
            var product = {
            	name: name,
            	price: price,
            	quantity: quantity
            };

            console.log("products: ", product);
		
		$.post('/new', {
			newproduct: product
		}, function(data){
				console.log("Added");
                window.alert('Product ' + product.name + " added " + product.quantity + " times successfully!");
		})
		 

	});
});