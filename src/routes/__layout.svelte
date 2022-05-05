<script>
    import "carbon-components-svelte/css/g10.css";
    import "../app.scss";
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { Content } from 'carbon-components-svelte';
</script>

<svelte:head>
    <title>WoW Utils</title>
</svelte:head>

<Header />
<Content>
    <slot></slot>
</Content>
<Footer />
