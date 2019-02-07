const City = {
  index: "city",
  default: 1,

  set city(city ) {
    localStorage.setItem(this.index, city);
  },

  get city () {
    return  (localStorage.getItem(this.index)) ? localStorage.getItem(this.index) : this.default ;
  }
};
