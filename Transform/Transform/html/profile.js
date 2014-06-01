function popup() {
	alert("Hello World")
}

window.onload = function() {
  	var divs = document.getElementsByTagName("div");
	for(var i = 0; i < divs.length; i++){
	   	//do something to each div like
	   	if(divs[i].className == "circle-indicator prayer-circle"){
			divs[i].style.backgroundColor = "#DF0101";
	   	}
	   	if(divs[i].className == "circle-indicator praise-circle"){
			divs[i].style.backgroundColor = "#99FF66";
	   	}
	}
};

jQuery(function($) {
    var panelList = $('#draggablePanelList');

    panelList.sortable({
        // Only make the .panel-heading child elements support dragging.
        // Omit this to make then entire <li>...</li> draggable.
        handle: '.panel-heading', 
        update: function() {
            $('.panel', panelList).each(function(index, elem) {
                 var $listItem = $(elem),
                     newIndex = $listItem.index();

                 // Persist the new indices.
            });
        }
    });
});

function selectItem(number) {
	var currURL = window.location.toString();
	var newURL = currURL.replace("prayer.html","prayer_single_view.html");
	window.location = newURL;
	//window.location(currURL.replace('prayer.html','prayer_single_view.html');
}