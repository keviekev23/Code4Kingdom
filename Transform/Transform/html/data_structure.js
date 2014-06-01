var previousPrayerRequests = [];
var user_id = "6LHmZCtThR";

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