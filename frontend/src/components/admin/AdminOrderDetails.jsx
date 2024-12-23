import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const initialData = {
  status: "",
};

const AdminOrderDetails = () => {
  const [formData, setFormDat] = useState(initialData);
  const handleUpdateStatus = (e) => {
    e.preventDefault()
  };
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-5">
            <p className="font-medium">Order ID</p>
            <Label>12345</Label>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="font-medium">Order Date</p>
            <Label>12/3/2025</Label>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="font-medium">Price</p>
            <Label>$445</Label>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="font-medium">Order Status</p>
            <Label>Processing</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h3 className="font-medium">Order Details</h3>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product 1</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div>Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
        <CommonForm
          formControls={[{
            label: "Order Status",
            name: "status",
            componentType: "select",
            options: [
              { id: "pending", label: "Pending" },
              { id: "inprogress", label: "Inprogress" },
              { id: "inShipping", label: "Shipping" },
              { id: "delivered", label: "Delivered" },
              { id: "rejected", label: "Rejected" },
            ],
          }]}
          setFormData={setFormDat}
          formData={formData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
