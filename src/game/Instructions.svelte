<script lang="ts">
  import { gameState } from "./gameState.svelte";
  import person from "../assets/person.png";
  import CorruptedText from "./corruptedText.svelte";

  type Text =  { 
    corrupted: boolean;
    part: string;
    translation?: {x: number, y: number};
    color?: string;
  }

  let corruptedDescription = $derived(
    gameState.scenario.description
      .split(/(\[.+?\])/)
      .map((part, i) =>
        part.startsWith("[") && part.endsWith("]")
          ? { corrupted: true, part: part.slice(1, -1) }
          : { corrupted: false, part }
      )
  );

  let desc = $state<HTMLElement>();

  // window.setInterval(() => {
  //   desc?.
  //     querySelectorAll('.corrupted').forEach((el) => {
  //       (el as HTMLElement).style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
  //     });
  // }, 10);
</script>

{#if gameState.showInstructions}
  <section class="game-element">
    <div
      style="background-color: {gameState.scenario.color}"
      class="person-img"
    ></div>
    <div class="person-desc">
      <h2>{gameState.scenario.name}</h2>
      <p bind:this={desc}>
        {#each corruptedDescription as part}
          {#if part.corrupted}
            <CorruptedText text={part.part} />
          {:else}
            {part.part}
          {/if}
        {/each}
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
