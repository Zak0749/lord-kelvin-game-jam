<script lang="ts">
  import { appState } from "../appState.svelte";
  import station from "../assets/space-station.png";
  import { gameState } from "../game/gameState.svelte";
</script>

<main>
  <h1 class="title">You fulfilled all requests!</h1>

  <section style="padding-top: 5rem;">
    <h2 style="color:var(--primary-color)">{appState.name}</h2>
    <p>Game made by Lord Kelvin Fan Club</p>
    <p>Art - Leia</p>
    <p>Game Design - Mackenzie</p>
    <p>Programming - Zak</p>
    <p>Music - Emil</p>
  </section>

  <ul class="flex-list" style="padding-top: 10rem">
    <button class="text-button" onclick={() => (appState.gameState = 'playing')}> Restart Game </button>

  </ul>

</main>

<style>
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
    font-size: 4rem;

    

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
      rotate: 10deg ;
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
    align-items: center;
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
