import { appState } from '../appState.svelte';
import { staring_ingredients, combinations, ingredients, machines, scenarios } from '../assets/elements.json'


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

type dict = { [key: string]: any };

export type Scenario = {
  name: string;
  description: string;
  color: string;
  expected: ElementId;
  correctDescription: string;
  wrongDescription: string;
}

class GameState {
  showInstructions = $state(true);
  discoveredElementsIds = $state<ElementId[]>(staring_ingredients);
  placedElements = $state<SpawnedElement[]>([]);
  draggingElement = $state<DraggedElement>();


  discoveredElements = $derived(this.discoveredElementsIds.map(get_element))
  scenarioReached = $state(0)

  constructor() {
    let storedDiscoveredElements = localStorage.getItem('discoveredElements');
    if (storedDiscoveredElements) {
      this.discoveredElementsIds = JSON.parse(storedDiscoveredElements);
    }

    let storedScenarioReached = localStorage.getItem('scenarioReached');
    if (storedScenarioReached) {
      this.scenarioReached = parseInt(storedScenarioReached);
    }

    $effect.root(() => {
      $effect(() => {
        localStorage.setItem('discoveredElements', JSON.stringify(this.discoveredElementsIds));
      })

      $effect(() => {
        localStorage.setItem('scenarioReached', this.scenarioReached.toString());
      })
    })
  }
  
  
  machines = $state<PlacedMachine[]>(Object.values(machines).map((machine) => ({ ...machine, rect: new DOMRect() })));

  #scenarioIndex = $state(0);

  showResults = $state<'correct' | 'error' | 'none'>();


  get scenarioIndex() {
    return this.#scenarioIndex;
  }

  set scenarioIndex(index: number) {
    if (index > this.scenarioReached) {
      this.scenarioReached = index;
    }

    if (index >= scenarios.length) {
      appState.gameState = "menu";
      return
    }

    this.#scenarioIndex = index;
  }

  scenario = $derived<Scenario>(scenarios[this.#scenarioIndex]);
}

export let gameState = new GameState();

function searchMaps(element1: ElementId, element2: ElementId): ElementId | undefined {
    let newElement = (combinations as dict)[`${element1}:${element2}`];
    if (newElement) {
        return newElement;
    } else {
        newElement = (combinations as dict)[`${element2}:${element1}`]
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

export function removeInstance(instance_id: number) {
  let index = gameState.placedElements.findIndex(
    (element) => element.instance_id === instance_id
  );
  if (index !== -1) {
    gameState.placedElements.splice(index, 1);
  }
}

export function spawn_element(element: GameElement & {x : number, y: number}): SpawnedElement {
    let id = Math.floor(Math.random() * 1000000);
    while (gameState.placedElements.some((element) => element.instance_id === id)) {
        id = Math.floor(Math.random() * 1000000);
    }

    return { ...element, instance_id: id, width: 100, height: 100 };
}


export function machineProcess(machine: PlacedMachine, element: SpawnedElement): ElementId | undefined {
  let m = (machines as dict)[machine.name].actions;
  
  if (m[element.name]) {
    if (!gameState.discoveredElementsIds.some((e) => e === m[element.name])) {
      gameState.discoveredElementsIds.push(m[element.name]);
  }
    return m[element.name] as ElementId;
  } else {
    return undefined;
  }
}