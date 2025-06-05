'use client'
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../utility/redux/wishListSlice";
import PostAPI from "../../utility/api/postApi";
import deleteApi from "../../utility/api/deleteApi";

function WishListButton({ProductId, label=false}) {
const wishlistDispatch = useDispatch()  
const user = useSelector(state=>state.user)
const existingWish = useSelector(state=>state.wishList)
const exist = existingWish?.find(item=>item.ProductId == ProductId )
const wishListHandler = async ()=>{
  try{
    
    // post wishlist with user id into backend
        if(user?.token){
          let result
          // if exisitng wishlist in state remove it from db else save to into db > db wishlist fetched to state when login
          if(exist){
            result = await deleteApi({URI: `wishlists/${exist?.id}`, token: user.token})
          }else{
           result =  await PostAPI({URI: "wishlists", token: user.token,  Data: {
               product: ProductId,
               users: user?.userId
              }})
            }
            wishlistDispatch(addToWishList({id: result?.data?.id,ProductId}))
  
        }
        
  }catch(err){
    console.log(err)
  }

}
  return (
    <>
    <Button onClick={wishListHandler} 
    className={`text-blue-500 border-blue-500 rounded-none h-10 w-10 pt-[6px]` }
    icon={exist ? <HeartFilled /> : <HeartOutlined/>}
    >{label && "Add to wishlist" }</Button>
    </>
  )
}

export default WishListButton