app.pages.settings = new Vue({
  el: "#vue_page_settings",
  data: {
    display: true,
    trans: trans,
    langs: Translate.list,
    cities: null,
    info: null,
    lang: Translate.GetCurrentCode(),
    city : 1 ,
  },  
  methods: {
    pressStart() {
      
      this.info = null;

    
      if (this.lang != Translate.GetCurrentCode()) {
        let promise = Translate.LoadLang(this.lang);
        promise.then(translate => {
          trans = translate;
        });
      }

      let points = Api.PostData("points", {
        lang: this.lang,
        city: this.city
      }).then(result => {

        console.log(result);
        if (result.action) {
          if (result.message != null) {
            if (confirm(result.message)) {
              app.pages.map.points = result.point;
              menu.go("map");
            }else{
              this.info = result.message;
            }
          } else {
            app.pages.map.points = result.point;
            menu.go("map");
          }
        }
      });
    }
  },
  mounted() {
    let request = Api.PostData("cities", null);
    request.then(e => {
      console.log(e);
      if (e.action == true) {
        this.cities = e.code;
      }
    });
  }
});
