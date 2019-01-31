const Translate = {
  index: "lang",
  default: "en",
  list: [{ code: "en", name: "English" }, { code: "fr", name: "Franch" }],
  
  LoadLang(arg = null) {
    let url = `local/${this.default}/data.json`;

    if (arg && this.list.some(x => x.code == arg)) {
      url = `local/${arg}/data.json`;
      localStorage.setItem(this.index, arg);
    } else if (localStorage.getItem(this.index)) {
      url = `local/${localStorage.getItem(this.index)}/data.json`;
    } else {
      localStorage.setItem(this.index, this.default);
    }
    return $.getJSON(url);
  },
  GetCurrentCode() {
    return localStorage.getItem(this.index);
  }
};
