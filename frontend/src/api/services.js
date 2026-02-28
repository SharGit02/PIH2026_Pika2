import { ITEMS_PLACEHOLDER } from './placeholder.js';

// Helper: simulate network latency in development
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Helper: determine if response is valid JSON API response
async function tryApiCall(apiFn) {
    try {
        const result = await apiFn();
        // If result is not a plain object/array, treat as failure
        if (result === null || typeof result !== 'object') throw new Error('Invalid response');
        return { success: true, data: result };
    } catch {
        return { success: false };
    }
}

// --- ITEMS ---

export async function fetchItems(filters = {}) {
    await delay(450);

    // Use placeholder data directly (API not yet available)
    let items = [...ITEMS_PLACEHOLDER];

    if (filters.category && filters.category !== 'All') {
        items = items.filter(i => i.category === filters.category);
    }
    if (filters.search) {
        const q = filters.search.toLowerCase();
        items = items.filter(i =>
            i.title.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q) ||
            i.location.toLowerCase().includes(q)
        );
    }
    if (filters.maxPrice) {
        items = items.filter(i => i.pricePerDay <= Number(filters.maxPrice));
    }

    return { items, total: items.length };
}

export async function fetchItemById(id) {
    await delay(300);
    const item = ITEMS_PLACEHOLDER.find(i => i.id === String(id));
    if (!item) throw new Error('Item not found');
    return item;
}

export async function createItem(payload) {
    await delay(400);
    return { ...payload, id: `item-${Date.now()}` };
}

// --- AUTH ---

export async function requestOtp(mobile) {
    await delay(700);
    return { message: 'OTP sent successfully', mobile };
}

export async function verifyOtp(mobile, otp) {
    await delay(700);
    // In production, replace with real API call
    if (otp.length >= 4) {
        return {
            token: 'dev-token-abc123',
            user: {
                id: 'u1',
                name: 'Varad Kulkarni',
                mobile,
                avatar: 'https://i.pravatar.cc/80?img=12',
            },
        };
    }
    throw new Error('Invalid OTP');
}

// --- USER ---

export async function fetchUserProfile() {
    await delay(300);
    return {
        id: 'u1',
        name: 'Varad Kulkarni',
        mobile: '+91 98765 43210',
        avatar: 'https://i.pravatar.cc/80?img=12',
        rating: 4.9,
        totalEarnings: 12400,
    };
}
