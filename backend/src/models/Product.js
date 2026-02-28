import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        pricePerDay: {
            type: Number,
            required: true,
            min: 0,
            max: 9007199254740991, // JS MAX_SAFE_INTEGER
        },
        securityDeposit: {
            type: Number,
            default: 0,
            min: 0,
            max: 9007199254740991,
        },
        images: {
            type: [String],
            default: [],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        availability: {
            type: Boolean,
            default: true,
        },
        // AI-generated fields (optional, populated by Gemini)
        aiInsights: {
            rentalValueScore: Number,
            demandEstimate: String,
            pricingSuggestion: String,
            buyerSummary: String,
        },
        // Seller's location
        location: {
            address: { type: String, default: '' },
            lat: { type: Number, default: null },
            lng: { type: Number, default: null },
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
