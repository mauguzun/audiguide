let menu = new Vue({
    el: "#menu",
    data: {
      showMenu: false,
    },
    methods: {
  
      // menu
      exitApp() {
        if (navigator.app) {
          navigator.app.exitApp();
        } else if (navigator.device) {
          navigator.device.exitApp();
        } else {
          window.close();
        }
      },
  
      go(arg) {
        if (arg == this.currentPage) {
          return;
        }

        this.currentPage = arg;

        // other 

        app.pages.map.display = false;
        app.pages.settings.display = false;
        app.pages.page.display = false;
        
        switch(arg)
        {
            case 'map':
            app.pages.map.display = true;
            break;

            //  di work ?
            case "page|about":
            app.pages.page.display = true;
            app.pages.page.show('about');
            break;

            case "settings":
            app.page

        }
        this.showMenu = false;
      }
    }
  });
  