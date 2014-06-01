var previousPrayerRequests = [];
var user_id = "Ddw8VGKsZ1";

var Prayer = Parse.Object.extend("Prayer", {
  initialize: function(user_id, title, prayer_text, type) {
    this.set("user", user_id);
    this.set("title", title);
    this.set("content", prayer_text);
    this.set("type", type);
    this.set("status", type == "Prayer Request" ? "Open" : "");
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

window.onload = function() {
  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("tK9bW3HzysojL4fxbjjj2H1zCT81JuyW1s6x02Vr",
                   "ZiGuizOBCP3JK8TKqHhnWzzQLhO6Ym9iJOFJWP2F");

  loadPreviousPrayers();
};

function addPrayer() {
    var form = document.forms["new-prayer"];
    var title = form["title"].value;
    var prayer_text = form["description"].value;
    var type = form["prayer"].checked ? "Prayer Request" : "Praise Report";
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

function addMember(name, profile_url) {
  var member = new Member();
  member.initialize(name, profile_url);
  member.save();
}

function loadPreviousPrayers() {
  console.log('loadPreviousPrayers');
  var query = new Parse.Query(Prayer);
  query.find({
    success: function(results) {
      console.log('returned ' + results.length + ' prayers.');
      previousPrayerRequests = results;
    }
  });
}