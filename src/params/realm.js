import { get } from 'svelte/store';
import { servers } from '$lib/stores/servers';

export function match(param) {
    const allRealmsPattern = `(${get(servers)
        .map((s) => s.slug)
        .join('|')})`;
    return new RegExp(allRealmsPattern).test(param);
}
