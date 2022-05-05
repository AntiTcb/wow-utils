<script>
    import { OutboundLink } from 'carbon-components-svelte';

    export let text = '';
    export let href = '';
</script>

<OutboundLink {href} {...$$restProps}>
    {#if text}
        {text}
    {:else}
        <slot />
    {/if}
</OutboundLink>
