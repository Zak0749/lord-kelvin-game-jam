<script lang="ts">
  import { onDestroy } from "svelte";
  let p: { text: string } = $props();
  let corruptedText = $state(p.text); // This will hold the currently displayed text

  function getRandomIndices(length: number, count: number) {
    const indices = new Set<number>();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * length));
    }
    return Array.from(indices);
  }

  const corruptInterval = setInterval(() => {
    corruptedText = corruptedText.split("").map((char, i) =>
      Math.random() < 0.2 ? String.fromCharCode(33 + Math.random() * 94) : char
    ).join("");
  }, 200);

  // Stop the interval when the component is destroyed
  // return clearInterval(corruptInterval);

  onDestroy(() => clearInterval(corruptInterval));

  // Update the corrupted text every so often
</script>

<span class="corrupted">{corruptedText}</span>

<style>
  .corrupted {
    display: inline-block;
    font-family: monospace;
    /* animation: glitch 0.3s infinite; jiggle if we want it */
    color: var(--primary-color);
  }

  

  /* Basic "jitter" effect to add to the glitch */
  @keyframes glitch {
    0% {
      transform: translate(0, 0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(2px, -2px);
    }
    60% {
      transform: translate(-1px, 1px);
    }
    80% {
      transform: translate(1px, -1px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
</style>
