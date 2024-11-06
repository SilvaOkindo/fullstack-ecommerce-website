import account from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "./Address";
import ShoppingOrders from "./Orders";

const Account = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[350px] overflow-hidden">
        <img
          src={account}
          alt="account image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8">
        <div className="flex flex-col rounded-lg border bg-background p-4 shadow-lg">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address /> 
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
