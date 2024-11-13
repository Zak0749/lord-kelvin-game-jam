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
  {#await import(`../assets/ingredients/${element.fileName}.png`) then { default: src }}
    <img width="32" height="32" {src} alt="{element.name}" />
  {/await}
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
  
  h3 {
    margin: 0;
    padding: 0;
  }
</style>
