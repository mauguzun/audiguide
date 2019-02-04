app.pages.settings = new Vue({
    el: "#vue_page_settings",
    data: {
      display: true
    },
    methods: {
      pressStart(){
         // todo check if other ?
         
        
         menu.go('map');
      }
    },
    created() {
       
    },
  });
  