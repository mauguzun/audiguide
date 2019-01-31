const Mainplayer = {
  player: null,

  Play(src) {
    if (this.player != null) {
      this.Stop();
    }
   
    this.player = new Media(src);
    this.player.play();
    

  },
  Stop() {
    if (this.player != null) {
      this.player.stop();
      this.player == null;
    }
  }
};
