app.pages.page = new Vue({
  el: "#vue_page_page",
  data: {
    display: false
  },
  methods: {
    show(arg) {
      Api.PostData("code", { page_name: "about" }).then(e => {
        document.getElementById("page").innerHTML = e.code;
        this.currentPage = "page";
      });
    }
  },
  created() {
    
  },
});
