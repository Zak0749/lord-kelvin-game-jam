<script lang="ts">
  import { gameState } from "../gameState.svelte";
  import rocket from "../assets/Cartoon_space_rocket.png";
</script>

<main>
  <h1>Game Title</h1>

  <div class="split-grid">
    <img src={rocket} alt="Sprite" width="100" height="100" />

    <ul class="flex-list">
      <button onclick={() => (gameState.isPlaying = true)}> Start Game </button>
      <button onclick={() => (gameState.optionsMenuOpen = true)}> Options </button>
    </ul>
  </div>
</main>

<style>
  

  /* button {
    background-color: transparent;
    border-radius: 5px;
    border: 20px solid transparent;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  } */

  main {
    background-image: url("../assets/background.jpg");
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  h1 {
    margin: 0;
    padding-top: 1rem;
  }

  .split-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 20vh;
  }

  .flex-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .flex-list button {
    padding: 1rem;
    margin: 1rem;
    /* font-size: 1.5rem; */
    max-width: 25rem;
  }

  .split-grid > img {
    margin: auto;
  }
</style>
