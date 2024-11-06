
export type GameElement = {
    name: string;
    color: string;
};

type ElementId = string;

export type PositionedElement = GameElement & { x: number; y: number; };

export type SpawnedElement = PositionedElement & { instance_id: number; };

export let discoveredElements = $state<ElementId[]>([]);
export let placedElements = $state<SpawnedElement[]>([]);

const elementInfo: { [key: ElementId]: GameElement } = {
    'Fire': { name: 'Fire', color: 'red' },
    'Water': { name: 'Water', color: 'blue' },
    'Earth': { name: 'Earth', color: 'brown' },
    'Air': { name: 'Air', color: 'white' },
    'Steam': { name: 'Steam', color: 'lightgray' },
    'Lava': { name: 'Lava', color: 'orange' },
    'Lightning': { name: 'Lightning', color: 'yellow' },
    'Mud': { name: 'Mud', color: 'darkbrown' },
    'Ice': { name: 'Ice', color: 'lightblue' },
    'Dust': { name: 'Dust', color: 'tan' },
    'Geyser': { name: 'Geyser', color: 'gray' },
    'Cloud': { name: 'Cloud', color: 'lightgray' },
    'Rain': { name: 'Rain', color: 'blue' },
    'Wind': { name: 'Wind', color: 'lightgray' },
    'Obsidian': { name: 'Obsidian', color: 'black' },
    'Ash': { name: 'Ash', color: 'gray' },
    'Glacier': { name: 'Glacier', color: 'white' },
    'Hail': { name: 'Hail', color: 'white' },
    'Junk': { name: 'Junk', color: 'gray' },
}

const combineMap: { [key: string]: ElementId } = {
    'Fire:Water': 'Steam',
    'Fire:Earth': 'Lava',
    'Fire:Air': 'Lightning',
    'Water:Earth': 'Mud',
    'Water:Air': 'Ice',
    'Earth:Air': 'Dust',
    'Steam:Earth': 'Geyser',
    'Steam:Air': 'Cloud',
    'Steam:Water': 'Cloud',
    'Cloud:Water': 'Rain',
    'Cloud:Air': 'Rain',
    'Rain:Earth': 'Mud',
    'Rain:Fire': 'Mud',
    'Rain:Lava': 'Obsidian',
    'Rain:Steam': 'Obsidian',
    'Rain:Water': 'Hail',
    'Rain:Ice': 'Hail',
    'Rain:Air': 'Hail',
    'Rain:Wind': 'Hail',
    'Rain:Cloud': 'Hail',
    'Rain:Hail': 'Glacier',
    'Rain:Glacier': 'Glacier',
    'Rain:Obsidian': 'Obsidian',
    'Rain:Ash': 'Obsidian',
    'Rain:Dust': 'Obsidian',
    'Rain:Geyser': 'Obsidian',
    'Rain:Lightning': 'Obsidian',
    'Rain:Mud': 'Obsidian'
};



function searchMaps(element1: ElementId, element2: ElementId): ElementId | undefined {
    let newElement = combineMap[`${element1}:${element2}`];
    if (newElement) {
        return newElement;
    } else {
        newElement = combineMap[`${element2}:${element1}`]
        if (newElement) {
            return newElement;
        } else {
            return undefined;
        }
    }
}

export function get_element(element: ElementId): GameElement {
    return elementInfo[element];
}

export function combineElements(element1: ElementId, element2: ElementId): ElementId {
    let newElement = searchMaps(element1, element2);

    if (newElement) {
        if (newElement != 'Junk' && !discoveredElements.some((element) => element === newElement)) {
            discoveredElements.push(newElement);
        }

        return newElement;
    } else {
        return 'Junk';
    }
}

export const tool_bar_start = 350;
export const tool_bar_gap = 50;
export const tool_bar_edge = 50;

export function toolbar_element_positioned(element: ElementId, index: number): PositionedElement {
    return { ...get_element(element), x: tool_bar_edge, y: tool_bar_start + tool_bar_gap * index };
}

export function spawn_element(element: PositionedElement): SpawnedElement {
    let id = Math.floor(Math.random() * 1000000);
    while (placedElements.some((element) => element.instance_id === id)) {
        id = Math.floor(Math.random() * 1000000);
    }

    return { ...element, instance_id: id };
}