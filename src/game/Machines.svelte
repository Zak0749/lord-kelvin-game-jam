<script lang="ts">
  import { machines } from '../assets/elements.json'

</script>

<section>
  {#each Object.values(machines) as machine}
    <div class="machine">
      <div class="square" style="--color: {machine.color}"></div>
      <h3 class="name">{machine.name}</h3>
    </div>
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