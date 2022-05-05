import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const items = writable([]);
export const categories = writable([]);

export const getItems = async () => {
    const { data, error } = await supabase
        .from('items')
        .select('itemId,itemName,iconUrl,uniqueName,auctionHouseCategory');
    items.set(error ? [] : data);
    categories.set(error ? [] : [...new Set(data.map((item) => item.auctionHouseCategory).sort())]);
    return error ? [] : data;
};

export const getItemsInCategory = async (category, page = 1) => {
    const { from, to } = getPagination(page, 5);
    const { data, count, error } = await supabase
        .from('items')
        .select('itemId,itemName,iconUrl,uniqueName,auctionHouseCategory', { count: 'exact' })
        .order('itemName', { ascending: true })
        .ilike('auctionHouseCategory', category.replace('-', ' / '))
        .range(from, to);

    return {
        category: category.replace('-', ' / '),
        items: data ?? [],
        count: count ?? 0,
        page: +page,
        error: error?.message ?? false
    };
};

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const from = page ? page * limit : 0;
    const to = page ? from + size - 1 : size - 1;

    return { from, to };
};

getItems();
