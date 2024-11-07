import type { SpawnedElement } from "./gameState.svelte";

export function mouse_in_rect(rect: DOMRect, mouse_event: MouseEvent): boolean {
  return (
    mouse_event.clientX >= rect.left &&
    mouse_event.clientX <= rect.right &&
    mouse_event.clientY >= rect.top &&
    mouse_event.clientY <= rect.bottom
  );
}

export function mouse_in_box(
  element: SpawnedElement,
  mouse_event: MouseEvent
): boolean {
  console.log(
    mouse_event.clientX >= element.x &&
    mouse_event.clientX <= element.x + element.width &&
    mouse_event.clientY >= element.y &&
    mouse_event.clientY <= element.y + element.height
  )

  console.log(mouse_event.clientX, element.x, element.x + element.width, mouse_event.clientY, element.y, element.y + element.height)

  console.log(mouse_event.clientX >= element.x, mouse_event.clientX <= element.x + element.width, mouse_event.clientY >= element.y, mouse_event.clientY <= element.y + element.height)
  return (
    mouse_event.clientX >= element.x &&
    mouse_event.clientX <= element.x + element.width &&
    mouse_event.clientY >= element.y &&
    mouse_event.clientY <= element.y + element.height
  );
}
