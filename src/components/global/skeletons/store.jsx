import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, Col } from 'antd';

const StoreCardSkeleton = () => {
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card
        cover={<Skeleton height={200} />}
        style={{ marginBottom: 16 }}
      >
        <h3>
          <Skeleton width={`80%`} />
        </h3>
        <p>
          <Skeleton width={`90%`} />
        </p>
        <p>
          <Skeleton width={`60%`} />
        </p>
      </Card>
    </Col>
  );
};

export default StoreCardSkeleton;