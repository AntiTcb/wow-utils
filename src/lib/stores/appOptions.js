import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const defaultRealm = writable(
    (browser && window.localStorage.getItem('defaultRealm')) || ''
);
defaultRealm.subscribe((val) => browser && window.localStorage.setItem('defaultRealm', val));

export const defaultFaction = writable(
    (browser && window.localStorage.getItem('defaultFaction')) || ''
);
defaultFaction.subscribe((val) => browser && window.localStorage.setItem('defaultFaction', val));
