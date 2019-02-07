const Api = {
  address: "http://localhost/audio/api/",
  // address: "http://localhost/cyber_project/api/guide",
 

  PostData(url, data = null) {


    data = data || {};
    data.lang = Translate.GetCurrentCode();

    console.log(data);

    return $.post(this.address + url, data);
  }
};
