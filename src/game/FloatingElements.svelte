<script lang="ts">
  import {
    combineElements,
    get_element,
    spawn_element,
  } from "./element.svelte";
  import ElementCard from "./ElementCard.svelte";
  import { gameState, type SpawnedElement } from "./gameState.svelte";

  // function moveDraggingElements(event: MouseEvent) {
  //   console.log("dragging element", gameState.draggingElement);
  //   gameState.placedElements
  //     .filter((element) => element.instance_id == gameState.draggingElement)
  //     .forEach((element) => {
  //       element.x = event.clientX;
  //       element.y = event.clientY;
  //     });
  // }

  let { elementsTray }: { elementsTray: HTMLElement | undefined } = $props();

  const width = 50;
  const height = 50;

  function letGoOfElement(event: MouseEvent) {
    // of mouse is in the elements Tray
    if (elementsTray) {
      if (
        event.clientX >= elementsTray.getBoundingClientRect().left &&
        event.clientX <= elementsTray.getBoundingClientRect().right &&
        event.clientY >= elementsTray.getBoundingClientRect().top &&
        event.clientY <= elementsTray.getBoundingClientRect().bottom
      ) {
        let index = gameState.placedElements.findIndex(
          (el) => el.instance_id === gameState.draggingElement!.instance_id
        );
        if (index !== -1) {
          gameState.placedElements.splice(index, 1);
        }
      }
    }


    const elementUnderMouse = gameState.placedElements.find(
      (element) =>
        event.clientX >= element.x &&
        event.clientX <= element.x + width &&
        event.clientY >= element.y &&
        event.clientY <= element.y + height &&
        element.instance_id !== gameState.draggingElement!.instance_id
    );


    
    if (elementUnderMouse) {
      let index = gameState.placedElements.findIndex(
        (el) => el.instance_id === gameState.draggingElement!.instance_id
      );
      if (index !== -1) {
        gameState.placedElements.splice(index, 1);
      }

      index = gameState.placedElements.findIndex(
        (el) => el.instance_id === elementUnderMouse.instance_id
      );
      if (index !== -1) {
        gameState.placedElements.splice(index, 1);
      }

      gameState.placedElements.push(
        spawn_element({
          ...get_element(
            combineElements(
              elementUnderMouse.name,
              gameState.draggingElement!.name
            )
          ),
          x: gameState.draggingElement!.x,
          y: gameState.draggingElement!.y,
        })
      );
    }

    gameState.draggingElement = undefined;
  }

  function dragElement(element: SpawnedElement) {
    gameState.draggingElement = element;
  }

  export function moveElement(event: MouseEvent) {
    if (gameState.draggingElement) {
      gameState.draggingElement.x = event.clientX - 10;
      gameState.draggingElement.y = event.clientY - 10;
    }
  }

  window.onmousemove = moveElement;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#each gameState.placedElements as element}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <div
    class="floating-element"
    style="left: {element.x}px; top: {element.y}px"
    id={element.instance_id.toString()}
    onmousedowncapture={() => dragElement(element)}
    onmouseupcapture={letGoOfElement}
  >
    <ElementCard {...element} />
  </div>
{/each}

<style>
  /* .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  } */

  .floating-element {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
</style>
