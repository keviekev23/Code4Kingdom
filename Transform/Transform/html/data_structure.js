var previousPrayerRequests = [];
var user_id = "FqT59vQI3X"; // Caleb Lin
/*
var user_id = "agsQEhugMt"; // Jerry Tu
var user_id = "ouJBgUewAy"; // Jean Tang
var user_id = "6LHmZCtThR"; // Kevin Liang
var user_id = "UmOCWfcPFF"; // June Wang
var user_id = "FqT59vQI3X"; // Caleb Lin
var user_id = "Ddw8VGKsZ1"; // Kevin Tu
*/
var user_name;
var user_profile;

var Prayer = Parse.Object.extend("Prayer", {
  initialize: function(user_id, user_name, user_profile, title, prayer_text, type) {
    this.set("user", user_id);
    this.set("user_name", user_name);
    this.set("user_profile", user_profile);
    this.set("title", title);
    this.set("content", prayer_text);
    this.set("type", type);
    this.set("status", type == "Prayer Request" ? "Open" : "Praise");
    this.set("responses", []);
  },

  addResponse: function (text) {
    this.addUnique("responses", text);
    this.save();
  },
});

var Member = Parse.Object.extend("Member", {
  initialize: function(name, profile_url) {
    this.set("name", name);
    this.set("profile_url", profile_url);
    this.set("prayers", []);
  }
});

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
function parseInit() {
  Parse.$ = jQuery;
    
  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("tK9bW3HzysojL4fxbjjj2H1zCT81JuyW1s6x02Vr",
                     "ZiGuizOBCP3JK8TKqHhnWzzQLhO6Ym9iJOFJWP2F");
}

function addMember(name, profile_url) {
  var member = new Member();
  member.initialize(name, profile_url);
  member.save();
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