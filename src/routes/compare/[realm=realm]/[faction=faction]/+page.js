
export async function load({ fetch, params }) {
    const overviewResponse = await fetch(
        `https://api.nexushub.co/wow-classic/v1/items/${params.realm}-${params.faction}`.toLowerCase()
    );
    const itemOverviewData = await overviewResponse.json();

    return {
    overview: itemOverviewData.data
};
}
