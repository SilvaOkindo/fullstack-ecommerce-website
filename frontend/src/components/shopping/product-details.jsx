import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = ({ open, setOpen, productDetails }) => {


  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {toast} = useToast()

  const handleAddToCart = (getProductId) => {
    console.log("added")
    dispatch(addToCart({userId: user?.id, productId: getProductId, quantity: 1})).then((data) => {
      if(data?.payload?.success) {
        toast({
          title: "Product added to cart"
        })
        dispatch(fetchCartItems(user?.id))
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 sm:max-w-[80vw] lg:max-[90vw] max-[9-vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>

            {productDetails?.salePrice > 0 ? (
              <p className="tet-2xl font-bold text-muted-foreground">
                {productDetails?.salePrice}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-0.5">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <span className="ml-2">(4.5)</span>
          </div>

          <Button onClick={() => handleAddToCart(productDetails?._id)} className="w-full py-6">Add to cart</Button>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6 mt-2">
              <div className="flex gap-2">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>OS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Okindo silva</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This is an awasome product</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 mt-2">
              <div className="flex gap-2">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>OS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Okindo silva</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This is an awasome product</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 mt-2">
              <div className="flex gap-2">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>OS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Okindo silva</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This is an awasome product</p>
                </div>
              </div>
            </div>
            <div className="flex item-center gap-2 mt-4">
                <Input placeholder="Write a review..." />
                <Button>Add</Button>
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
