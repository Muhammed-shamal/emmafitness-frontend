'use client'
import { Spin } from "antd"

function CustomSpinner({spinning, children}) {
  return (
    <Spin  indicator={
        <object type="image/svg+xml" data="emma_loader.svg" style={{width:150 , height: 150,}} width={500} height={500}>
        loading...
      </object>
        } spinning={spinning}>
            {children}
    </Spin>
  )
}

export default CustomSpinner