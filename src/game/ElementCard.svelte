<script lang="ts">
  import type { GameElement } from "./element.svelte";

  let { name, color }: GameElement = $props();
</script>


<div class="element">
  <div class="square" style="--color: {color}"></div>
  <h3 class="name">{name}</h3>
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
