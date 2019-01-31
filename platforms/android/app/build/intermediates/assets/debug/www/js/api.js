const Api = {
  address: "http://localhost/cyber_project/api/guide",
 

  PostData(url, data = null) {
    data.lang = Translate.GetCurrentCode();
    return $.post(this.address + url, data);
  }
};
