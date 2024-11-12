import { Sound } from 'svelte-sound';
import { options } from './options/options.svelte';
import buttonSound from './assets/sounds/button-click.mp3';
import heaterSound from './assets/sounds/heater.mp3';
// import grinderSound from './assets/sounds/grinder.mp3';
import extractorSound from './assets/sounds/extractor.mp3';
import sendOffSound from './assets/sounds/send-off.mp3';

export const buttonClick = new Sound(buttonSound, {
  volume: options.calculated_sfx_volume,
});

export function createSound(src: string) {
  return new Sound(src, {
    volume: options.calculated_sfx_volume,
  });
}


export const useExtractor = createSound(extractorSound);
export const useHeater = createSound(heaterSound);
export const useGrinder = createSound(heaterSound);
export const sendOff = createSound(sendOffSound);