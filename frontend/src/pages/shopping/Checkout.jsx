import { useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import Address from "./Address";
import UserCartContent from "@/components/shopping/UserCartContent";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  console.log(cartItems, "cart");

  const totalCartAmount =
    cartItems && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.salePrice) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="h-[300px] relative overflow-hidden">
        <img
          src={img}
          alt="image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto">
        <Address />
        <div className="flex flex-col gap-6">
          {cartItems && cartItems.items.length > 0
            ? cartItems.items.map((cartItem) => (
                <UserCartContent cartItem={cartItem} />
              ))
            : null}

          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">Total</span>
            <span className="text-base font-semibold">${totalCartAmount}</span>
          </div>

          <Button className="w-full">Checkout with paypal</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
