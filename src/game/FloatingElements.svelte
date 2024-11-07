<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import {
    gameState,
    type DraggedElement,
    type SpawnedElement,
    combineElements,
    get_element,
    spawn_element,
  } from "./gameState.svelte";
  import { mouse_in_box, mouse_in_rect } from "./helpers";

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

  function letGoOfElement(event: MouseEvent) {
    console.log(event);
    // of mouse is in the elements Tray
    if (elementsTray) {
      if (mouse_in_rect(elementsTray.getBoundingClientRect(), event)) {
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
        element.instance_id !== gameState.draggingElement!.instance_id &&
        mouse_in_box(element, event)
    );

    // mouse
    console.log(elementUnderMouse);
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

      const combine = get_element(combineElements(
              elementUnderMouse.name,
              gameState.draggingElement!.name
            ))

      gameState.placedElements.push(
        spawn_element({
          ...combine,
          x: gameState.draggingElement!.x,
          y: gameState.draggingElement!.y,
        })
      );
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
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#each gameState.placedElements as element}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <div
    class="floating-element"
    style="left: {element.x}px; top: {element.y}px"
    id={element.instance_id.toString()}
    onmousedowncapture={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      dragElement(element, offsetX, offsetY);
    }}
    onmouseupcapture={letGoOfElement}
  >
    <ElementCard {element} />
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
