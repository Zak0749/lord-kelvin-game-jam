<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</svelte:head>

<script lang="ts">
  import TitleScreen from "./menu/MenuScreen.svelte";
  import { appState } from "./appState.svelte";
  import OptionsMenu from "./options/OptionsMenu.svelte";
  import Game from "./game/Game.svelte";
  import theme from './assets/theme.mp3';
  import { options } from "./options/options.svelte";
</script>

<audio src="{theme}" autoplay volume="{options.calculated_music_volume}"></audio>

<div>
  {#if appState.gameState === 'playing'}
    <Game />
  {:else}
    <TitleScreen />
  {/if}
</div>

{#if appState.optionsMenuOpen}
  <div class="over">
    <OptionsMenu />
  </div>
{/if}
