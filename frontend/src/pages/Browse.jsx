import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { fetchItems } from '../api/services.js';
import { CATEGORIES } from '../api/placeholder.js';
import ItemCard from '../components/items/ItemCard.jsx';
import { LoadingGrid, EmptyState, ErrorState } from '../components/items/ItemStates.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function Browse() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const loadItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const filters = {};
            if (search) filters.search = search;
            if (category !== 'All') filters.category = category;
            if (maxPrice) filters.maxPrice = Number(maxPrice);

            const data = await fetchItems(filters);
            setItems(data.items || data);
        } catch {
            setError('Could not load items. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [search, category, maxPrice]);

    useEffect(() => {
        const handler = setTimeout(() => {
            loadItems();
            const params = {};
            if (search) params.search = search;
            if (category !== 'All') params.category = category;
            if (maxPrice) params.maxPrice = maxPrice;
            setSearchParams(params, { replace: true });
        }, 350);
        return () => clearTimeout(handler);
    }, [loadItems, search, category, maxPrice, setSearchParams]);

    const clearFilters = () => {
        setSearch('');
        setCategory('All');
        setMaxPrice('');
    };

    const hasFilters = search || category !== 'All' || maxPrice;

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <Container>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-[#000501] dark:text-[#ade1e5] mb-2">Browse Items</h1>
                    <p className="text-[#73ab84] dark:text-[#79c7c5] font-medium">
                        {loading ? 'Searching...' : `${items.length} items found near you`}
                    </p>
                </div>

                {/* Search + Filter Bar */}
                <div className="glass rounded-2xl p-3 flex flex-col sm:flex-row gap-3 mb-6 shadow-md">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search size={17} className="text-[#73ab84] dark:text-[#79c7c5] shrink-0" />
                        <input
                            type="text"
                            placeholder="Search items, categories..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-transparent text-sm font-medium text-[#000501] dark:text-[#ade1e5] placeholder:text-[#73ab84]/55 dark:placeholder:text-[#79c7c5]/45 outline-none py-2"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="text-[#73ab84] hover:text-[#000501] dark:text-[#79c7c5] dark:hover:text-[#ade1e5]">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFiltersOpen(p => !p)}
                        className="sm:shrink-0"
                    >
                        <SlidersHorizontal size={15} />
                        Filters
                        {hasFilters && <span className="w-2 h-2 rounded-full bg-[#73ab84] dark:bg-[#99d19c]" />}
                        <ChevronDown size={14} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                    </Button>
                </div>

                {/* Expanded Filters */}
                {filtersOpen && (
                    <div className="glass-card rounded-2xl p-5 mb-8 animate-fade-up">
                        <div className="flex flex-wrap gap-4 items-end">
                            {/* Category */}
                            <div className="flex flex-col gap-1.5 min-w-48">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#73ab84] dark:text-[#79c7c5]">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${category === cat
                                                    ? 'bg-[#000501] text-[#ade1e5] dark:bg-[#99d19c] dark:text-[#000501]'
                                                    : 'bg-[#99d19c]/20 text-[#3d6b50] hover:bg-[#99d19c]/35 dark:bg-[#73ab84]/15 dark:text-[#79c7c5] dark:hover:bg-[#73ab84]/25'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Max price */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#73ab84] dark:text-[#79c7c5]">Max Price / Day</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 1000"
                                    value={maxPrice}
                                    onChange={e => setMaxPrice(e.target.value)}
                                    className="w-36 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/60 dark:bg-[#000501]/60 border border-[#99d19c]/40 dark:border-[#79c7c5]/20 text-[#000501] dark:text-[#ade1e5] outline-none focus:ring-2 focus:ring-[#79c7c5]/50"
                                />
                            </div>

                            {hasFilters && (
                                <Button variant="ghost" size="sm" onClick={clearFilters}>
                                    <X size={14} /> Clear all
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Grid */}
                {loading && <LoadingGrid count={8} />}
                {error && <ErrorState message={error} onRetry={loadItems} />}
                {!loading && !error && items.length === 0 && (
                    <EmptyState
                        icon={Search}
                        title="No items found"
                        description="Try adjusting your search or clearing filters to see more results."
                        action={<Button variant="outline" onClick={clearFilters}>Clear Filters</Button>}
                    />
                )}
                {!loading && !error && items.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map(item => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                )}

            </Container>
        </div>
    );
}
