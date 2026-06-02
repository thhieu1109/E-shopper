import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
    page: {
        fontFamily: "'Segoe UI', sans-serif",
        maxWidth: 1100,
        margin: '0 auto',
        padding: '2rem 1rem',
        color: '#111',
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: '72px 1fr 1fr',
        gap: 24,
        alignItems: 'start',
    },
    thumbs: { display: 'flex', flexDirection: 'column', gap: 8 },
    thumb: (active) => ({
        width: 72,
        height: 88,
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        border: active ? '1.5px solid #111' : '1px solid #ddd',
        transition: 'border-color 0.15s',
    }),
    thumbImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
    mainImg: {
        borderRadius: 12,
        overflow: 'hidden',
        background: '#f3f1ee',
        aspectRatio: '3/4',
    },
    mainImgEl: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
    info: { display: 'flex', flexDirection: 'column' },
    brand: {
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#888',
        marginBottom: 6,
    },
    name: { fontSize: 22, fontWeight: 500, lineHeight: 1.3, marginBottom: 14, color: '#111' },
    priceRow: { display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 },
    priceSale: { fontSize: 22, fontWeight: 500, color: '#c0392b' },
    priceOrig: { fontSize: 14, color: '#aaa', textDecoration: 'line-through' },
    badge: {
        fontSize: 11,
        fontWeight: 500,
        background: '#c0392b',
        color: '#fff',
        padding: '2px 8px',
        borderRadius: 3,
    },
    ratingRow: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 },
    stars: { color: '#e9a60f', fontSize: 14, letterSpacing: 1 },
    reviews: { fontSize: 12, color: '#888' },
    divider: { height: 1, background: '#eee', margin: '2px 0 16px' },
    label: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#888',
        marginBottom: 10,
    },
    labelInline: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    labelValue: { textTransform: 'none', letterSpacing: 0, fontWeight: 500, color: '#111' },
    sizeGuide: { fontSize: 11, color: '#888', textDecoration: 'underline', cursor: 'pointer' },
    colors: { display: 'flex', gap: 8, marginBottom: 20 },
    swatch: (active, hex) => ({
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: hex,
        cursor: 'pointer',
        border: active ? '2px solid #111' : '2px solid transparent',
        outline: active ? '2px solid #fff' : '2px solid transparent',
        outlineOffset: 1,
        transition: 'all 0.15s',
    }),
    sizeTabs: { display: 'flex', gap: 6, marginBottom: 10 },
    sizeTab: (active) => ({
        fontSize: 12,
        fontWeight: 500,
        padding: '4px 14px',
        borderRadius: 4,
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: active ? '#111' : 'transparent',
        color: active ? '#fff' : '#888',
        border: active ? '1px solid #111' : '1px solid #ccc',
        transition: 'all 0.15s',
    }),
    sizes: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 },
    sizeBtn: (active, out) => ({
        width: 44,
        height: 40,
        fontSize: 13,
        borderRadius: 8,
        border: active ? '1.5px solid #111' : '1px solid #ccc',
        background: active ? '#111' : '#fff',
        color: out ? '#ccc' : active ? '#fff' : '#111',
        cursor: out ? 'not-allowed' : 'pointer',
        textDecoration: out ? 'line-through' : 'none',
        transition: 'all 0.15s',
    }),
    inseamRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 },
    inseamLabel: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#888',
    },
    inseamBtn: (active) => ({
        fontSize: 12,
        fontWeight: 500,
        padding: '5px 14px',
        borderRadius: 20,
        border: active ? '1px solid #111' : '1px solid #ccc',
        background: active ? '#111' : 'transparent',
        color: active ? '#fff' : '#888',
        cursor: 'pointer',
        transition: 'all 0.15s',
    }),
    actions: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 },
    qty: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    qtyBtn: {
        width: 36,
        height: 48,
        background: 'none',
        border: 'none',
        fontSize: 20,
        cursor: 'pointer',
        color: '#111',
        lineHeight: 1,
    },
    qtyVal: {
        width: 32,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 500,
        color: '#111',
        borderLeft: '1px solid #eee',
        borderRight: '1px solid #eee',
        lineHeight: '48px',
    },
    atcBtn: {
        flex: 1,
        height: 48,
        background: '#111',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
    },
    wishBtn: {
        width: 48,
        height: 48,
        background: 'transparent',
        border: '1px solid #ddd',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 20,
        color: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 1.8,
        marginTop: 16,
        borderTop: '1px solid #eee',
        paddingTop: 16,
    },
    loading: {
        padding: '4rem',
        textAlign: 'center',
        color: '#aaa',
        fontSize: 14,
        gridColumn: '1 / -1',
    },
};



