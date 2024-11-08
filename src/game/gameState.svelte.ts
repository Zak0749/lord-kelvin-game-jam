import { staring_ingredients, combinations, ingredients, machines } from '../assets/elements.json'


export type GameElement = {
  name: string;
  color: string;
};

type ElementId = string;

export type SpawnedElement = GameElement & { instance_id: number, x: number; y: number; width: number; height: number };

export type DraggedElement = SpawnedElement & { offsetX: number, offsetY: number }

export type PlacedMachine = {
  name: string;
  color: string;
  rect: DOMRect
}


class GameState {
  private _showInstructions = $state(true);
  private _discoveredElementsIds = $state<ElementId[]>(staring_ingredients);
  private _placedElements = $state<SpawnedElement[]>([]);
  private _draggingElement = $state<DraggedElement>();
  private _machines = $state<PlacedMachine[]>(Object.values(machines).map((machine) => ({ ...machine, rect: new DOMRect() })));

  get machines() {
    return this._machines;
  }

  set machines(value: PlacedMachine[]) {
    this._machines = value;
  }

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

  set draggingElement(value: DraggedElement | undefined) { 
    this._draggingElement = value;
  }
}

export let gameState = new GameState();

function searchMaps(element1: ElementId, element2: ElementId): ElementId | undefined {
    let newElement = (combinations as {[key: string] : string})[`${element1}:${element2}`];
    if (newElement) {
        return newElement;
    } else {
        newElement = (combinations as {[key: string] : string})[`${element2}:${element1}`]
        if (newElement) {
            return newElement;
        } else {
            return undefined;
        }
    }
}

export function get_element(element: ElementId): GameElement {
    return (ingredients as {[key: string] : GameElement})[element];
}

export function combineElements(element1: ElementId, element2: ElementId): ElementId {
    let newElement = searchMaps(element1, element2);

    if (newElement) {
        if (!gameState.discoveredElementsIds.some((element) => element === newElement)) {
            gameState.discoveredElementsIds.push(newElement);
        }

        return newElement;
    } else {
        return 'Junk';
    }
}

export function spawn_element(element: GameElement & {x : number, y: number}): SpawnedElement {
    let id = Math.floor(Math.random() * 1000000);
    while (gameState.placedElements.some((element) => element.instance_id === id)) {
        id = Math.floor(Math.random() * 1000000);
    }

    return { ...element, instance_id: id, width: 100, height: 100 };
}

type dict = { [key: string]: any };

export function machineProcess(machine: PlacedMachine, element: SpawnedElement): ElementId | undefined {
  let m = (machines as dict)[machine.name].actions;
  console.log(m);

  console.log(m[element.name])
  
  if (m[element.name]) {
    if (!gameState.discoveredElementsIds.some((element) => element === m)) {
      gameState.discoveredElementsIds.push(m);
  }

    return m[element.name] as ElementId;
  } else {
    return undefined;
  }
}