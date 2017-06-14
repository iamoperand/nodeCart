$(function(){
//var cartArray = [];	
	function refreshView(products){
		console.log(products);
		//cartArray = products;
		
		if(!products.length){
			$('.container').html('<div class="text-center" style="font-size:4rem;font-weight: 700">'+
			'<div>Your shopping cart is empty!</div><a href="./index.html" style="text-decoration: none;font-size: 3rem;">Shop Now</a></div> ');
		}else{
			var cartlist = "";
		var i = 1;
        for (var product of products) {
            cartlist += '<tr data-row='+i+'><td>' + i + '</td><td> ' +
				 product.name +    
				 '</td><td data-price='+i+'>&#8377; ' + (+product.price).toLocaleString() + 
				'</td><td data-quantity='+ i +'>'+ (+product.quantity)+'</td><td>&#8377; ' +
				 (product.quantity * (product.price)).toLocaleString() + 
				'</td><td class="text-center"><img src="./images/plus.png" width="32" data-id='+
				i+' class="button-add"/></td><td class="text-center"><img src="./images/negative.png" width="32" data-id='+i+
				' class="button-sub" /></td>'+
				'<td class="text-center"><img src="./images/delete.png" width="32" data-id='+i+' class="button-del" /></td></tr>'

        	 i++;   
        	}	
		}
		
	$('#cartlist').html(cartlist);
		//define the body here
	$('.button-add').click(function(){
		var parent = $(this)[0].parentElement;
		var ancestor = parent.parentNode;
		var nameElement = ancestor.children[1];
		console.log("nameElement ", nameElement.innerText);
		//get the product id / S.No. of the row
		var product_name = nameElement.innerText;
		var quantity = +(ancestor.children[3].innerText) + 1;
		$.post('/cart/increment', {name: product_name, quantum: quantity}, function(data){

				refreshView(data);
		})

	});
	
	$('.button-sub').click(function(){
		var parent = $(this)[0].parentElement;
		var ancestor = parent.parentNode;
		var nameElement = ancestor.children[1];
		console.log("nameElement ",  nameElement.innerText);
		//get the product id
		var product_name = nameElement.innerText;
		console.log('Quantity is: ', +(ancestor.children[3].innerText)-1);
		if(+(ancestor.children[3].innerText) <= 1){
			$.post('/cart/delete', {name: product_name}, function(data){
				refreshView(data);
			})	
		}else{
			var quantity = +(ancestor.children[3].innerText) - 1;
		$.post('/cart/decrement', {name: product_name, quantum: quantity}, function(data){
			refreshView(data);
		});
		
	}
	});

	$('.button-del').click(function(){
		//console.log("this object (Array element)", $(this)[0]);
		//console.log("this object (Array)", $(this));

		//assign 0 to the quantity property of cartList[i]
		//cartList[parseInt($(this).attr('data-id'))].quantity = 0;
		
		var parent = $(this)[0].parentElement;
		var ancestor = parent.parentNode;
		var nameElement = ancestor.children[1];
		console.log("nameElement ",  nameElement.innerText);
		//get the product id
		var product_name = nameElement.innerText;
		$.post('/cart/delete', {name: product_name}, function(data){
			refreshView(data);
		})	
		//ancestor.remove();
		//console.log('Inside delete: ', parseInt($(this).attr('data-id'))+1);
		/*cartList.splice(parseInt($(this).attr('data-id')), 1);
		
		if(!cartList.length){

			//Re-draw the content inside the container (when cartList.length = 0) which currently contains the table element
			$('.container').html('<div class="text-center" style="font-size:4rem;font-weight: 700">'+
			'<div>Your shopping cart is empty!</div><a href="./index.html" style="text-decoration: none;font-size: 3rem;">Shop Now</a></div> ');
		}
		saveProducts();
		refreshProducts();*/	
	});



	}

	$.get('/cart/getcart', function(data){
		refreshView(data);
	})

	
	
});