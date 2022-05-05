<script>
    import { servers } from '$lib/stores/servers';
    import { Select, SelectItem } from 'carbon-components-svelte';

    export let labelText = 'Realm';
    export let selected = '';
    export let serverFilter = (server) => true;
</script>

<Select size="sm" bind:labelText bind:selected on:change {...$$restProps}>
    <SelectItem value="" text="" />
    {#each $servers.filter(serverFilter) as server}
        <SelectItem class="is-capitalized" value={server.slug} text="{server.name} ({server.region})" />
    {/each}
</Select>
