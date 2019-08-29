//  Возвращает URL для метода market.getById  (см.: https://vk.com/dev/market.getById)
//  Получает id товара
function getTovarUrl(tovar_id){			
	var token = window.location.hash.match(/access_token=([^&]+)/)[1];  // Получаем access_token из URL	
	var new_url = "https://api.vk.com/method/market.getById?item_ids=" + tovar_id + "&access_token=" + token + "&v=5.101";			
	return new_url;
}

//  Возвращает URL для метода market.get  (см.: https://vk.com/dev/market.get)
//  Получает id сообщества, содержащего товары
function getGrouppaTovarovUrl(owner_id){
	var token = window.location.hash.match(/access_token=([^&]+)/)[1];  // Получаем access_token из URL	
	var new_url = "https://api.vk.com/method/market.get?owner_id=" + owner_id + "&access_token=" + token + "&v=5.101";			
	return new_url;
}


// ---------- Отрисовка товаров
function drawTovar(tovary){
	var html = '';
	
	for(var i=0; i<tovary.items.length; i++){
		var t = tovary.items[i];		
		owner = t.owner_id.toString().slice(1);			// убираем первый символ в owner_id ("-")
		html += '<a href="https://vk.com/club'+owner+'?w=product-'+owner+'_'+t.id+'" target="_blank">';
		html +=  '<div class="tovar" title="' + owner + '">';
		html +=   '<img src="' + t.thumb_photo + '" width=100 /><br>' + t.title + '<br>';		
		html +=  '</div>';
		html += '</a>';
	}
	$("#pravo").empty();		// очищаем прежний список товаров
	$("#pravo").append(html);	// выводим новый список товаров	
}

//  ---------- Для одиночного товара ----------
function sendRequest(tovar_id, func){
	$.ajax({
		url: getTovarUrl(tovar_id),
		method: 'GET',
		dataType: 'JSONP',
		success: func
	});
}

function loadTovar(tovar_id){
	sendRequest(tovar_id, function(data){
		console.log(data);
		drawTovar(data.response);
	});
}

//  ---------- Для группы товаров ----------
function sendGroupRequest(owner_id, func){
	$.ajax({
		url: getGrouppaTovarovUrl(owner_id),
		method: 'GET',
		dataType: 'JSONP',
		success: func
	});
}

function loadGruppaTovarov(owner_id){
	sendGroupRequest(owner_id, function(data){
		drawTovar(data.response);
	});
}