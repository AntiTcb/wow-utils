<script>
    import {
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderUtilities,
        HeaderAction,
        HeaderPanelLinks,
        HeaderPanelLink,
        HeaderGlobalAction
    } from 'carbon-components-svelte';
    import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
    import { defaultRealm, defaultFaction } from '$lib/stores/appOptions';
    import RealmSelect from '$lib/components/RealmSelect.svelte';
    import FactionSelect from '$lib/components/FactionSelect.svelte';

    let isOpen = false;

    const handleLinkClick = (e) => {
        if (!$defaultRealm || !$defaultFaction) {
            e.preventDefault();
            return;
        }
    };
</script>

<Header platformName="Wow Utils" href="/">
    <span slot="platform">
        <a class="bx--header__name" href="/">
            <img src="/favicon-32x32.png" alt="WoW Utils" /> <span class="ml-2">Wow Utils</span>
        </a>
    </span>
    <HeaderNav>
        {#if $defaultRealm && $defaultFaction}
            <HeaderNavItem
                text="Server Price Comparison"
                href="/compare/{$defaultRealm}/{$defaultFaction}"
                on:click={handleLinkClick}
            />
        {:else}
            <HeaderNavItem text="Server Price Comparison" href="/compare" />
        {/if}
    </HeaderNav>
    <HeaderUtilities>
        <HeaderAction icon={SettingsAdjust} bind:isOpen>
            <HeaderPanelLinks>
                <HeaderPanelLink>Default Realm/Server</HeaderPanelLink>
                <RealmSelect bind:selected={$defaultRealm} class="nav-select" />
                <FactionSelect bind:selected={$defaultFaction} class="nav-select" />
            </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
</Header>

<style>
    :global(.nav-select) {
        max-width: 85%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