function ProductDetailPage() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);

    // UI state
    const [activeThumbnail, setActiveThumbnail] = useState(0);

    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/product/detail/${id}`)
            .then(res => { setProductDetail(res.data.data); })
            .catch(err => console.error('Error fetching product detail:', err));
    }, [id]);

    if (!productDetail) {
        return (
            <div style={styles.page}>
                <div style={{ ...styles.layout }}>
                    <p style={styles.loading}>Loading product...</p>
                </div>
            </div>
        );
    }

    const images = productDetail.image ? JSON.parse(productDetail.image) : [];
    const userId = productDetail.id_user;

    const baseUrl = `http://localhost/laravel8/public/upload/product/${userId}/`;


    // const handleChangeQuantity = (delta) => {
    //     setQuantity(q => Math.max(1, q + delta));
    // }

    const plusQuantity = () => {
        setQuantity(q => q + 1);
    }

    const minusQuantity = () => {
        setQuantity(q => q > 1 ? q - 1 : 1);

    }

    const addToCart = () => {

        const cart = JSON.parse(localStorage.getItem('Cart')) || [];

        const existingProduct = cart.find(
            item => item.id === productDetail.id
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ ...productDetail, quantity });
        }

        localStorage.setItem('Cart', JSON.stringify(cart));

        alert('Product added to cart!');
    }

    return (
        <div style={styles.page}>
            <div style={styles.layout}>

                {/* --- Thumbnails --- */}
                <div style={styles.thumbs}>
                    {images.map((img, i) => (
                        <div
                            key={i}
                            style={styles.thumb(activeThumbnail === i)}
                            onClick={() => setActiveThumbnail(i)}
                        >
                            <img
                                src={baseUrl + img}
                                alt={`Thumbnail ${i + 1}`}
                                style={styles.thumbImg}
                            />
                        </div>
                    ))}
                </div>

                {/* --- Main Image --- */}
                <div style={styles.mainImg}>
                    {images[activeThumbnail] && (
                        <img
                            src={baseUrl + images[activeThumbnail]}
                            alt={productDetail.name}
                            style={styles.mainImgEl}
                        />
                    )}
                </div>

                {/* --- Product Info --- */}
                <div style={styles.info}>
                    <p style={styles.brand}>Online Exclusive</p>

                    <h1 style={styles.name}>{productDetail.name}</h1>

                    <div style={styles.priceRow}>
                        <span style={styles.priceSale}>${productDetail.price}</span>

                    </div>

                    <div>
                        <p style={styles.label}>Detail:</p>
                        <p>{productDetail.detail}</p>
                    </div>




                    <div style={styles.divider} />



                    {/* Qty + Add to bag */}
                    <div style={styles.actions}>
                        <div style={styles.qty}>
                            <button style={styles.qtyBtn} onClick={minusQuantity}>
                                −
                            </button>
                            <span style={styles.qtyVal}>{quantity}</span>
                            <button style={styles.qtyBtn} onClick={plusQuantity}>
                                +
                            </button>
                        </div>
                        <button style={styles.atcBtn} onClick={addToCart}>
                            Add to cart
                        </button>
                        <button style={styles.wishBtn} aria-label="Save to wishlist">
                            ♡
                        </button>
                    </div>

                    {/* Description */}
                    {productDetail.description && (
                        <p style={styles.desc}>{productDetail.description}</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProductDetailPage;