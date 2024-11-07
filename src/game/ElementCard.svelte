<script lang="ts">
  import type { GameElement, SpawnedElement } from "./gameState.svelte";

  let {element}: {element: GameElement | SpawnedElement} = $props();

  $effect(() => {
    if ((element as SpawnedElement).width) {
      (element as SpawnedElement).width = w;
      (element as SpawnedElement).height = height;
    }
  })

  let height = $state(20);
  let w = $state(20);
</script>


<div class="element" bind:clientHeight="{height}" bind:clientWidth="{w}">
  <div class="square" style="--color: {element.color}"></div>
  <h3 class="name">{element.name}</h3>
</div>

<style>
  .element {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .square {
    width: 20px;
    height: 20px;
    background-color: var(--color);
  }
  
  h3 {
    margin: 0;
    padding: 0;
  }
</style>
