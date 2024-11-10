<script>
  import { appState } from "../appState.svelte";
  import { options } from './options.svelte'

  function reset_progress() {
    localStorage.clear();
    location.reload();
  }
</script>

<section>
  <ul>
    <section>
      
      <div>
        Main Volume: <input type="range" min="0" max="1" step="0.05" bind:value="{options.main_volume}" class="slider" />
      </div>

      <div>
        Music Volume: <input type="range" min="0" max="1" step="0.05" bind:value="{options.music_volume}" class="slider" />
      </div>

      <div>
        SFX Volume: <input type="range" min="0" max="1" step="0.05" bind:value="{options.sfx_volume}" class="slider" />
      </div>

      <button style="margin-top: 5rem" class="text-button" onclick={reset_progress}> Reset Progress </button>
    </section>



    <button class="text-button" onclick={() => (appState.optionsMenuOpen = false)}> Close </button>
  </ul>
</section>

<style>
  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    background: var(--primary-color);
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    height: 2rem;
    border-radius: 1rem;
    padding-left: 1rem;
    padding-right: 1rem

  }

  input[type="range"]:hover {
    opacity: 1;
  } 

  

  ul {
    max-width: 500px;
    height: 90vh;
    width: 80vw;
    background-color: transparent; /* Transparent background */
    color: #ffffff; /* Text color */
    padding: 12px 24px; /* Button padding */
    border: 2px solid var(--primary-color); /* Initial border color */
    border-radius: 8px; /* Rounded corners */
    outline: none; /* Remove outline */
    transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease; /* Smooth transition */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
