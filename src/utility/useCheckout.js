'use client'

import { useSelector } from "react-redux"
import fetchApi from "./api/fetchApi"

const useCheckout = ()=>{

    const cartItem = useSelector(state => state.cart)

    
    // cart detials
    const getProductData = async({discount=0})=>{
        
        const filter = cartItem?.map((item, idx) => {
            if (idx < 1) return `filters[id][$in][${idx}]=${item?.productId}`
            else return `&filters[id][$in][${idx}]=${item?.productId}`
        })

        
        const res =  filter?.length > 0 &&
        await fetchApi({ URI: `public/products?${filter?.join('')}&populate=Feature_Photo,brand` })
        const cartProducts = res?.data?.map(item => ({
            products: item?.id,
            name: item?.attributes?.Name,
            Short_Description: item?.attributes?.Short_Description,
            Regular_Price: item?.attributes?.Regular_Price,
            Sale_Price: item?.attributes?.Sale_Price,
            price : item?.attributes?.Sale_Price || item?.attributes?.Regular_Price,
            Stock: item?.attributes?.Stock,
            UOM: item?.attributes?.UOM,
            Brand: item?.attributes?.brand?.data?.attributes?.Name,
            photo: item?.attributes?.Feature_Photo?.data?.attributes?.url,
            quantity: cartItem?.map(cartitemel => {
                if (cartitemel?.productId == item?.id) return cartitemel?.quantity
            }).join('')
        }
        ))
   
   
   
   
   
        // getshpping charge and tax detials from backend
   
        const companyRes = await Promise.all([
            fetchApi({ URI: 'shipping-cost' }),
            fetchApi({ URI: 'taxes' }),
        ])
   
        const taxName = companyRes?.[1]?.data?.[0]?.attributes?.Tax_name
        const taxId = companyRes?.[1]?.data?.[0]?.id
        const taxPers = companyRes?.[1]?.data?.[0]?.attributes?.Tax_rate
        const shippingTermLessthan = companyRes?.[0]?.data?.attributes?.Lesserthan_price
        const shippingCharge = companyRes?.[0]?.data?.attributes?.Charge
   
    
   
   
        // account summery
        const total = cartProducts?.reduce((prev, current) => {
            const price = current?.Sale_Price || current?.Regular_Price;
            const quantity = parseInt(current?.quantity);
            return prev + price * quantity;
        }, 0)

        const shipping = (total <= shippingTermLessthan) ? shippingCharge : 0
        const subTotal = total + shipping - (discount ? discount : 0)
        // const taxAmount = (subTotal * taxPers) / 100
        const withoutTax = (subTotal /(1+(taxPers/100)) ) .toFixed(2)
        const taxAmount = (subTotal -withoutTax).toFixed(2)
       const totalSummary = {
            total,
            shipping,
            taxAmount,
            discount,
            subTotal: withoutTax,
            grandTotal: (parseFloat(withoutTax) +  parseFloat(taxAmount) - (discount ? discount : 0))
        }
    
        return {totalSummary, taxDetials: {taxName, taxId, taxPers}, cartProducts}
     }

 return getProductData
}


export default useCheckout