<script lang="ts">
  import { gameState } from "../game/gameState.svelte";
  import { appState } from "../appState.svelte";
  import { scenarios } from '../assets/elements-old.json'
  import { buttonClick } from "../soundEffects.svelte";

  let {closePopup}: { closePopup: () => void } = $props()

  function gotoScenario(i: number) {
    buttonClick.play();
    gameState.scenarioIndex = i;
    appState.gameState = "playing";
  }

  function get_num() {
    if (appState.completedGame) {
      return scenarios.length;
    } else {
      return gameState.scenarioReached + 1;
    }
  }
</script>

<section>
  <ul>
    {#each Array((get_num())) as _, i}
      <button class="text-button" onclick={() => gotoScenario(i)}>Scenario {i + 1}</button>
    {/each}
  </ul>
  

  <button class="text-button" onclick={() => { buttonClick.play(); closePopup() }}> Close </button>
</section>

<style>
  section {
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
    justify-content: space-between;
    flex-direction: column;
  }
</style>
