<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import { gameState, get_element,
    spawn_element,
    type GameElement, } from "./gameState.svelte";

  let { mergeGrid }: { mergeGrid: HTMLElement | undefined } = $props();

  function placeElement(element: GameElement) {
    if (mergeGrid) {
      let rect = mergeGrid.getBoundingClientRect();
      let spawned_element = spawn_element({
        ...element,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      gameState.placedElements.push(spawned_element);
    }
  }
</script>

<div>
  <ul>
    {#each gameState.discoveredElements as element}
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <li
        onmousedown={() => {
          placeElement(element);
        }}
      >
        <ElementCard {element} />
      </li>
    {/each}
  </ul>
</div>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; /* No gap to make them more compact vertically */
    align-items: flex-start; /* Align items to the start to avoid gaps */
    list-style: none;

    overflow-y: scroll;
  }

  div {
    padding: 10px;
    background-color: grey;
    border: lightgrey solid 1px;
    border-radius: 10px;
    height: 100%;
  }

  li {
    cursor: pointer;
  }
</style>
