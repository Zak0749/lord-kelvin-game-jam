<script lang="ts">
  import { onMount } from "svelte";
  import {
    combineElements,
    discoveredElements,
    get_element,
    placedElements,
    spawn_element,
    tool_bar_edge,
    toolbar_element_positioned,
    type PositionedElement,
    type SpawnedElement,
  } from "./element.svelte";

  onMount(() => {
    let frame: number;

    function render() {
      frame = requestAnimationFrame(render);

      if (ctx && canvas) {
        const width = canvas.width - 2 * tool_bar_edge;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        const spacing = 20;

        let num_x = Math.round(width / 20);
        let num_y = Math.round(height / 20);

        for (let i = 1; i < num_x; i++) {
          for (let j = 1; j < num_y; j++) {
            let x = 2 * tool_bar_edge + i * spacing;
            let y = j * spacing;

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2, true);
            ctx.fillStyle = "grey";
            ctx.fill();
          }
        }

        placedElements.forEach(drawElement);

        discoveredElements.map(toolbar_element_positioned).forEach(drawElement);
      }
    }

    render();

    if (discoveredElements.length == 0) {
      discoveredElements.push(
      ...[
        "Fire",
        "Water",
        "Earth",
        "Air",
      ]
    );
    }

    // if (localStorage.getItem("discoveredElements") == null) {
    //   localStorage.setItem(
    //     "discoveredElements",
    //     JSON.stringify([ ])
    //   );
    // } else {
    //   discoveredElements.push(
    //     JSON.parse(localStorage.getItem("discoveredElements")!)
    //   );
    // }

    // localStorage.setItem(
    //   "discoveredElements",
    //   JSON.stringify(discoveredElements)
    // );

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  let canvas = $state<HTMLCanvasElement>();
  let ctx = $derived(canvas?.getContext("2d"));

  let container = $state<HTMLElement>();

  function drawElement(element: PositionedElement) {
    if (!ctx) return;

    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "12px Pixelify Sans";
    ctx.fillText(element.name, element.x, element.y + 35);
  }

  function isMouseOverElement(
    event: MouseEvent,
    element: PositionedElement
  ): boolean {
    if (!ctx || !canvas) return false;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const elementX = element.x;
    const elementY = element.y;
    const elementWidth = 20;
    const elementHeight = 20;

    return (
      x >= elementX &&
      x <= elementX + elementWidth &&
      y >= elementY &&
      y <= elementY + elementHeight
    );
  }

  function pickUpElement(event: MouseEvent) {
    if (!ctx || !canvas) return;

    discoveredElements
      .map(toolbar_element_positioned)
      .filter((element) => isMouseOverElement(event, element))
      .map(spawn_element)
      .forEach((element) => {
        placedElements.push(element);
      });

    placedElements
      .filter((element) => isMouseOverElement(event, element))
      .forEach((element) => {
        draggingElement = element;
      });
  }

  let draggingElement = $state<SpawnedElement>();

  function dragElement(event: MouseEvent) {
    if (draggingElement) {
      if (ctx && canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        draggingElement.x = x;
        draggingElement.y = y;
      }
    }
  }

  function dropElement(event: MouseEvent) {
    if (!draggingElement) return;

    if (draggingElement.x < 2 * tool_bar_edge) {
      console.log("deleting element");
      let index = placedElements.findIndex(
        (el) => el.instance_id === draggingElement!.instance_id
      );
      if (index !== -1) {
        placedElements.splice(index, 1);
      }
    }

    let terminated = false;
    placedElements.forEach((element, index) => {
      if (
        !terminated &&
        element.instance_id != draggingElement!.instance_id &&
        isMouseOverElement(event, element)
      ) {
        let index = placedElements.findIndex(
          (el) => el.instance_id === draggingElement!.instance_id
        );
        if (index !== -1) {
          placedElements.splice(index, 1);
        }

        index = placedElements.findIndex(
          (el) => el.instance_id === element.instance_id
        );
        if (index !== -1) {
          placedElements.splice(index, 1);
        }

        placedElements.push(
          spawn_element({
            ...get_element(
              combineElements(element.name, draggingElement!.name)
            ),
            x: draggingElement!.x,
            y: draggingElement!.y,
          })
        );

        terminated = true;
      }
    });

    draggingElement = undefined;
  }
</script>

<section bind:this={container}>
  <canvas
    bind:this={canvas}
    height={window.innerHeight}
    width={window.innerWidth}
    onmousedown={pickUpElement}
    onmousemove={dragElement}
    onmouseup={dropElement}
  >
  </canvas>
</section>

<style>
  section {
    width: 100vw;
    height: 100%;
  }
</style>
