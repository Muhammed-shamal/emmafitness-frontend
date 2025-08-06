import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#f9f9f9',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '100%',
            }}
        >
            <Skeleton height={200} width={'100%'} />
            <div style={{ padding: '1rem' }}>
                <Skeleton height={24} width="80%" style={{ marginBottom: 8 }} />
                <Skeleton height={20} width="60%" style={{ marginBottom: 12 }} />
                <Skeleton height={28} width="40%" />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
