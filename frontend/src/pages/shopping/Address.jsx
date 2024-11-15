import CommonForm from "@/components/common/form";
import AddressCard from "@/components/shopping/AddressCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addressFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddresses,
} from "@/store/shop/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = ({setCurrentSelectedAddress}) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();
  const [currentId, setCurrentId] = useState(null);


  const handleManageAddress = (e) => {
    e.preventDefault();

    if(addresses.length >= 3 && currentId === null) {
        setFormData(initialFormData)
        toast({
            title: "You can only add 3 addresses",
            variant: "destructive"
        })
        return
      }


    currentId !== null
      ? dispatch(
          editAddress({ userId: user?.id, addressId: currentId, formData })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAddresses(user?.id));
            setCurrentId(null);
            setFormData(initialFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAddresses(user?.id));
            setFormData(initialFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(getAddresses(user?.id));
  }, [dispatch]);

  console.log(addresses);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
        {addAddress && addAddress.length > 0
          ? addresses.map((address) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={address}
                setCurrentId={setCurrentId}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{currentId !== null ? "Edit" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
