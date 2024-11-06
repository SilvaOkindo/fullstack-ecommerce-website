import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import AdminOrderDetails from "./AdminOrderDetails";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
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
            <TableRow>
              <TableCell>123344</TableCell>
              <TableCell>12/02/2024</TableCell>
              <TableCell>pending</TableCell>
              <TableCell>$100</TableCell>
              <Dialog
                open={openDetailsDialog}
                onOpenChange={setOpenDetailsDialog}
              >
                <Button onClick={() => setOpenDetailsDialog(true)}>
                  View Details
                </Button>
                <AdminOrderDetails />
              </Dialog>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
