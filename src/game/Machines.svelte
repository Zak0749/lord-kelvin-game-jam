<script lang="ts">
  type Machine = {
    name: string;
    color: string;
  };

  let machines: Machine[] = $state([
    { name: "Machine 1", color: "red" },
    { name: "Machine 2", color: "blue" },
    { name: "Machine 3", color: "green" },

  ]);
</script>

<section>
  {#each machines as machine}
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