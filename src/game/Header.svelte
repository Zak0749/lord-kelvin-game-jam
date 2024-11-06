<script lang="ts">
  import { gameState } from "./gameState.svelte";
  import { appState } from "../appState.svelte";
</script>

<header>
  <button onclick={() => (appState.isPlaying = false)}> Back to title </button>
  <!-- <button
    onclick={() => (gameState.showInstructions = !gameState.showInstructions)}
  >
    {gameState.showInstructions ? "Hide" : "Show"} Prompt
  </button> -->
  <button onclick={() => (appState.optionsMenuOpen = true)}> Options </button>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
</style>
