class Options {
  main_volume = $state(0.5);
  music_volume = $state(0.5);
  sfx_volume = $state(0.75);

  constructor() {
    let stored_main_volume = localStorage.getItem("main_volume");
    if (stored_main_volume) {
      this.main_volume = parseFloat(stored_main_volume);
    }

    let stored_music_volume = localStorage.getItem("music_volume");
    if (stored_music_volume) {
      this.music_volume = parseFloat(stored_music_volume);
    }

    let stored_sfx_volume = localStorage.getItem("sfx_volume");
    if (stored_sfx_volume) {
      this.sfx_volume = parseFloat(stored_sfx_volume);
    }

    $effect.root(() => {
      $effect(() => {
        localStorage.setItem("main_volume", this.main_volume.toString());
      })
  
      $effect(() => {
        localStorage.setItem("music_volume", this.music_volume.toString());
      })
  
      $effect(() => {
        localStorage.setItem("sfx_volume", this.sfx_volume.toString());
      })
    })
  }

  get calculated_music_volume() {
    return this.main_volume * this.music_volume;
  }

  get calculated_sfx_volume() {
    return this.main_volume * this.sfx_volume;
  }
}

export let options = new Options();