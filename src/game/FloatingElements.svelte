<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import {
    gameState,
    type DraggedElement,
    type SpawnedElement,
    combineElements,
    get_element,
    spawn_element,
    machineProcess,
  } from "./gameState.svelte";
  import { mouse_in_box, mouse_in_rect } from "./helpers";
  import Machines from "./Machines.svelte";

  let {
    elementsTray,
    mergeGrid,
  }: {
    elementsTray: HTMLElement | undefined;
    mergeGrid: HTMLElement | undefined;
  } = $props();

  function removeInstance(instance_id: number) {
    let index = gameState.placedElements.findIndex(
      (element) => element.instance_id === instance_id
    );
    if (index !== -1) {
      gameState.placedElements.splice(index, 1);
    }
  }

  function letGoOfElement(event: MouseEvent) {
    if (!gameState.draggingElement) return;

    if (
      elementsTray &&
      mouse_in_rect(elementsTray.getBoundingClientRect(), event)
    ) {
      removeInstance(gameState.draggingElement!.instance_id);
      gameState.draggingElement = undefined;
      return
    }

    gameState.machines.forEach((machine) => {
      console.log(
        "fuck u time 2",
        mouse_in_rect(machine.rect, event),
        machine.name
      );
      if (mouse_in_rect(machine.rect, event)) {
        let result = machineProcess(machine, gameState.draggingElement!);

        let rect = mergeGrid!.getBoundingClientRect();

        console.log(result);

        if (result) {
          removeInstance(gameState.draggingElement!.instance_id);

          gameState.placedElements.push(
            spawn_element({
              ...get_element(result),
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            })
          );
        } else {
          gameState.draggingElement!.x = rect.left + rect.width / 2;
          gameState.draggingElement!.y = rect.top + rect.height / 2;
        }

        gameState.draggingElement = undefined;
        return
      }
    });

    const elementUnderMouse = gameState.placedElements.find(
      (element) =>
        element.instance_id !== gameState.draggingElement!.instance_id &&
        mouse_in_box(element, event)
    );

    if (elementUnderMouse) {
      removeInstance(gameState.draggingElement!.instance_id);
      removeInstance(elementUnderMouse.instance_id);

      const combine = get_element(
        combineElements(elementUnderMouse.name, gameState.draggingElement!.name)
      );

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
