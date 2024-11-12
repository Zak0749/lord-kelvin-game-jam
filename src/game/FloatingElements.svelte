<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import ElementsTray from "./ElementsTray.svelte";
  import {
    gameState,
    type DraggedElement,
    type SpawnedElement,
    combineElements,
    get_element,
    spawn_element,
    machineProcess,
    removeInstance,
  } from "./gameState.svelte";
  import {
    center_of_element,
    mouse_in_box,
    mouse_in_element,
    mouse_in_rect,
  } from "./helpers";
  import { gameUI } from "./GameUI.svelte";

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function letGoOfElement(event: MouseEvent) {
    if (
      !gameState.draggingElement ||
      !gameUI.mergeGrid ||
      !gameUI.elementsTray ||
      !gameUI.submitArea
    )
      return;

    let returnToGrid = true;

    if (mouse_in_element(gameUI.elementsTray, event)) {
      removeInstance(gameState.draggingElement.instance_id);
      returnToGrid = false;
    }

    // If the element is dropped in a machine, process it
    gameState.machines
      .filter((machine) => mouse_in_rect(machine.rect, event))
      .map((machine) => machineProcess(machine, gameState.draggingElement!))
      .filter((result) => result !== undefined)
      .forEach((result) => {
        removeInstance(gameState.draggingElement!.instance_id);

        gameState.placedElements.push(
          spawn_element({
            ...get_element(result!),
            ...center_of_element(gameUI.mergeGrid!),
          })
        );

        returnToGrid = false;
      });

    const elementUnderMouse = gameState.placedElements.find(
      (element) =>
        element.instance_id !== gameState.draggingElement!.instance_id &&
        mouse_in_box(element, event)
    );

    // If the element is dropped on another element, combine them
    if (elementUnderMouse) {
      removeInstance(gameState.draggingElement!.instance_id);
      removeInstance(elementUnderMouse.instance_id);

      const combine = get_element(
        combineElements(elementUnderMouse.name, gameState.draggingElement!.name)
      );

      console.log(combine);

      if (combine) {
        gameState.placedElements.push(
          spawn_element({
            ...combine,
            x:
              gameState.draggingElement!.x +
              gameState.draggingElement!.offsetX / 2,
            y:
              gameState.draggingElement!.y +
              gameState.draggingElement!.offsetY / 2,
          })
        );
      } else {
        explodeAnimation.do = true;
        explodeAnimation.x = event.clientX;
        explodeAnimation.y = event.clientY;

        setTimeout(() => {
          explodeAnimation.do = false;
        }, 500)

      }

      returnToGrid = false;
    }

    if (mouse_in_element(gameUI.mergeGrid!, event)) {
      returnToGrid = false;
    }

    if (mouse_in_element(gameUI.submitArea, event)) {
      let element = gameState.draggingElement;
      gameState.draggingElement = undefined;
      gameState.closeDoorAnimation = true;

      await timeout(1000);

      if (element.name == gameState.scenario.expected) {
        returnToGrid = false;
        removeInstance(element.instance_id);
        gameState.showResults = "correct";
      } else {
        gameState.showResults = "error";
      }
    }

    if (returnToGrid) {
      const center = center_of_element(gameUI.mergeGrid);
      gameState.draggingElement!.x = center.x;
      gameState.draggingElement!.y = center.y;
    }

    gameState.draggingElement = undefined;
  }

  function dragElement(
    element: SpawnedElement,
    offsetX: number,
    offsetY: number
  ) {
    (element as DraggedElement).offsetX = offsetX;
    (element as DraggedElement).offsetY = offsetY;
    gameState.draggingElement = element as DraggedElement;
  }

  export function moveElement(event: MouseEvent) {
    let dragging = gameState.draggingElement;
    if (dragging) {
      dragging.x = event.clientX - dragging.offsetX;
      dragging.y = event.clientY - dragging.offsetY;
    }
  }

  window.onmousemove = moveElement;

  let explodeAnimation = $state({
    do: false,
    x: 0,
    y: 0
  });

  $inspect(explodeAnimation);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#each gameState.placedElements as element}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <div
    class="floating-element"
    style="left: {element.x}px; top: {element.y}px; z-index: {gameState.draggingElement ===
    element
      ? 5
      : 1}"
    id={element.instance_id.toString()}
    onmousedowncapture={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      dragElement(element, offsetX, offsetY);
    }}
    onclick={letGoOfElement}
  >
    <ElementCard {element} />
  </div>
{/each}

<div
  class="explode-animation"
  class:doAnimation={explodeAnimation.do}
  style="left: {explodeAnimation.x}px; top: {explodeAnimation.y}px;"
></div>

<style>
  @keyframes explode {
    0% {
      transform: scale(1);
      opacity: 1;
      box-shadow: 0 0 10px 10px rgba(255, 0, 0, 0.5);
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
      box-shadow: 0 0 20px 20px rgba(255, 165, 0, 0.5);
    }
    100% {
      transform: scale(2);
      opacity: 0;
      box-shadow: 0 0 30px 30px rgba(255, 255, 0, 0);
    }
  }

  .explode-animation {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgb(229, 136, 50);
    border-radius: 50%;
    z-index: 10;
    opacity: 0;
  }

  .explode-animation.doAnimation {
    animation: explode 0.5s forwards;
  }

  .floating-element {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
</style>
