class AppState {
    private _isPlaying = $state(false); // testing 
    private _optionsMenuOpen = $state(false);

    get isPlaying() {
        return this._isPlaying;
    }

    set isPlaying(value: boolean) {
        this._isPlaying = value;
    }

    get optionsMenuOpen() {
        return this._optionsMenuOpen;
    }

    set optionsMenuOpen(value: boolean) {
        console.log("setting optionsMenuOpen to " + value);
        this._optionsMenuOpen = value;
        console.log(this.optionsMenuOpen);
    }
}

export let appState = new AppState();