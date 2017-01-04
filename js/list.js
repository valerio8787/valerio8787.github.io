$(function(){
	for (var i in routes){
		$('#route-list').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="headingOne"><h4 class="panel-title">'
        + '<a data-toggle="collapse" data-parent="#accordion" href="#route' + routes[i].routeID + '" aria-expanded="true" aria-controls="route' + routes[i].routeID + '">'
        + routes[i].title
        + '</a></h4> </div><div id="route' + routes[i].routeID + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">'
		+ '</div></div>');
		for (key in routes[i].places)
    	{
    		var text = "";
				var id = routes[i].places[key].id;
    		if (descriptions[id] != undefined)
    		{
    			text = descriptions[id].text;
    		}
    		$("#route" + routes[i].routeID).append('<div class="panel panel-default"><div class="panel-heading"><h2>' + routes[i].places[key].title + '</h2></div>'
				  +'<div class="panel-body">' + text + '</div></div>');
    	}
	}
});
