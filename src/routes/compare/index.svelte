<script>
    import { defaultRealm, defaultFaction } from '$lib/stores/appOptions';
    import { Button, Tile } from 'carbon-components-svelte';
    import RealmSelect from '$lib/components/RealmSelect.svelte';
    import FactionSelect from '$lib/components/FactionSelect.svelte';

    $: buttonEnabled = !$defaultRealm || !$defaultFaction;
</script>

<form>
    <Tile>
        <p class="has-text-centered is-capitalized">Choose a Server to compare prices from</p>
        <div class="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
            <RealmSelect bind:selected={$defaultRealm} />
            <FactionSelect bind:selected={$defaultFaction} />
        </div>
    </Tile>
    <Button href="/compare/{$defaultRealm}/{$defaultFaction}" disabled={buttonEnabled}>Go</Button>
</form>

<style>
    .is-flex {
        gap: 3rem;
    }
    :global(.is-flex > *) {
        flex-grow: 0;
    }
</style>
