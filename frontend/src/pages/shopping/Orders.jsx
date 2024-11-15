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
import { useState } from "react";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
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
            <TableRow className='py-2'>
              <TableCell>123344</TableCell>
              <TableCell>12/02/2024</TableCell>
              <TableCell>pending</TableCell>
              <TableCell>$100</TableCell>
             <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
             <Button onClick={() => setOpenDetailsDialog(true)}>View Details</Button>
             <ShopOrderDetails />
             </Dialog>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;