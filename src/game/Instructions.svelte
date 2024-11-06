<script lang="ts">
  import { gameState } from "./gameState.svelte";
  import person from "../assets/person.png";
</script>

{#if gameState.showInstructions}
  <section>
    <img class="person-img" src={person} alt="person" />
    <div class="person-desc">
      <h2>Paul Holywood</h2>
      <p>
        Long description of a recipe that is being prepared. It is a cake
        firstly you will need to mix the ingredients of: flour, sugar, eggs, and
        milk. Then you will need to bake it in the oven for 30 minutes. Finally,
        you will need to let it cool down before serving.
      </p>
    </div>
  </section>
{/if}

<style>
  .person-img {
    height: 150px;
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
