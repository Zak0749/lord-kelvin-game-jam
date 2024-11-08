<script lang="ts">
  import { onMount } from "svelte";
  import type { PlacedMachine } from "./gameState.svelte";

  let { machine} : { machine: PlacedMachine } = $props();

  let element = $state<HTMLElement>();

  $effect(() => {
    if (element) {
      machine.rect = element.getBoundingClientRect();
    }
  })
</script>

<div class="machine" bind:this={element}>
  <div class="square" style="--color: {machine.color}"></div>
  <h3 class="name">{machine.name}</h3>
</div>

<style>
  .machine {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .square {
    width: 50px;
    height: 50px;
    background-color: var(--color);
  }
   
  h3 {
    margin: 0;
    margin-top: 5px;
  }
</style>