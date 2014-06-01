window.onload = function() {
  parseInit();
  currentPrayerID = getParameterByName('prayer_id');
  if (currentPrayerID) {
    loadPrayer(currentPrayerID);
  }
  // Otherwise it's on iOS and we will have native chrome trigger loadPrayer.
  loadCurrentUser();
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
      document.getElementById('date').innerHTML =
        prayer.get("date");
      if (prayer.get("status") == "Open") {
        $("#open_button").css({"background-color":"#336699"});
        $("#answer_button").css({"background-color":"#5CB8E6"});
      } else if (prayer.get("status") == "Answered") {
        $("#open_button").css({"background-color":"#5CB8E6"});
        $("#answer_button").css({"background-color":"#336699"});
      }

      if (prayer.get("type") == "Praise Report") {
        document.getElementById('comments').innerHTML = "";
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

function prayForPrayer() {
  var html = '<div class="comment"><div class="pic-container"><img class="comment-pic" src="' +
    user_profile +
    '" style="width:50px; height:50px;"/></div><div class="comment-text-container"><div class="comment-text">Prayed for you!</div></div></div>';
  $("#comments").prepend(html);
}