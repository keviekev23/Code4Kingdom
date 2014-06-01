var currentPrayerID = '7Z6hHJp4yk';
window.onload = function() {
    parseInit();
  
  loadPrayer(currentPrayerID);
};

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
            console.log(prayer.get("status"));
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