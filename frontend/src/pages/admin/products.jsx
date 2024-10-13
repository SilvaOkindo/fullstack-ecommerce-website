import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useEffect, useState } from "react";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin/image-uploader";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProducts } from "@/store/admin/admin-slice";
import { useToast } from "@/hooks/use-toast";


const AdminProducts = () => {
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

  const [openCreateProductsDialog, setOpenCreatedProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState("");
  const [uploadImageUrl, setUploadImageUrl] = useState();
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const {toast} = useToast()

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addNewProduct({
        ...formData,
        image: uploadImageUrl,
      })
    ).then((data) => {
      console.log(data);
      if(data?.payload?.success) {
        dispatch(fetchAllProducts())
        setOpenCreatedProductsDialog(false)
        setImageFile(null)
        setFormData(initialFormData)

        toast({
          title: "Product added successfully."
        })
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreatedProductsDialog(true)}>
          Add New Products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreatedProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />

          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
