import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {initialSalesOrders} from "@/constants";
import {Button} from "@/components/ui/button";
import {Edit2, Eye, Trash2} from "lucide-react";

const SalesTable = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sales Orders</CardTitle>
                <CardDescription>Recent sales transactions and orders</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialSalesOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                                    <TableCell className="font-medium">{order.customer}</TableCell>
                                    <TableCell>{order.items}</TableCell>
                                    <TableCell className="font-semibold">{order.total}</TableCell>
                                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesTable;