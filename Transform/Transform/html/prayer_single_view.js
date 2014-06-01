window.onload = function() {
  Parse.$ = jQuery;
  
  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("tK9bW3HzysojL4fxbjjj2H1zCT81JuyW1s6x02Vr",
                   "ZiGuizOBCP3JK8TKqHhnWzzQLhO6Ym9iJOFJWP2F");
  
  loadPrayer('7Z6hHJp4yk');
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
      } else if (prayer.get("status") == "Answered") {
        $("#answer_button").css({"background-color":"#336699"});      }
    }
  });
}
