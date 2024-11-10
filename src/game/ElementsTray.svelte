<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import { gameState, get_element,
    spawn_element,
    type GameElement, } from "./gameState.svelte";
  import { center_of_element } from './helpers'
  import { gameUI } from './GameUI.svelte'

  function placeElement(element: GameElement) {
    if (!gameUI.mergeGrid) return;

    let spawned_element = spawn_element({
      ...element,
      ...center_of_element(gameUI.mergeGrid)
    });
    gameState.placedElements.push(spawned_element);
    
  }
</script>

<div class="game-element">
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
    height: 100%;
  }

  li {
    cursor: pointer;
  }
</style>
