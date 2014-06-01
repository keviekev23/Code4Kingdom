var nextEvent;

var Event = Parse.Object.extend("Event", {
  initialize: function(time, location, organizer) {
    this.set("time", time);
    this.set("location", location);
    this.set("organizer", organizer);
    this.set("rsvp", []);
  },

  addAttendee: function(user_id) {
    this.addUnique('rsvp', user_id);
    this.save();
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
			console.log(result.get('time'));
    }
  });
}