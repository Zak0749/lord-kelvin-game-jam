class GameUI {
  mergeGrid = $state<HTMLElement | undefined>();
  elementsTray = $state<HTMLElement | undefined>();
  instructions = $state<HTMLElement | undefined>();
  submitArea = $state<HTMLElement | undefined>();
}

export let gameUI = new GameUI();