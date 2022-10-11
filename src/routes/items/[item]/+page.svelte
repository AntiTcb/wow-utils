

<script>
    import { onMount } from 'svelte';
    import { servers } from '$lib/stores/servers';

    export let data;
    let item = { data };

    // TODO: localstorage
    let faction = 'alliance';
    let defaultRealm = 'myzrael';

    let comparisonServers = [];

    onMount(async () => {
        console.log('Item', item);
        await getServerItemPrice(defaultRealm, faction);
    });

    const getServerItemPrice = async (realm, faction) => {
        const res = await fetch(
            `https://api.nexushub.co/wow-classic/v1/items/${realm}-${faction}/${item.uniqueName}`
        );
        const json = await res.json();

        return json;
    };

    const addTableRow = async (realm, faction) => {
        const item = await getServerItemPrice(realm, faction);

        const tableBody = document.querySelector('#item-table-body');
        const row = document.createElement('tr');

        const serverTd = document.createElement('td');

        const nexusHubLink = document.createElement('a');
        nexusHubLink.href = `https://www.nexushub.co/wow-classic/items/${realm}-${faction}/${item.uniqueName}`;
        nexusHubLink.target = '_blank';
        nexusHubLink.innerText = `${titleCase(realm)} - ${titleCase(faction)}`;

        serverTd.appendChild(nexusHubLink);
        row.appendChild(serverTd);

        const minBuyoutTd = document.createElement('td');
        minBuyoutTd.innerText = formatPrice(item.stats.current.minBuyout);
        row.appendChild(minBuyoutTd);

        const marketValueTd = document.createElement('td');
        marketValueTd.innerText = formatPrice(item.stats.current.marketValue);
        row.appendChild(marketValueTd);

        const fragment = document.createDocumentFragment();
        fragment.appendChild(row);

        tableBody.appendChild(fragment);
    };

    const formatPrice = (price = 0) => {
        const gold = Math.floor(price / 10000);
        price = price % 10000;
        const silver = Math.floor(price / 100);
        price = price % 100;
        const copper = Math.floor(price);

        return `${gold >= 1 ? `${gold}g ` : ''}${silver >= 1 ? `${silver}s ` : ''}${copper}c`;
    };

    const titleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
    };
</script>

<img src={item.icon} alt={item.name} />
<h2><a href="https://tbc.wowhead.com/item={item.itemId}" target="_blank">{item.name}</a></h2>
<h3>{item.tags.join(' / ')}</h3>

<div class="field is-horizontal is-inline-flex is-align-items-center">
    <div class="field-label"><label for="server" class="label">Realm</label></div>
    <div class="field-body mr-1">
        <div class="field">
            <div class="select">
                <select id="server" name="server" bind:value={defaultRealm}>
                    {#each $servers as s}
                        <option value={s.slug}>{titleCase(s.name)}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="field-label"><label class="label" for="faction">Faction</label></div>
    <div class="field-body mr-1">
        <div class="field">
            <div class="select">
                <select id="faction" name="faction" bind:value={faction}>
                    <option value="alliance">Alliance</option>
                    <option value="horde">Horde</option>
                </select>
            </div>
        </div>
    </div>
</div>

<div class="field">
    <div class="select">
        <select id="comparison-faction-1" name="comparison-faction-1">
            <option value="alliance">Alliance</option>
            <option value="horde">Horde</option>
        </select>
    </div>
    <div class="select">
        <select id="comparison-server-1" name="comparison-server-1">
            {#each $servers as s}
                <option value={s.slug} selected={s.slug === 'atiesh' ? 'selected' : ''}
                    >{titleCase(s.name)}</option
                >
            {/each}
        </select>
    </div>
    <button
        class="button is-rounded is-success"
        type="button"
        id="addServerBtn"
        on:click={async () =>
            await addTableRow(
                document.querySelector('#comparison-server-1').value,
                document.querySelector('#comparison-faction-1').value
            )}>Add Comparison Server</button
    >
</div>

<!-- TODO: datatables -->
<table class="table">
    <thead>
        <tr>
            <th>Server</th>
            <th>Min Price</th>
            <th>Market Avg.</th>
        </tr>
    </thead>
    <tbody id="item-table-body">
        {#if defaultRealm !== ''}
            {#await getServerItemPrice(defaultRealm, faction)}
                <tr><td colspan="3">Loading...</td></tr>
            {:then item}
                <tr>
                    <td
                        ><a
                            href="https://nexushub.co/wow-classic/items/{defaultRealm}-{faction}/{item.uniqueName}"
                            target="_blank">{titleCase(defaultRealm)} - {titleCase(faction)}</a
                        ></td
                    >
                    <td>{formatPrice(item.stats.current.minBuyout)}</td>
                    <td>{formatPrice(item.stats.current.marketValue)}</td>
                </tr>
            {/await}
        {/if}
    </tbody>
</table>
