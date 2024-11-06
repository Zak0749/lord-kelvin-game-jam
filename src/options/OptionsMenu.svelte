<script>
  import { appState } from "../appState.svelte";
</script>

<section>
  <ul>
    <div>options menu</div>

    <h2>Credits</h2>
    <p>Game made by Lord Kelvin Fan Club</p>
    <p>Music - EMIL</p>
    <p>Music - EMIL</p>
    <p>Music - EMIL</p>
    <p>Music - EMIL</p>


    <button onclick={() => (appState.optionsMenuOpen = false)}> Close </button>
  </ul>
</section>

<style>
  ul {
    max-width: 500px;
    height: 90vh;
    width: 80vw;
    background-color: transparent; /* Transparent background */
    color: #ffffff; /* Text color */
    padding: 12px 24px; /* Button padding */
    border: 2px solid #00ffff; /* Initial border color */
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
