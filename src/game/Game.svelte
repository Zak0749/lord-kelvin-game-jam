<script lang="ts">
  import { gameState } from "../gameState.svelte";
  import Canvas from "./Canvas.svelte";
  import person from "../assets/person.png";
</script>

<main>
  <section class="split">
    <button onclick={() => (gameState.isPlaying = false)}>
      Back to title
    </button>
    <button onclick={() => (gameState.optionsMenuOpen = true)}>
      Options
    </button>
  </section>

  <section>
    <div style="display: flex;">
      <img class="person-img" src={person} alt="person" />
      <div class="person-desc">
        <h2>Joe Mama</h2>
        <p>
          Excuse me, but could you possibly lend me a writing instrument?
          Specifically, I am in need of a pen, preferably one with a fine tip
          for precision writing. It would be ideal if the pen has a comfortable
          grip, a smooth ink flow, and a reliable click mechanism or cap to
          prevent any accidental ink marks. Additionally, if the pen has a
          transparent barrel to monitor the ink level, that would be greatly
          appreciated. Thank you in advance for your assistance!
        </p>
      </div>
    </div>
  </section>

  <Canvas />
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }

  .split {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  .person-img {
    width: 15rem;
    height: 15rem;
  }

  .person-desc {
    text-align: left;
  }
</style>
