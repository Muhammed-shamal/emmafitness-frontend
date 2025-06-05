import { Radio } from 'antd'

function PaymentType({onSelect}) {
  return (
    <div className='bg-gray-100 border border-gray-200 p-2 md:p-4'>
    <Radio.Group onChange={onSelect} buttonStyle='solid'>
      <Radio.Button value="Cash on Delivery">Cash on Delivery</Radio.Button>
      {/* <Radio.Button value="Card on Delivery">Card on Delivery</Radio.Button> */}
      <Radio.Button disabled={true} value="Credit Card">Credit / Debit Card</Radio.Button>
    </Radio.Group>
  </div>
  )
}

export default PaymentType