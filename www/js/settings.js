app.pages.settings = new Vue({
    el: "#vue_page_settings",
    data: {
      display: false
    },
    methods: {
      pressStart(){
         // todo check if other ?
         
         app.pages.map.start();
         menu.go('map');
      }
    },
    created() {
       
    },
  });
  