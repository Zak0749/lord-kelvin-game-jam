class Options {
  _main_volume: number = 50;
  _music_volume: number =  50;
  _sfx_volume: number = 75;

  get main_volume() {
    return this._main_volume;
  }

  set main_volume(value: number) {
    this._main_volume = value;
  }

  get music_volume() {
    return this._music_volume;
  }

  set music_volume(value: number) {
    this._music_volume = value;
  }

  get sfx_volume() {
    return this._sfx_volume;
  }

  set sfx_volume(value: number) {
    this._sfx_volume = value;
  }
}

export let options = new Options();