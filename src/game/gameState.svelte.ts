import { appState } from "../appState.svelte";
import {
  staring_ingredients,
  combinations,
  ingredients,
  machines,
  scenarios,
} from "../assets/gameData.json";
import { options } from "../options/options.svelte";

export type GameElement = {
  name: string;
  fileName: string;
  color: string;
};

type ElementId = string;

export type SpawnedElement = GameElement & {
  instance_id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DraggedElement = SpawnedElement & {
  offsetX: number;
  offsetY: number;
};

export type PlacedMachine = {
  name: string;
  color: string;
  rect: DOMRect;
  fileName: string;
};

type dict = { [key: string]: any };

export type Scenario = {
  name: string;
  description: string;
  color: string;
  fileName: string;
  expected: ElementId;
  correctDescription: string;
  wrongDescription: string;
};

const messageList = [
  "You are a aspiring chemist but in order to get into the galactic renowned glasgow university, ran by Lord Kelvin, you are volunteering with a local maker charity to get experience - your boss is off today so it's just you",
  null,
  "Oh no! Looks parts of the message was corrupted, that hasn't happened before, you will need to try to work out the correct combination.",
  null,
  null,
  null,
  null,
  null,
  null,
  "OMG it's Lord Kelvin he is in charge of Glasgow University!!!! Maybe if you impress him he will help your application"
];

function reset(): undefined {
  alert("Woah somthing sus happening here, resetting the game");
  localStorage.clear();
  location.reload();
}

class GameState {
  showInstructions = $state(true);
  discoveredElementsIds = $state<ElementId[]>(staring_ingredients);
  placedElements = $state<SpawnedElement[]>([]);
  draggingElement = $state<DraggedElement>();
  closeDoorAnimation = $state(false);

  discoveredElements = $derived(
    this.discoveredElementsIds
      .map(get_element)
      .map((element) => {
        if (!element) {
          reset() as unknown as Element;
        } else {
          return element!;
        }
      })
      .map((e) => e!)
  );
  scenarioReached = $state(0);

  popup = $state({
    show: false,
    message: "",
  });

  constructor() {
    let storedDiscoveredElements = localStorage.getItem("discoveredElements");
    if (storedDiscoveredElements) {
      this.discoveredElementsIds = JSON.parse(storedDiscoveredElements);
    }

    let storedScenarioReached = localStorage.getItem("scenarioReached");
    if (storedScenarioReached) {
      this.scenarioReached = parseInt(storedScenarioReached);
    }

    $effect.root(() => {
      $effect(() => {
        localStorage.setItem(
          "discoveredElements",
          JSON.stringify(this.discoveredElementsIds)
        );
      });

      $effect(() => {
        localStorage.setItem(
          "scenarioReached",
          this.scenarioReached.toString()
        );
      });
    });
  }

  machines = $state<PlacedMachine[]>(
    Object.values(machines).map((machine) => ({
      ...machine,
      rect: new DOMRect(),
    }))
  );

  #scenarioIndex = $state(0);

  showResults = $state<"correct" | "error" | "none">();

  get scenarioIndex() {
    return this.#scenarioIndex;
  }

  set scenarioIndex(index: number) {
    if (index > this.scenarioReached) {
      this.scenarioReached = index;
    }

    if (index >= scenarios.length) {
      appState.gameState = "menu";
      return;
    }

    if (messageList[index]) {
      this.popup.show = true;
      this.popup.message = messageList[index];
    }

    this.#scenarioIndex = index;
  }

  scenario = $derived<Scenario>(scenarios[this.#scenarioIndex]);
}

export let gameState = new GameState();

function searchMaps(
  element1: ElementId,
  element2: ElementId
): ElementId | undefined {
  let newElement = (combinations as dict)[`${element1}:${element2}`];
  if (newElement) {
    return newElement;
  } else {
    newElement = (combinations as dict)[`${element2}:${element1}`];
    if (newElement) {
      return newElement;
    } else {
      return undefined;
    }
  }
}

export function get_element(element: ElementId): GameElement {
  return (ingredients as { [key: string]: GameElement })[element];
}

export function combineElements(
  element1: ElementId,
  element2: ElementId
): ElementId {
  let newElement = searchMaps(element1, element2);

  if (newElement) {
    if (
      !gameState.discoveredElementsIds.some((element) => element === newElement)
    ) {
      gameState.discoveredElementsIds.push(newElement);
    }
    return newElement;
  } else {
    return "Junk";
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

export function spawn_element(
  element: GameElement & { x: number; y: number }
): SpawnedElement {
  let id = Math.floor(Math.random() * 1000000);
  while (
    gameState.placedElements.some((element) => element.instance_id === id)
  ) {
    id = Math.floor(Math.random() * 1000000);
  }

  return { ...element, instance_id: id, width: 100, height: 100 };
}

export function machineProcess(
  machine: PlacedMachine,
  element: SpawnedElement
): ElementId | undefined {
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
