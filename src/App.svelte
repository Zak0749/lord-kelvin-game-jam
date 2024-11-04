<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</svelte:head>

<script lang="ts">
  import TitleScreen from "./title/TitleScreen.svelte";
  import { gameState } from "./gameState.svelte";
  import Game from "./game/Game.svelte";
  import OptionsMenu from "./options/OptionsMenu.svelte";
</script>

<div>
  {#if gameState.isPlaying}
    <Game />
  {:else}
    <TitleScreen />
  {/if}
</div>

{#if gameState.optionsMenuOpen}
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
