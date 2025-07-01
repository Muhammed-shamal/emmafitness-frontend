'use client'
import { Spin } from 'antd'

function CustomSpinner({ spinning, children }) {
  return (
    <div className="relative min-h-[300px] w-full">
      <Spin
        spinning={spinning}
        indicator={
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <object
              type="image/svg+xml"
              data="emma_loader.svg"
              style={{ width: 150, height: 150 }}
            >
              loading...
            </object>
          </div>
        }
      >
        <div className={spinning ? 'opacity-30 pointer-events-none' : ''}>
          {children}
        </div>
      </Spin>
    </div>
  )
}

export default CustomSpinner
