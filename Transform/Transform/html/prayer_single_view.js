window.onload = function() {
  parseInit();
  currentPrayerID = getParameterByName('prayer_id');
  if (currentPrayerID) {
    loadPrayer(currentPrayerID);
  }
  // Otherwise it's on iOS and we will have native chrome trigger loadPrayer.
};

function getParameterByName(name) {
  if (!window.location.search) {
    // in simulator instead of browser
    return null;
  }
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function loadPrayer(id) {
  var query = new Parse.Query(Prayer);
  query.get(id, {
    success: function(prayer) {
      document.getElementById('prayer_title').innerHTML =
        prayer.get("title");
      document.getElementById('prayer_content').innerHTML =
        prayer.get("content");
      document.getElementById('prayer_type').innerHTML =
        prayer.get("type");
      document.getElementById('user_profile').src =
        prayer.get("user_profile");
      if (prayer.get("status") == "Open") {
        $("#open_button").css({"background-color":"#336699"});
        $("#answer_button").css({"background-color":"#5CB8E6"});
      } else if (prayer.get("status") == "Answered") {
        $("#open_button").css({"background-color":"#5CB8E6"});
        $("#answer_button").css({"background-color":"#336699"});
      }
    }
  });
}

function openPrayer() {
  updatePrayerStatus("Open");
}

function answerPrayer() {
  updatePrayerStatus("Answered");
}

function updatePrayerStatus(status) {
  console.log(status);
  var query = new Parse.Query(Prayer);
  query.get(currentPrayerID, {
    success: function(prayer) {
      prayer.set("status", status);
      prayer.save();
      if (status == "Open") {
        $("#open_button").css({"background-color":"#336699"});
        $("#answer_button").css({"background-color":"#5CB8E6"});
      } else if (prayer.get("status") == "Answered") {
        $("#open_button").css({"background-color":"#5CB8E6"});
        $("#answer_button").css({"background-color":"#336699"});
      }
    }
  })
}