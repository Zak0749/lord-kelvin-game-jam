class AppState {
    gameState: "title" | "playing" | "won" = $state("title");
    optionsMenuOpen = $state(false);
}

export let appState = new AppState();