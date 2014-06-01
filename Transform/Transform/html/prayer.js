function popup() {
	alert("Hello World")
}

window.onload = function() {
 //  	var divs = document.getElementsByTagName("div");
	// for(var i = 0; i < divs.length; i++){
	//    	//do something to each div like
	//    	if(divs[i].className == "circle-indicator prayer-circle"){
	// 		divs[i].style.backgroundColor = "#F5DA81";
	//    	}
	//    	if(divs[i].className == "circle-indicator praise-circle"){
	// 		divs[i].style.backgroundColor = "#99FF66";
	//    	}
	// }
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

function addPrayer() {
    loadPreviousPrayers();
    var form = document.forms["new-prayer"];
    var user_id = "Ddw8VGKsZ1";
    var title = form["title"].value;
    var prayer_text = form["description"].value;
    var type = form["prayer"].checked ? "prayer_request" : "praise_report";
    var prayer = new Prayer();
    prayer.initialize(user_id, title, prayer_text, type);
    prayer.save(null, {
                success: function(prayer) {
                console.log('saved prayer ' + prayer.title);
                },
                error: function(prayer, error) {
                console.log(error);
                }
                });
    
    // Now update the individual member's prayer list.
    var query = new Parse.Query(Member);
    query.get(user_id, {
              success: function(member) {
              console.log('retrieved ' + member.get("name"));
              member.addUnique("prayers", prayer_text);
              member.save();
              }
              });
}

function injectPrayerHTML(prayer_obj) {
    var html = '<div class="content-container"><div class="pic-container"><img class="pic" src="__USER_PIC_URL__" style="width:75px; height:75px;"/></div><div class="info-container"><li class="panel panel-info"><div class="panel-heading">PRAYER REQUEST</div><div class="circle-indicator prayer-circle"><div class="poop">5</div></div><a href="prayer_single_view.html/__USER_ID__"><div class="panel-body">My mom is in the hospital</div></a></li></div></div>';
    
    html = html.replace("__USER_PIC_URL__", "https://scontent-a-iad.xx.fbcdn.net/hphotos-xfa1/t31.0-8/892676_10154055747430648_6477469356863126644_o.jpg");
    html = html.replace("__USER_ID__", prayer_obj.get("user"));
    return html;
}

function loadPreviousPrayers() {
    var query = new Parse.Query(Prayer);
    query.find({
               success: function(results) {
               var list = "";
               for (var i = 0; i < results.length; i++) {
               var html = injectPrayerHTML(results[i]);
               if (html) {
                    list += html;
               }
               }
               $("#draggablePanelList").append(list)
               },
               error: function(results) {
               alert("got an error");
               }
               });
}

window.onload = function() {
    parseInit();
    loadPreviousPrayers();
};