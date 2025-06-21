
import Title from '../../components/global/Title'

import CartList from '../../components/user/cart/cartList'
function Page() {
// const token = localStorage.getItem('token')
  return (
    <div className='container my-4'>
      <Title titlePart2="Your shopping cart" />
      <CartList token={token}/>
    </div>
  )
}

export default Page





