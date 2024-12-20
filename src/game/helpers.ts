import type { PlacedMachine, SpawnedElement } from "./gameState.svelte";

export function mouse_in_rect(rect: DOMRect, mouse_event: MouseEvent): boolean {
  return (
    mouse_event.clientX >= rect.left &&
    mouse_event.clientX <= rect.right &&
    mouse_event.clientY >= rect.top &&
    mouse_event.clientY <= rect.bottom
  );
}

export function mouse_in_element(
  element: HTMLElement,
  mouse_event: MouseEvent
): boolean {
  return mouse_in_rect(element.getBoundingClientRect(), mouse_event);
}

export function mouse_in_box(
  element: SpawnedElement,
  mouse_event: MouseEvent
): boolean {
  return (
    mouse_event.clientX >= element.x &&
    mouse_event.clientX <= element.x + element.width &&
    mouse_event.clientY >= element.y &&
    mouse_event.clientY <= element.y + element.height
  );
}

export function mouse_in_machine(
  machine: PlacedMachine,
  mouse_event: MouseEvent
): boolean {
  return mouse_in_rect(machine.rect, mouse_event);
}

export function center_of_element(element: HTMLElement): { x: number; y: number } {
  let rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };  
}