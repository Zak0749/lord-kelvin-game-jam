<script lang="ts">
  import { appState } from "../appState.svelte";
  import station from "../assets/space-station.png";
</script>

<main>
  <div class="title">
    <h1>Game Title</h1>
    <p style="color:#00ffff">Made by Lord Kelvin Fan Club</p>
  </div>

  <div class="split-grid">
    <img src={station} alt="Space Station" height="200" />

    <ul class="flex-list">
      <button onclick={() => (appState.isPlaying = true)} class="pixel-border"> Start Game </button>
      <button onclick={() => (appState.optionsMenuOpen = true)}> Options </button>
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

  img {
    animation: bob 2s infinite;
  }

  @keyframes bob {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

  h1, p {
    margin: 0;
    padding: 0;

    /* animation-timing-function: linear ease-in-out, linear, step-start, linear */

  }
  .title {
    padding-top: 5rem;

    animation: rotate 3s infinite linear;

  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(20deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(0deg);
    }
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
