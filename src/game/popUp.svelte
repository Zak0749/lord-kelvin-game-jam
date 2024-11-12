<script>
  import { buttonClick } from "../soundEffects.svelte";
  import { gameState } from "./gameState.svelte";


</script>

{#if gameState.popup.show}
  <div class="over">
    <section>
      <p>{gameState.popup.message}</p>

    <button class="text-button" onclick={() => { buttonClick.play(); gameState.popup.show = false; }}>
      Close
    </button>
    </section>
  </div>
{/if}

<style>
    section {
    max-width: 500px;
    background-color: transparent; /* Transparent background */
    color: #ffffff; /* Text color */
    padding: 12px 24px; /* Button padding */
    border: 2px solid var(--primary-color); /* Initial border color */
    border-radius: 8px; /* Rounded corners */
    outline: none; /* Remove outline */
    transition:
      box-shadow 0.3s ease,
      border-color 0.3s ease; /* Smooth transition */
      height: auto;
    backdrop-filter: blur(10px);

  }

  .over {
    backdrop-filter: none;

  }
</style>