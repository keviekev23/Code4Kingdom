var nextEvent = null;

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
				console.log(event.get("attendees").length + " attending");
				document.getElementById("attend_button").innerHTML =
          "Attending (" + event.get("attendees").length + ")";
        $("#attend_button").css({"background-color":"#336699"});
        $("#loser_button").css({"background-color":"#5CB8E6"});
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
				console.log(event.get("losers").length + " losers");
				document.getElementById("loser_button").innerHTML =
					"Not Attending (" + event.get("losers").length + ")";
        $("#attend_button").css({"background-color":"#5CB8E6"});
        $("#loser_button").css({"background-color":"#336699"});
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
	parseInit();
  loadCurrentEvent();
}

function addAttendee() {
	if (nextEvent == null) {
		alert('next event has not finished loading');
	}
  nextEvent.addAttendee(user_id);
}

function addLoser() {
	if (nextEvent == null) {
		alert('next event has not finished loading');
	}
  nextEvent.addLoser(user_id);
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
			document.getElementById("attend_button").innerHTML =
				"Attending (" + nextEvent.get("attendees").length + ")";
			document.getElementById("loser_button").innerHTML =
				"Not Attending (" + nextEvent.get("losers").length + ")";
    }
  });
}

function getNumberOfAttendees() {
	return nextEvent.get("attendees").length;
}

function getNumberOfLosers() {
	return nextEvent.get("losers").length;
}