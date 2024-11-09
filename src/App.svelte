<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</svelte:head>

<script lang="ts">
  import TitleScreen from "./title/TitleScreen.svelte";
  import { appState } from "./appState.svelte";
  import OptionsMenu from "./options/OptionsMenu.svelte";
  import Game from "./game/Game.svelte";
  import WinningScreen from "./gamewon/WinningScreen.svelte";
</script>

<div>
  {#if appState.gameState === 'playing'}
    <Game />
  {:else if appState.gameState === 'title'}
    <TitleScreen />
  {:else}
    <WinningScreen />
  {/if}
</div>

{#if appState.optionsMenuOpen}
  <div class="over">
    <OptionsMenu />
  </div>
{/if}

<style>
  .over {
    z-index: 1;
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    top: 0;
    backdrop-filter: blur(5px);
  }
</style>
