
export async function load({ fetch, params }) {
    const res = await fetch(
        `https://api.nexushub.co/wow-classic/v1/item/${params.item}`.toLowerCase()
    );
    const data = await res.json();

    return {
    item: data
};
}
