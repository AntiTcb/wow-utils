import { writable } from "svelte/store";

export const servers = writable([]);

const getAllServers = async () => {
    const url = `https://api.nexushub.co/wow-classic/v1/servers/full`;
    const res = await fetch(url);
    const data = await res.json();

    servers.set(data);
}

getAllServers();
