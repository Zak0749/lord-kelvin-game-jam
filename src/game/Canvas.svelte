<script lang="ts">
  import { untrack } from "svelte";

  let canvas = $state<HTMLCanvasElement>();
  let ctx = $derived(canvas?.getContext("2d"));

  let container = $state<HTMLElement>();

  type Element = {
    name: string;
    x: number;
    y: number;
  };

  type RealElement = Element & { id: number };

  let discoveredElements = $state<Element[]>([
    { name: "Fire", x: 20, y: 20 },
    { name: "Water", x: 20, y: 70 },
    { name: "Earth", x: 20, y: 120 },
    { name: "Air", x: 20, y: 170 },
  ]);

  let placedElements = $state<RealElement[]>([]);

  // renders the canvas
  $effect(() => {
    if (ctx && canvas) {
    
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      const spacing = 20;

      let num_x = Math.round(width / 20);
      let num_y = Math.round(height / 20);

      for (let i = 1; i < num_x; i++) {
        for (let j = 1; j < num_y; j++) {
          let x = i * spacing;
          let y = j * spacing;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2, true);
          ctx.fillStyle = "grey";
          ctx.fill();
        }
      }

      [...placedElements, ...discoveredElements].forEach((element, index) => {
        drawElement(element);
      });
    }
  });

  function gen_id() {
    let id = Math.floor(Math.random() * 1000000)
    while (placedElements.some((element) => element.id === id)) {
      id = Math.floor(Math.random() * 1000000)
    }

    return id

  }

  function drawElement(element: Element) {
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(element.x, element.y, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(element.name, element.x, element.y + 35);
  }

  function onmousedown(event: MouseEvent) {
    if (canvas) {
      discoveredElements.forEach((element) => {
        if (mouseOverElement(event, element)) {
            placedElements.push({...element, id: gen_id()});
        }
      });

      placedElements.forEach((element, index) => {
        if (mouseOverElement(event, element)) {
          draggingElement = element;
        }
      });
    }
  }

  let draggingElement = $state<RealElement>();

  function onmousemove(event: MouseEvent) {
    if (draggingElement ) {
        if (ctx && canvas) {

          const rect = canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          draggingElement.x = x;
          draggingElement.y = y;
        }
    }
  }

  function mouseOverElement(event: MouseEvent, element: Element): boolean {
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const elementX = element.x;
      const elementY = element.y;
      const elementWidth = 20;
      const elementHeight = 20;

      return x >= elementX &&
        x <= elementX + elementWidth &&
        y >= elementY &&
        y <= elementY + elementHeight
    } else {
        return false;
    }
  }

  function onmouseup(event: MouseEvent) {
    if (draggingElement) {
        let terminated = false;
        placedElements.forEach((element, index) => {
            if (!terminated && element.id != draggingElement!.id && mouseOverElement(event, element)) {
                placedElements = placedElements.filter((v) => v.id !== draggingElement!.id && v.id !== element.id);
                placedElements.push({...element, name: `${draggingElement!.name} + ${element.name}`});
                terminated = true;
            }
      });
    }

    draggingElement = undefined;
  }
</script>

<section bind:this={container}>
  <canvas
    bind:this={canvas}
    height={window.innerHeight}
    width={window.innerWidth}
    {onmousedown}
    {onmousemove}
    {onmouseup}
  >
  </canvas>
</section>

<style>
  section {
    width: 100vw;
    height: 100%;
  }
</style>
