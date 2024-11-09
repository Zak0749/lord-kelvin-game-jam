<script lang="ts">
  import { gameState } from "./gameState.svelte";
  import person from "../assets/person.png";
</script>

{#if gameState.showInstructions}
  <section>
    <div style="background-color: {gameState.scenario.color}" class="person-img"></div>
    <div class="person-desc">
      <h2>{gameState.scenario.name}</h2>
      <p>
        {gameState.scenario.description}
      </p>
    </div>
  </section>
{/if}

<style>
  .person-img {
    height: 150px;
    min-width: 150px;
    border-radius: 50%;
    margin-right: 1rem;
  }

  section {
    margin: 0;
    padding: 1rem;
    background-color: grey;
    border: lightgrey solid 1px;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .person-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  }

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }
</style>
