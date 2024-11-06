import { get_element } from "./element.svelte";

export type GameElement = {
  name: string;
  color: string;
};

type ElementId = string;

export type PositionedElement = GameElement & { x: number; y: number };

export type SpawnedElement = PositionedElement & { instance_id: number };

class GameState {
  private _showInstructions = $state(true);
  private _discoveredElementsIds = $state<ElementId[]>([
    "Fire",
    "Water",
    "Earth",
    "Air",
  ]);
  private _placedElements = $state<SpawnedElement[]>([]);
  private _draggingElement = $state<SpawnedElement>();

  get showInstructions() {
    return this._showInstructions;
  }

  set showInstructions(value: boolean) {
    this._showInstructions = value;
  }

  get discoveredElementsIds() {
    return this._discoveredElementsIds;
  }

  get discoveredElements() {
    return this._discoveredElementsIds.map((element) => get_element(element));
  }

  set discoveredElementsIds(value: ElementId[]) {
    this._discoveredElementsIds = value;
  }

  get placedElements() {
    return this._placedElements;
  }

  set placedElements(value: SpawnedElement[]) {
    this._placedElements = value;
  }

  get draggingElement() {
    return this._draggingElement;
  }

  set draggingElement(value: SpawnedElement | undefined) { 
    this._draggingElement = value;
  }
}

export let gameState = new GameState();
