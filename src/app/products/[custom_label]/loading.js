'use client';

import { Spin } from 'antd';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" tip="Loading..." />
    </div>
  );
}

export default Loading;
