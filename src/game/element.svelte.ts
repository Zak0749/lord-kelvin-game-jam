import { appState } from "../appState.svelte";
import { gameState } from "./gameState.svelte";

export type GameElement = {
    name: string;
    color: string;
};

type ElementId = string;

export type PositionedElement = GameElement & { x: number; y: number; };

export type SpawnedElement = PositionedElement & { instance_id: number; };


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
    'Sand': { name: 'Sand', color: 'yellow' },
    'Clay': { name: 'Clay', color: 'red' },
    'Metal': { name: 'Metal', color: 'silver' },
    'Electricity': { name: 'Electricity', color: 'blue' },
    'Smoke': { name: 'Smoke', color: 'gray' },
    'Fog': { name: 'Fog', color: 'lightgray' },
    'Storm': { name: 'Storm', color: 'darkgray' },
    'Snow': { name: 'Snow', color: 'white' },
    'Magma': { name: 'Magma', color: 'red' },
    'Crystal': { name: 'Crystal', color: 'transparent' },
    'Shadow': { name: 'Shadow', color: 'black' },
    'Light': { name: 'Light', color: 'yellow' },
    'Energy': { name: 'Energy', color: 'purple' },
    'Plasma': { name: 'Plasma', color: 'pink' },
    'Void': { name: 'Void', color: 'black' },
    'Radiation': { name: 'Radiation', color: 'green' },
    'Tornado': { name: 'Tornado', color: 'gray' },
    'Hurricane': { name: 'Hurricane', color: 'darkblue' },
    'Blizzard': { name: 'Blizzard', color: 'white' }
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
    'Rain:Mud': 'Obsidian',
    'Rain:Clay': 'Mud',
    'Rain:Metal': 'Rust',
    'Rain:Electricity': 'Storm',
    'Rain:Smoke': 'Fog',
    'Rain:Fog': 'Storm',
    'Rain:Storm': 'Hurricane',
    'Rain:Snow': 'Blizzard',
    'Rain:Magma': 'Obsidian',
    'Rain:Crystal': 'Obsidian',
    'Rain:Shadow': 'Obsidian',
    'Rain:Light': 'Rainbow',
    'Rain:Energy': 'Storm',
    'Rain:Plasma': 'Storm',
    'Rain:Void': 'Obsidian',
    'Rain:Radiation': 'ToxicRain',
    'Rain:Tornado': 'Hurricane',
    'Rain:Hurricane': 'Superstorm',
    'Rain:Blizzard': 'Superstorm',
    'Fire:Ice': 'Steam',
    'Fire:Metal': 'MoltenMetal',
    'Fire:Electricity': 'Plasma',
    'Fire:Smoke': 'Ash',
    'Fire:Storm': 'Lightning',
    'Fire:Snow': 'Water',
    'Fire:Magma': 'Lava',
    'Fire:Crystal': 'MoltenCrystal',
    'Fire:Shadow': 'Light',
    'Fire:Light': 'Energy',
    'Fire:Energy': 'Plasma',
    'Fire:Plasma': 'Energy',
    'Fire:Void': 'Energy',
    'Fire:Radiation': 'Plasma',
    'Fire:Tornado': 'Firestorm',
    'Fire:Hurricane': 'Firestorm',
    'Fire:Blizzard': 'Water',
    'Water:Ice': 'Iceberg',
    'Water:Metal': 'Rust',
    'Water:Electricity': 'Storm',
    'Water:Smoke': 'Fog',
    'Water:Storm': 'Hurricane',
    'Water:Snow': 'Ice',
    'Water:Magma': 'Obsidian',
    'Water:Crystal': 'Ice',
    'Water:Shadow': 'Fog',
    'Water:Light': 'Rainbow',
    'Water:Energy': 'Storm',
    'Water:Plasma': 'Storm',
    'Water:Void': 'Fog',
    'Water:Radiation': 'ToxicWater',
    'Water:Tornado': 'Hurricane',
    'Water:Hurricane': 'Superstorm',
    'Water:Blizzard': 'Superstorm',
    'Earth:Ice': 'Glacier',
    'Earth:Metal': 'Ore',
    'Earth:Electricity': 'Magnet',
    'Earth:Smoke': 'Ash',
    'Earth:Storm': 'Mudslide',
    'Earth:Snow': 'Snowman',
    'Earth:Magma': 'Volcano',
    'Earth:Crystal': 'Gem',
    'Earth:Shadow': 'Cave',
    'Earth:Light': 'Crystal',
    'Earth:Energy': 'Crystal',
    'Earth:Plasma': 'Crystal',
    'Earth:Void': 'Cave',
    'Earth:Radiation': 'ToxicWaste',
    'Earth:Tornado': 'DustDevil',
    'Earth:Hurricane': 'Mudslide',
    'Earth:Blizzard': 'Avalanche',
    'Air:Ice': 'Hail',
    'Air:Metal': 'Rust',
    'Air:Electricity': 'Lightning',
    'Air:Smoke': 'Fog',
    'Air:Storm': 'Tornado',
    'Air:Snow': 'Blizzard',
    'Air:Magma': 'Ash',
    'Air:Crystal': 'Dust',
    'Air:Shadow': 'Fog',
    'Air:Light': 'Rainbow',
    'Air:Energy': 'Lightning',
    'Air:Plasma': 'Lightning',
    'Air:Void': 'Fog',
    'Air:Radiation': 'ToxicAir',
    'Air:Tornado': 'SuperTornado',
    'Air:Hurricane': 'SuperTornado',
    'Air:Blizzard': 'SuperBlizzard'
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
        if (newElement != 'Junk' && !gameState.discoveredElementsIds.some((element) => element === newElement)) {
            gameState.discoveredElementsIds.push(newElement);
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
    while (gameState.placedElements.some((element) => element.instance_id === id)) {
        id = Math.floor(Math.random() * 1000000);
    }

    return { ...element, instance_id: id };
}