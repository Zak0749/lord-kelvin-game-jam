<script lang="ts">
  import type { GameElement, SpawnedElement } from "./gameState.svelte";

  let {element}: {element: GameElement | SpawnedElement} = $props();

  $effect(() => {
    if ((element as SpawnedElement).width) {
      (element as SpawnedElement).width = w;
      (element as SpawnedElement).height = height;
    }
  })

  let height = $state(32);
  let w = $state(32);
</script>


<div class="element" bind:clientHeight="{height}" bind:clientWidth="{w}" style="cursor: {(element as SpawnedElement).width ? 'grab' : 'pointer'} !important">
  <div class="square" style="--background-color: {element.color}"></div>
  <h3 class="name">{element.name}</h3>
</div>

<style>
  .element {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));

  }
  .square {
    width: 32px;
    height: 32px;
    /* background-color: var(--background-color); */
    background-image: url(../assets/elements/fungi_essence.png);
  }
  
  h3 {
    margin: 0;
    padding: 0;
  }
</style>
