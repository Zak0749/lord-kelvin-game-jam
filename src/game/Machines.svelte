<script lang="ts">
  import { gameState } from './gameState.svelte';
  import Machine from './Machine.svelte';

</script>

<section>
  {#each gameState.machines as machine}
    <Machine {machine} />
  {/each}
</section>

<style>
  section {
    display: flex;
    gap: 1.5rem;
    padding: 10px;
    list-style: none;
    background-color: grey;
    border: lightgrey solid 1px;
    border-radius: 10px;
    height: 100%;
    justify-content: space-around;
    align-items: center;
  }
</style>