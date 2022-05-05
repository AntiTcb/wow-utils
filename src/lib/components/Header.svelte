<script>
    import {
        Header,
        HeaderUtilities,
        HeaderAction,
        HeaderPanelDivider,
        HeaderPanelLinks,
        HeaderPanelLink,
        SideNav,
        SideNavItems,
        SideNavLink

    } from 'carbon-components-svelte';
    import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
    import { defaultRealm, defaultFaction, comparisonRealm, comparisonFaction } from '$lib/stores/appOptions';
    import RealmSelect from '$lib/components/RealmSelect.svelte';
    import FactionSelect from '$lib/components/FactionSelect.svelte';

    let isOpen = false;
    let isSideNavOpen = false;

    const handleLinkClick = (e) => {
        if (!$defaultRealm || !$defaultFaction) {
            e.preventDefault();
            return;
        }
    };
</script>

<Header platformName="Wow Utils" href="/" bind:isSideNavOpen persistentHamburgerMenu={true}>
    <span slot="platform">
        <a class="bx--header__name" href="/">
            <img src="/favicon-32x32.png" alt="WoW Utils" /> <span class="ml-2">Wow Utils</span>
        </a>
    </span>
    <HeaderUtilities>
        <HeaderAction icon={SettingsAdjust} bind:isOpen>
            <HeaderPanelLinks>
                <HeaderPanelLink>Home Realm/Faction</HeaderPanelLink>
                <RealmSelect bind:selected={$defaultRealm} class="nav-select" />
                <FactionSelect bind:selected={$defaultFaction} class="nav-select" />
                <HeaderPanelDivider />
                <HeaderPanelLink>Comparison Realm/Faction</HeaderPanelLink>
                <RealmSelect bind:selected={$comparisonRealm} class="nav-select" />
                <FactionSelect bind:selected={$comparisonFaction} class="nav-select" />
            </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
    <SideNav bind:isOpen={isSideNavOpen}>
        <SideNavItems>
            {#if $defaultRealm && $defaultFaction}
            <SideNavLink
                text="Server Price Comparison"
                href="/compare/{$defaultRealm}/{$defaultFaction}"
                on:click={handleLinkClick}
            />
            {:else}
                <SideNavLink text="Server Price Comparison" href="/compare" />
            {/if}
        </SideNavItems>
    </SideNav>
</Header>

<style>
    :global(.nav-select) {
        max-width: 85%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
