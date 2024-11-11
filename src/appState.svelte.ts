import { gameState } from "./game/gameState.svelte";
import { scenarios } from './assets/elements.json'


class AppState {
    gameState: "menu" | "playing" = $state("menu");
    optionsMenuOpen = $state(false);
    completedGame = $derived(gameState.scenarioReached == scenarios.length);
    name = 'Galactic Alchemy';
}

export let appState = new AppState();