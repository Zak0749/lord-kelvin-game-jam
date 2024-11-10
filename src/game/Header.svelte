<script lang="ts">
  import { gameState } from "./gameState.svelte";
  import { appState } from "../appState.svelte";
</script>

<header>
  <button onclick={() => (appState.gameState = "menu")} class="icon-button" aria-label="settings">
    <svg
      
      width="24px"
      height="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 11v2H8v2H6v-2H4v-2h2V9h2v2h12zM10 7H8v2h2V7zm0 0h2V5h-2v2zm0 10H8v-2h2v2zm0 0h2v2h-2v-2z"
        fill="currentColor"
      />
    </svg>
  </button>
  <button onclick={() => (appState.optionsMenuOpen = true)} class="icon-button" aria-label="back">
    <svg
      
      width="24px"
      height="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M15 1v6H9V1h6zm-2 2h-2v2h2V3zm2 6v6H9V9h6zm-2 2h-2v2h2v-2zm2 6v6H9v-6h6zm-2 2h-2v2h2v-2z"
        fill="currentColor"
      />
    </svg>
  </button>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
</style>
