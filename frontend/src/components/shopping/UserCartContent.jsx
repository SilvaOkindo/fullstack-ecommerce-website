import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartContent = ({ cartItem }) => {

  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const {toast} = useToast()

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {

    dispatch(updateCartQuantity({
      userId: user?.id, productId: getCartItem?.productId,
      quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity -1 
    })).then((data) => {
      if(data?.payload?.success) {
        toast({
          title: "Product quantity updated."
        })
      }
      
    })

  }



  const handleDeleteCartItem = (getCartItem) => {
    dispatch(deleteCartItem({userId: user?.id, productId: getCartItem?.productId})).then((data) => {
      if(data?.payload?.success) {
        toast( {
          title: "Product deleted from the cart."
        })
      }
      
    })
    }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem.title}</h3>
        <div className="flex items-center mt-1 gap-3">
          <Button
            className="h-8 w-8 rounded-full"
            size="icon"
            variant="outline"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            className="h-8 w-8 rounded-full"
            size="icon"
            variant="outline"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash onClick={() => handleDeleteCartItem(cartItem)} className="cursor-pointer mt-1" size={20}/>
      </div>
    </div>
  );
};

export default UserCartContent;
