class Sound {
  sound: HTMLAudioElement;

  constructor(src: string) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  public play = () => {
    this.sound.play();
  }

  public stop = () => {
    this.sound.pause();
  }
}

export default Sound;
