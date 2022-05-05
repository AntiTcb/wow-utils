<script>
    import { Accordion, AccordionItem, Tile } from 'carbon-components-svelte';

    let notes = [
        {
            version: '1.0.2',
            text: 'Bugfixes, added settings for default realms/factions to compare with.',
            open: true
        },
        {
            version: '1.0.0',
            text: 'First tool completed! The <a href="/compare">Server Price Comparison</a> tool is now available.',
            open: false
        }
    ];
</script>

<h1 class="is-size-1">WoW Utils</h1>

<h3 class="is-size-3 mt-6">Site Notes</h3>
<Tile>
    <Accordion title="Site Patch Notes">
        {#each notes as note}
            <AccordionItem open={note.open} title={note.version}>
                <p>{@html note.text}</p>
            </AccordionItem>
        {/each}
    </Accordion>
</Tile>
