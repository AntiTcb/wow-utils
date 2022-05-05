<script context="module">
    export async function load({fetch, params}) {
        const overviewResponse = await fetch(`https://api.nexushub.co/wow-classic/v1/items/${params.realm}-${params.faction}`.toLowerCase());
        const itemOverviewData = await overviewResponse.json();

        return {
            props:  {
                overview: itemOverviewData.data
            }
        }
    }
</script>

<script>
    import { page } from '$app/stores'
    import { items, categories } from '$lib/stores/itemStore'
    import AuctionHouseCategoryTable from '$lib/components/AuctionHouseCategoryTable.svelte';
    import { Button, TooltipDefinition, TextInput } from "carbon-components-svelte";

    export let overview = [];

    let searchTerm = '';

    $: itemsFiltered = $items.map(i => { i.prices = overview.find(i2 => i2.itemId === i.itemId); return i; }).filter(i => typeof(i.prices) !== 'undefined');
    $: searchedItems = itemsFiltered.filter(i => i.itemName.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1);
    $: filteredCategories = $categories.filter(c => searchedItems.map(i => i.auctionHouseCategory).includes(c));

    const getCategoryItems = (category) => searchedItems.filter(i => i.auctionHouseCategory === category);
</script>


<h1 class="is-large has-text-weight-bold is-size-4"><span class="is-capitalized">{$page.params.realm}</span> - <span class="is-capitalized">{$page.params.faction}</span></h1>
<Button kind="tertiary" size="small" href="/compare" class="mt-2 mb-5">Change Realm/Faction</Button>

<TextInput labelText="Search Items" bind:value={searchTerm} />

<TooltipDefinition tooltipText="If an item/category is missing, then there were 0 found listings on the Auction House.">Missing Items/Categories?</TooltipDefinition>

{#each $categories as category}
    <AuctionHouseCategoryTable category={category} search={searchTerm} items={getCategoryItems(category)} realm={$page.params.realm} faction={$page.params.faction} display={filteredCategories.includes(category) ? "block" : "none"} class="my-3" />
{/each}
