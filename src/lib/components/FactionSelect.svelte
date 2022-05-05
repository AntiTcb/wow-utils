<script>
    import { Select, SelectItem } from 'carbon-components-svelte';

    export let labelText = 'Faction';
    export let selected = '';
</script>

<Select size="sm" bind:labelText bind:selected on:change {...$$restProps}>
    <SelectItem value="" text="" />
    <SelectItem text="Alliance" value="alliance" />
    <SelectItem text="Horde" value="horde" />
</Select>
