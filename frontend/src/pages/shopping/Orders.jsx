import ShopOrderDetails from "@/components/shopping/ShopOrderDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, getOrdersList, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "@/components/ui/badge";

const ShoppingOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrders);
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleGetOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId))
  }

  useEffect(() => {
    if(orderDetails !==null) setOpenDetailsDialog(true)
  }, [orderDetails])

  useEffect(() => {
    dispatch(getOrdersList(user?.id));
  }, [dispatch]);

  //console.log(orderList, 'orders')
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((order) => (
                  <TableRow className="py-2">
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.orderDate.split('T')[0]}</TableCell>
                    <TableCell>
                      <Badge className={`px-3 py- rounded-full ${order.orderStatus === 'confirmed' ? 'bg-green-500' : 'bg-black'}`}>{order?.orderStatus}</Badge>
                    </TableCell>
                    <TableCell>${order?.totalAmount}</TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false)
                        dispatch(resetOrderDetails())
                      }}
                    >
                      <Button onClick={() => handleGetOrderDetails(order?._id)}>
                        View Details
                      </Button>
                      <ShopOrderDetails orderDetails={orderDetails}/>
                    </Dialog>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
