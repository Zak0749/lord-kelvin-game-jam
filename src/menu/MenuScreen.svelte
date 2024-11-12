<script lang="ts">
  import { appState } from "../appState.svelte";
  import station from "../assets/space-station.png";
  import { gameState } from "../game/gameState.svelte";
  import { buttonClick } from "../soundEffects.svelte";
  // import { buttonClick } from "../soundEffects.svelte";
  import Scenarios from "./Scenarios.svelte";

  let showLevels = $state(false);

  function startPlay() {
    buttonClick.play();
    if (appState.completedGame) {
      gameState.scenarioIndex = 0;
    }
    appState.gameState = "playing";
  }
</script>

{#if showLevels}
  <div class="over">
    <Scenarios closePopup={() => (showLevels = false)} />
  </div>
{/if}

<main>
  <header style="height: 32px; padding: 1rem; padding-bottom: 10rem">
    <button
      onclick={() => { buttonClick.play(); appState.optionsMenuOpen = true; }}
      class="icon-button"
      aria-label="Open Options Menu"
    >
      <svg
        width="24px"
        height="24px"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M15 1v6H9V1h6zm-2 2h-2v2h2V3zm2 6v6H9V9h6zm-2 2h-2v2h2v-2zm2 6v6H9v-6h6zm-2 2h-2v2h2v-2z"
          fill="currentColor"
        />
      </svg>
    </button>
  </header>

  <h1 class="title">
    {appState.completedGame ? "You fulfilled all requests!" : appState.name}
  </h1>

  {#if appState.completedGame}
    <p style="color: var(--primary-color); padding-top: 5rem">
      You are now a member of the coolest and most exclusive club in the galaxy - the Lord Kelvin Fan Club!
    </p>
  {/if}

  <div class="split-grid">
    <img src={station} alt="Space Station" height="128" />

    <ul class="flex-list">
      <button class="text-button" onclick={startPlay}>
        {appState.completedGame ? "Restart Game" : "Start Game"}
      </button>
      {#if gameState.scenarioReached > 0}
        <button class="text-button" onclick={() => { buttonClick.play(); showLevels = true }}>
          Scenarios
        </button>
      {/if}
    </ul>
  </div>

  <section style="padding-top: 5rem;" >
    <h3 style="color: var(--primary-color)">Game made by Lord Kelvin Fan Club</h3>
    <p>Art - Leia</p>
    <p>Game Design - Mackenzie</p>
    <p>Programming - Zak</p>
    <p>Music - Emil</p>
  </section>
</main>

<style>
  header {
    display: flex;
    justify-content: end;
    padding: 0;
  }

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
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  h1,
  p {
    margin: 0;
    padding: 0;

    /* animation-timing-function: linear ease-in-out, linear, step-start, linear */
  }
  .title {
    animation-name: rotate, scale;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 3s;
  }

  @keyframes scale {
    0% {
      scale: 1;
    }

    25% {
      scale: 1.2;
    }

    50% {
      scale: 1;
    }

    75% {
      scale: 1.2;
    }

    100% {
      scale: 1;
    }
  }

  @keyframes rotate {
    0% {
      rotate: -10deg;
    }

    50% {
      rotate: 10deg;
    }

    100% {
      rotate: -10deg;
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
