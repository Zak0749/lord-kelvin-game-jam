<script lang="ts">
  import { onMount } from "svelte";
  import { Sound } from 'svelte-sound';
  import type { PlacedMachine } from "./gameState.svelte";
  import { createSound } from "../soundEffects.svelte";

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
    width: 64px;
    height: 64px;
    background-color: var(--color);
  }
   
  h3 {
    margin: 0;
    margin-top: 5px;
  }
</style>