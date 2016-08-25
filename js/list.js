$(function(){
	for (key in places)
    {    	
    	$('#route-list').append('<div class="panel panel-default"><div class="panel-heading"><h2>' + places[key].title + '</h2></div>' 
			  +'<div class="panel-body">' + places[key].description + '</div></div>');
    }
});
	