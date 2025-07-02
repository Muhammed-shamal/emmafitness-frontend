'use client';

import { Spin } from 'antd';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" indicator={
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                  <object
                    type="image/svg+xml"
                    data="emma_loader.svg"
                    style={{ width: 150, height: 150 }}
                  >
                    loading...
                  </object>
                </div>
              }/>
    </div>
  );
}

export default Loading;
