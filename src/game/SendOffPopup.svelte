<script>
  import { appState } from "../appState.svelte";
  import { gameState } from "./gameState.svelte";

  function next() {
    gameState.scenarioIndex += 1;
    gameState.closeDoorAnimation = false;
    gameState.showResults = "none";
  }

  function back() {
    gameState.closeDoorAnimation = false;
    gameState.showResults = "none"
  }
</script>

{#if gameState.showResults == "correct"}
  <div class="over">
    <ul>
      <section class="s">
      <h1>Great Job</h1>

        <div
          style="background-color: {gameState.scenario.color}"
          class="person-img"
        ></div>
        <div class="person-desc">
          <h2>{gameState.scenario.name}</h2>
          <p>
            {gameState.scenario.correctDescription}
          </p>
        </div>
      </section>

      <button class="text-button" onclick={next}> Next </button>
    </ul>
  </div>
{:else if gameState.showResults == "error"}
  <div class="over">
    <ul>
      <section class="s">
      <h1>Are you sure?</h1>

        <div
          style="background-color: {gameState.scenario.color}"
          class="person-img"
        ></div>
        <div class="person-desc">
          <h2>{gameState.scenario.name}</h2>
          <p>
            {gameState.scenario.wrongDescription}
          </p>
        </div>
      </section>

      <button
        class="text-button"
        onclick={back}
      >
        Close
      </button>
    </ul>
  </div>
{/if}

<style>
  h1 {
    margin-bottom: 10px;
    margin-top: 0;
  }
  ul {
    max-width: 500px;
    height: 90vh;
    width: 80vw;
    background-color: transparent; /* Transparent background */
    color: #ffffff; /* Text color */
    padding: 12px 24px; /* Button padding */
    border: 2px solid var(--primary-color); /* Initial border color */
    border-radius: 8px; /* Rounded corners */
    outline: none; /* Remove outline */
    transition:
      box-shadow 0.3s ease,
      border-color 0.3s ease; /* Smooth transition */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .person-img {
    aspect-ratio: 1;
    width: 100%;
    border-radius: 50%;
    margin: 0;
  }

  .s {
    width: 100%;
    padding: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  p { margin: 0;}
  h2 {
    margin-bottom: 0;
  }
</style>
