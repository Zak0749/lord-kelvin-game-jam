<script lang="ts">
  import ElementsTray from "./ElementsTray.svelte";
  import Header from "./Header.svelte";
  import MergeGrid from "./MergeGrid.svelte";
  import Machines from "./Machines.svelte";
  import Instructions from "./Instructions.svelte";
  import FloatingElements from "./FloatingElements.svelte";
  import { gameState } from "./gameState.svelte";
  import SubmitElements from "./SubmitElements.svelte";
  import { gameUI } from "./GameUI.svelte";
  import SendOffPopup from "./SendOffPopup.svelte";
  import PopUp from "./popUp.svelte";

  let mergeGrid = $state<HTMLElement>();

  let elementsTray = $state<HTMLElement>();


</script>

<SendOffPopup />

<FloatingElements  />

<PopUp />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main>
  <header>
    <Header />
  </header>

  <aside class="element-tray" bind:this={gameUI.elementsTray}>
    <ElementsTray />
  </aside>

  <section class="instructions" bind:this={gameUI.instructions}>
    <Instructions />
  </section>

  <aside class="submit-area" bind:this={gameUI.submitArea}>
    <SubmitElements />
  </aside>

  <section class="machines" >
    <Machines />
  </section>

  <section class="merge-grid" bind:this={gameUI.mergeGrid}>
    <MergeGrid />
  </section>
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 36px 2fr 1fr 5fr;
    grid-template-columns: 3fr 5fr 2fr;
    padding: 1rem;
    gap: 1rem;

    grid-template-areas:
      "header header header"
      "instructions instructions submit"
      "element-tray machines machines"
      "element-tray merge-grid merge-grid";
  }

  .element-tray {
    grid-area: element-tray;
  }

  header {
    grid-area: header;
  }

  .machines {
    grid-area: machines;
  }

  .merge-grid {
    grid-area: merge-grid;
  }

  .submit-area {
    grid-area: submit;
  }

  .instructions {
    grid-area: instructions;
  }
</style>
