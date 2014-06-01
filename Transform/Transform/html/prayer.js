var user_id = "Ddw8VGKsZ1";
var user_name;
var user_profile;

window.onload = function() {
    parseInit();
    loadPreviousPrayers();
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
	if (form["title"] == "") {
		alert("Please enter a title");
		return;
	}
	if (form["description"] == "") {
		alert("Please enter the prayer content");
		return;
	}
	var form = document.forms["new-prayer"];
	var title = form["title"].value;
	var prayer_text = form["description"].value;
	var type = form["prayer"].checked ? "Prayer Request" : "Praise Report";
	var prayer = new Prayer();
	prayer.initialize(user_id, user_name, user_profile, title, prayer_text, type);
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
			member.addUnique("prayers", prayer);
			member.save();
		}
	});
}

function injectPrayerHTML(prayer_obj) {
    var html = '<div class="content-container"><div class="pic-container"><img class="pic" src="__USER_PIC_URL__" style="width:75px; height:75px;"/></div><div class="info-container"><li class="panel panel-info"><div class="panel-heading">PRAYER REQUEST</div><div class="circle-indicator prayer-circle"><div class="new">NEW</div></div><a href="prayer_single_view.html/__USER_ID__"><div class="panel-body">My mom is in the hospital</div></a></li></div></div>';
    
    var pic_url = prayer_obj.get("user_profile");
    if (pic_url) {
        html = html.replace("__USER_PIC_URL__", prayer_obj.get("user_profile"));
        html = html.replace("__USER_ID__", prayer_obj.get("user"));
    }
    else {
        html = "";
    }
        
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

function loadCurrentUser() {
	var query = new Parse.Query(Member);
	query.get(user_id, {
		success: function(member) {
			user_name = member.get("name");
			user_profile = member.get("profile_url");
		}
	});
}

window.onload = function() {
    parseInit();
		loadCurrentUser();
    loadPreviousPrayers();
};
