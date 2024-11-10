<script lang="ts">
  import { gameState } from './gameState.svelte';
  import Machine from './Machine.svelte';

</script>

<section class="game-element">
  {#each gameState.machines as machine}
    <Machine {machine} />
  {/each}
</section>

<style>
  section {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    height: 100%;
    justify-content: space-around;
    align-items: center;
  }
</style>