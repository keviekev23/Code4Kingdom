var nextEvent;

var Event = Parse.Object.extend("Event", {
  initialize: function(time, location, organizer) {
    this.set("time", time);
    this.set("location", location);
    this.set("organizer", organizer);
    this.set("attendees", []);
		this.set("losers", []);
  },

  addAttendee: function(user_id) {
    this.addUnique('attendees', user_id);
    this.save(null, {
			success: function(event) {
				nextEvent = event;
			},
			error: function(event, error) {
				alert('Failed to save your response: ' + error.description);
			}
		});
  },

	addLoser: function(user_id) {
		this.addUnique('losers', user_id);
		this.save(null, {
			success: function(event) {
				nextEvent = event;
			},
			error: function(event, error) {
				alert('Failed to save your response: ' + error.description);
			}
		});
	}
})

function popup() {
	alert("Hello World")
}

window.onload = function() {
  Parse.$ = jQuery;
  
  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("tK9bW3HzysojL4fxbjjj2H1zCT81JuyW1s6x02Vr",
                   "ZiGuizOBCP3JK8TKqHhnWzzQLhO6Ym9iJOFJWP2F");
  
  loadCurrentEvent();
}

function addEvent(time, location, organizer) {
  var event = new Event();
  event.initialize(time, location, organizer);
  event.save();
}

function loadCurrentEvent() {
  var query = new Parse.Query(Event);
	// For now, let's assume the event created earlier will happen earlier. =P
	query.ascending('updatedAt');
	// Only want the next 1 event.
  query.first({
    success: function(result) {
      nextEvent = result;
    }
  });
}



function attending() {
  alert('attending!');
}
function notattending() {
  alert('not Attending!');
}

function getNumberOfAttendees() {
	return nextEvent.get("attendees").length;
}

function getNumberOfLosers() {
	return nextEvent.get("losers").length;
}