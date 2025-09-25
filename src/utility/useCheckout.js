'use client'

import { useSelector } from 'react-redux'
import fetchApi from './api/fetchApi'

const useCheckout = () => {
  const cartItem = useSelector((state) => state.cart)

  const getProductData = async ({ discount = 0 }) => {
    if (!Array.isArray(cartItem) || cartItem.length === 0) return null

    // 📦 Prepare filter query
    // const query = cartItem
    //   .map((item, idx) => `filters[id][$in][${idx}]=${item.productId}`)
    //   .join('&')

    const productRes = await fetchApi({
      URI: `public/products`,
    })

    const productData = productRes?.data || []

    // 🔄 Map to match product and quantity
    const cartProducts = productData.map((item) => {
      const productId = item._id || item.id
      const quantity =
        cartItem.find((ci) => ci.productId == productId)?.quantity || 1

        
      return {
        products: productId,
        name: item?.name,
        id: item._id,
        name: item.name,
        category: item.category?.name || "Uncategorized",
        brand: item.brand?.name || "No Brand", // it's just a string ID for now
        salePrice: item.salePrice,
        regularPrice: item.regularPrice,
        imageUrl: item.images?.[0] || "", // first image as main image
        createdAt: item.createdAt,
        customLabel: item.customLabel,
        slug: item.slug,
        UOM: item?.uom || "20",
        quantity,
      }
    })

    // 🧾 Fetch tax & shipping
    const [shippingRes, taxRes] = await Promise.all([
      fetchApi({ URI: 'shipping-cost' }),
      fetchApi({ URI: 'taxes' }),
    ])

    const taxAttr = taxRes?.data?.[0]?.attributes
    const shippingAttr = shippingRes?.data?.attributes

    const taxName = taxAttr?.Tax_name
    const taxId = taxRes?.data?.[0]?.id
    const taxPers = taxAttr?.Tax_rate || 0
    const shippingThreshold = shippingAttr?.Lesserthan_price || 0
    const shippingCharge = shippingAttr?.Charge || 0

    // 💰 Calculate totals
    const total = cartProducts.reduce((sum, p) => {
      return sum + parseFloat(p.price) * parseInt(p.quantity)
    }, 0)

    const shipping = total <= shippingThreshold ? shippingCharge : 0
    const subTotal = total + shipping - discount
    const subTotalExclTax = (subTotal / (1 + taxPers / 100)).toFixed(2)
    const taxAmount = (subTotal - subTotalExclTax).toFixed(2)
    const grandTotal =
      parseFloat(subTotalExclTax) + parseFloat(taxAmount) - discount

    const totalSummary = {
      total,
      shipping,
      taxAmount,
      discount,
      subTotal: parseFloat(subTotalExclTax),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
    }

    return {
      cartProducts,
      totalSummary,
      taxDetials: { taxName, taxId, taxPers },
    }
  }

  return getProductData
}

export default useCheckout
