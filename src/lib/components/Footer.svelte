<script>
    import { OutboundLink } from 'carbon-components-svelte';
</script>

<div class="container is-flex is-justify-content-space-evenly" id="footer">
    <OutboundLink href="https://github.com/antitcb/wow-utils/">GitHub</OutboundLink>
    <OutboundLink
        href="https://www.paypal.com/donate/?business=ALMMJW5XQ97C4&no_recurring=0&currency_code=USD"
        >Donate</OutboundLink
    >
</div>

<style>
    #footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        padding: 0.125rem 0;
        background: #fafafa;
        border-top: 2px solid #161616;
        border-left: 2px solid #161616;
        border-right: 2px solid #161616;
        border-radius: 0.5rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>
