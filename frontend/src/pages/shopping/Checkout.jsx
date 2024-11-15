import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import Address from "./Address";
import UserCartContent from "@/components/shopping/UserCartContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOrder } from "@/store/shop/order-slice";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch()

  console.log(currentSelectedAddress, "address selected");

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

  const handleInitialPayment = () => {
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createOrder(orderData)).then(data=> {
      console.log(data, "silva")
    })

    console.log(orderData)

  };

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
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
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

          <Button onClick={handleInitialPayment} className="w-full">
            Checkout with paypal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
