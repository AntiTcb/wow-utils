<script>
    import {
        DataTable,
        Pagination,
        Toolbar,
        ToolbarContent,
        ToolbarSearch
    } from 'carbon-components-svelte';
    import FactionSelect from '$lib/components/FactionSelect.svelte';
    import RealmSelect from '$lib/components/RealmSelect.svelte';
    import OutboundLink from '$lib/components/OutboundLink.svelte';

    export let category;
    export let items;
    export let realm;
    export let faction;
    export let search = '';
    export let display = 'block';

    let comparisonRealm = '';
    let comparisonFaction = '';

    let lazyLoaded = false;

    let pagination = {
        pageSize: 10,
        pageSizes: [10, 25],
        page: 1
    };

    $: filteredItems = items.filter((i) => i.itemName.toUpperCase().indexOf(search.toUpperCase()) !== -1);

    const getServerItemPrice = async (realm, faction, itemUniqueName) => {
        const res = await fetch(
            `https://api.nexushub.co/wow-classic/v1/items/${realm}-${faction}/${itemUniqueName}`,
            {}
        );

        if (!res.ok) {
            return { error: { statusCode: res.statusCode, message: res.statusText } };
        }

        const json = await res.json();
        return { item: json ?? [] };
    };

    const addServerComparison = async (realm, faction, itemUniqueName, rowId) => {
        const { item, error } = await getServerItemPrice(realm, faction, itemUniqueName);

        if (error) {
            alert('Error adding server comparison. Please wait a bit and try again.');
            console.log(error);
            return;
        }

        const currentRow = document.getElementById(`row-${rowId}`);
        const row = document.createElement('tr');
        row.classList.add('dynamic-row', 'bx--expandable-row');
        row.setAttribute('data-child-row', '');

        const spacerTd = document.createElement('td');
        spacerTd.colSpan = 2;
        row.appendChild(spacerTd);

        const serverTd = document.createElement('td');

        const outboundLink = new OutboundLink({
            target: serverTd,
            props: {
                href: `https://nexushub.co/wow-classic/items/${realm}-${faction}/${itemUniqueName}`,
                class: 'is-capitalized',
                text: `${realm} - ${faction}`
            }
        });

        row.appendChild(serverTd);

        const minBuyoutTd = document.createElement('td');
        minBuyoutTd.innerText = formatPrice(item.stats?.current?.minBuyout);
        row.appendChild(minBuyoutTd);

        const marketValueTd = document.createElement('td');
        marketValueTd.innerText = formatPrice(item.stats?.current?.marketValue);
        row.appendChild(marketValueTd);

        const fragment = document.createDocumentFragment();
        fragment.appendChild(row);

        currentRow.after(row);
    };

    const formatPrice = (price = 0) => {
        if (price === 0) return 'N/A';

        const gold = Math.floor(price / 10000);
        price = price % 10000;
        const silver = Math.floor(price / 100);
        price = price % 100;
        const copper = Math.floor(price);

        return `${gold >= 1 ? `${gold}g ` : ''}${silver >= 1 ? `${silver}s ` : ''}${copper}c`;
    };

    const headers = [
        { key: 'itemName', value: 'Item Name' },
        { key: 'server', value: 'Server' },
        { key: 'minBuyout', value: 'Min Buyout' },
        { key: 'marketValue', value: 'Market Value' }
    ];

    $: rows = filteredItems.map((i) => {
        const rowItem = {
            id: i.itemId,
            itemId: i.itemId,
            uniqueName: i.uniqueName,
            iconUrl: i.iconUrl,
            itemName: i.itemName,
            server: `${realm} - ${faction}`,
            minBuyout: i.prices?.minBuyout,
            marketValue: i.prices?.marketValue
        };
        return rowItem;
    });

    const filterRows = (row, value) => {
        return row.itemName.toLowerCase().includes(value.toLowerCase());
    };

    const removeDynamicRows = () => {
        document.querySelectorAll('.dynamic-row').forEach((r) => r.remove());
    };
</script>

<details
    data-category={category}
    data-realm={realm}
    data-faction={faction}
    style="display: {display}"
    {...$$restProps}
>
    <summary class="is-size-4" on:click={() => (lazyLoaded = true)}
        >{category} {filteredItems.length ? `(${filteredItems.length})` : ''}</summary
    >
    {#if lazyLoaded}
        <DataTable
            sortable
            expandable
            {headers}
            {rows}
            pageSize={pagination.pageSize}
            page={pagination.page}
            size="compact"
            on:update={() => console.log('updated')}
        >
            <svelte:fragment slot="cell" let:row let:cell>
                {#if cell.key === 'itemName'}
                    <div class="is-flex is-align-items-center" style="gap: 0.25rem">
                        <img
                            src="https://wow.zamimg.com/images/wow/icons/large/{row.iconUrl}.jpg"
                            alt={row.itemName}
                            height={24}
                            width={24}
                        />
                        <OutboundLink href="https://tbc.wowhead.com/item={row.itemId}"
                            >{cell.value}</OutboundLink
                        >
                    </div>
                {:else if cell.key === 'server'}
                    <OutboundLink
                        href="https://nexushub.co/wow-classic/items/{realm}-{faction}/{row.uniqueName}"
                        class="is-capitalized">{cell.value}</OutboundLink
                    >
                {:else if cell.key === 'minBuyout' || cell.key === 'marketValue'}
                    {formatPrice(cell.value)}
                {:else}
                    {cell.value}
                {/if}
            </svelte:fragment>
            <Toolbar>
                <ToolbarContent>
                    <ToolbarSearch
                        persistent
                        shouldFilterRows={filterRows}
                        bind:value={search}
                        on:input={removeDynamicRows}
                    />
                </ToolbarContent>
            </Toolbar>
            <svelte:fragment slot="expanded-row" let:row>
                <div
                    class="add-comparison-container is-inline-flex is-justify-content-end is-align-items-end p-1"
                >
                    <RealmSelect
                        bind:selected={comparisonRealm}
                        serverFilter={(s) => s.slug !== realm}
                    />
                    <FactionSelect bind:selected={comparisonFaction} />
                    <button
                        class="button is-rounded is-smaller"
                        type="button"
                        on:click={async () =>
                            await addServerComparison(
                                comparisonRealm,
                                comparisonFaction,
                                row.uniqueName,
                                row.id
                            )}
                    >
                        Add a Server Comparison
                    </button>
                </div>
            </svelte:fragment>
        </DataTable>
        <Pagination
            bind:pageSize={pagination.pageSize}
            bind:pageSizes={pagination.pageSizes}
            bind:page={pagination.page}
            totalItems={filteredItems.length}
            on:click:button--previous={() => removeDynamicRows()}
            on:click:button--next={() => removeDynamicRows()}
        />
    {/if}
</details>

<style lang="scss">
    :global(tr.bx--parent-row.bx--expandable-row + tr[data-child-row] td) {
        padding: 0 0 0 5.5rem;
    }
    :global(.bx--table-sort) {
        width: auto;
    }
    .add-comparison-container {
        gap: 0.5rem;
    }
    :global(.price-comparison-table bx--form-item) {
        flex-grow: 0;
    }
    :global(.bx--child-row-inner-container) {
        display: flex;
        justify-content: end;
    }
    :global(tr.bx--parent-row.bx--expandable-row + tr[data-child-row].dynamic-row td) {
        padding: 0.125rem 1rem;
    }
</style>
