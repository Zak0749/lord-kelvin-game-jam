import { gameState } from "./game/gameState.svelte";
import { scenarios } from './assets/gameData.json'


class AppState {
    gameState: "menu" | "playing" = $state("menu");
    optionsMenuOpen = $state(false);
    completedGame = $derived(gameState.scenarioReached == scenarios.length);
    name = 'Cosmic Crafting';
}

export let appState = new AppState();