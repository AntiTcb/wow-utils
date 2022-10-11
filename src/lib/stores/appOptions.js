import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const defaultRealm = writable(
    (browser && window.localStorage.getItem('defaultRealm')) || ''
);
defaultRealm.subscribe((val) => browser && window.localStorage.setItem('defaultRealm', val));

export const defaultFaction = writable(
    (browser && window.localStorage.getItem('defaultFaction')) || ''
);
defaultFaction.subscribe((val) => browser && window.localStorage.setItem('defaultFaction', val));

export const comparisonRealm = writable(
    (browser && window.localStorage.getItem('comparisonRealm')) || ''
);
comparisonRealm.subscribe((val) => browser && window.localStorage.setItem('comparisonRealm', val));

export const comparisonFaction = writable(
    (browser && window.localStorage.getItem('comparisonFaction')) || ''
);
comparisonFaction.subscribe((val) => browser && window.localStorage.setItem('comparisonFaction', val));
