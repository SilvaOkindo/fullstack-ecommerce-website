import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartContent from "./UserCartContent";

const CartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.salePrice) *
              currentItem?.quantity, 0
        )
      : 0;

      const navigate = useNavigate()

  return (
    <SheetContent className="sm:max-w-md flex flex-col gap-6">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartContent cartItem={item} />)
          : null}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Total</span>
        <span className="text-base font-semibold">${totalCartAmount}</span>
      </div>
      <Button onClick={() =>{
        setOpenCartSheet(false)
        navigate('/shop/checkout')}
        } className="w-full">Checkout</Button>
    </SheetContent>
  );
};

export default CartWrapper;
