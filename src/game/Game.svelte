<script lang="ts">
  import { gameState } from "../gameState.svelte";
  import Canvas from "./Canvas.svelte";
  import person from "../assets/person.png";

  let showPrompt = true;
</script>

<main>
  <section class="above-canvas">
    <section class="split">
      <button onclick={() => (gameState.isPlaying = false)}>
        Back to title
      </button>
      <button onclick={() => (showPrompt = !showPrompt)}>
        {showPrompt ? "Hide" : "Show"} Prompt
      </button>
      <button onclick={() => (gameState.optionsMenuOpen = true)}>
        Options
      </button>
    </section>

    {#if showPrompt}
      <section>
        <div style="display: flex;">
          <img class="person-img" src={person} alt="person" />
          <div class="person-desc">
            <h2>Paul Holywood</h2>
            <p>
              Long description of a recipe that is being prepared. It is a cake
              firstly you will need to mix the ingredients of: flour, sugar,
              eggs, and milk. Then you will need to bake it in the oven for 30
              minutes. Finally, you will need to let it cool down before
              serving.
            </p>
          </div>
        </div>
      </section>
    {/if}
  </section>

  <Canvas />
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    position: relative;
  }

  .split {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  .person-img {
    width: 15rem;
    height: 15rem;
  }

  .person-desc {
    text-align: left;
  }

  .above-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
</style>
