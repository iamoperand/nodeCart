/*
    JS File for cart.html
*/

$(function(){
	
	//load the new values from the database to refresh the view
	function refreshView(products){
		console.log(products);
		
		
		if(!products.length){
			//if there are no products in the cart then set the html to a custom data
			$('.container').html('<div class="text-center" style="font-size:4rem;font-weight: 700">'+
			'<div>Your shopping cart is empty!</div><a href="./index.html" style="text-decoration: none;font-size: 3rem;">Shop Now</a></div> ');
		}else{
			var cartlist = "";
			var totalAmount = 0;
			var i = 1;
	        //looping the array to fill in the values into the cartlist string
	        for (var product of products) {
	            
	            cartlist += '<tr data-row='+i+'><td>' + i + '</td><td> ' +
					 product.name + '</td><td data-price='+i+'>&#8377; ' + (+product.price).toLocaleString() + 
					'</td><td data-quantity='+ i +'>'+ (+product.quantity)+'</td><td>&#8377; ' +
					 (product.quantity * (product.price)).toLocaleString() + 
					'</td><td class="text-center"><img src="./images/plus.png" width="32" data-id='+
					i+' class="button-add"/></td><td class="text-center"><img src="./images/negative.png" width="32" data-id='+i+
					' class="button-sub" /></td>'+
					'<td class="text-center"><img src="./images/delete.png" width="32" data-id='+i+' class="button-del" /></td></tr>'
				totalAmount += (product.quantity * (product.price));
	        	 i++;   
        	}	
		}
		
	$('#cartlist').html(cartlist);

	
	$('#totalAmount').html(totalAmount.toLocaleString());
		
	//Click handler for Add-Button (Incremental)	
	$('.button-add').click(function(){
		var parent = $(this)[0].parentElement;
		var ancestor = parent.parentNode;
		var nameElement = ancestor.children[1];
		console.log("nameElement incremented is: ", nameElement.innerText);
		
		/*
			get the product_name of the row. This will act as the key for idnetifying products, as 
			it is unique 
		*/
		
		var product_name = nameElement.innerText;
		var quantity = +(ancestor.children[3].innerText) + 1;
		$.post('/product/increment', {name: product_name, quantum: quantity}, function(data){
			//refresh the view with the data that is fetched from /cart/getcart
			refreshView(data);
		})

	});
	
	$('.button-sub').click(function(){
		var parent = $(this)[0].parentElement;
		var ancestor = parent.parentNode;
		var nameElement = ancestor.children[1];
		console.log("nameElement decremented is: ",  nameElement.innerText);
		/*
			get the product_name of the row. This will act as the key for idnetifying products, as 
			it is unique 
		*/
		var product_name = nameElement.innerText;
		console.log('Quantity is: ', +(ancestor.children[3].innerText)-1);
		if(+(ancestor.children[3].innerText) == 1){
			//delete the entry if the current value of quantity is 1
			$.post('/product/delete', {name: product_name}, function(data){
				//refresh the view with the data that is fetched from /cart/getcart
				refreshView(data);
			})	
		}else{
			//if current quantity is greater than 1, then execute this
			var quantity = +(ancestor.children[3].innerText) - 1;
		$.post('/product/decrement', {name: product_name, quantum: quantity}, function(data){
			refreshView(data);
		});
		
	}
	});

	$('.button-del').click(function(){
		
		
		var parent = $(this)[0].parentElement;
		var ancestor = parent.parentNode;
		var nameElement = ancestor.children[1];
		console.log("nameElement deleted is: ",  nameElement.innerText);
		/*
			get the product_name of the row. This will act as the key for idnetifying products, as 
			it is unique 
		*/
		var product_name = nameElement.innerText;
		$.post('/product/delete', {name: product_name}, function(data){
			//refresh the view with the data that is fetched from /cart/getcart
			refreshView(data);
		})	
		
	});



	}

	$.get('/cart/getcart', function(data){
		refreshView(data);
	})

	
	
});