import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";


const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)} className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[250px] object-cover rounded-t-lg"
        />
        {product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-base text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-base text-muted-foreground">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } 'text-sm text-muted-foreground'`}
          >
            {product?.price}
          </span>

          {product?.salePrice > 0 ? (
            <span className="text-sm text-muted-foreground">
              {product?.salePrice}
            </span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => handleAddToCart(product?._id)}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
