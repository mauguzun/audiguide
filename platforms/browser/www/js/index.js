let media = null;
var trans = null;
app.isPhone = window.cordova.platformId == "browser" ? false : true;

document.addEventListener("deviceready", function() {
  if (app.isPhone) {
    runBackground(cordova);
  }

  Translate.LoadLang().then(result => {
       trans = result;
       // go to settings 
       
  });
});

function runBackground(cordova) {
  cordova.plugins.backgroundMode.setEnabled(true);
  cordova.plugins.backgroundMode.enable();
  cordova.plugins.backgroundMode.on("activate", function() {
    cordova.plugins.backgroundMode.setDefaults({
      title: trans.main.title,
      text: trans.main.desc,
      icon: "img/car.png", // this will look for icon.png in platforms/android/res/drawable|mipmap
      color: "F14F4D", // hex format like 'F14F4D'
      resume: true,
      hidden: false,
      bigText: trans.main.desc
    });
  });
}
