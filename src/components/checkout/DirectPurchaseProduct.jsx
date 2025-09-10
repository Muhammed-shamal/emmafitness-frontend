
import Image from 'next/image';
import { productUrl } from '../../utility/api/constant';

const DirectPurchaseProduct = ({ product, quantity }) => {
  console.log('produc data is',product);
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Product Details</h3>
      
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 relative rounded-md overflow-hidden">
          <Image
            src={productUrl + '/' + product.images?.[0] || '/api/placeholder/80/80'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{product.name}</h4>
          <p className="text-sm text-gray-500">Quantity: {quantity}</p>
          
          <div className="mt-2">
            {product.salePrice && product.salePrice < product.regularPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">
                  AED {product.salePrice * quantity}
                </span>
                <span className="text-sm line-through text-gray-500">
                  AED {product.regularPrice * quantity}
                </span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  Save AED {(product.regularPrice - product.salePrice) * quantity}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                AED {product.regularPrice * quantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectPurchaseProduct;