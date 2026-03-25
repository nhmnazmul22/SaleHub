import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {AlertCircle} from 'lucide-react'
import {inventoryItems} from "@/constants";


const InventoryTable = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock Levels</CardTitle>
                <CardDescription>Current inventory by product and branch</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Branch</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Threshold</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventoryItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.product}</TableCell>
                                <TableCell>{item.branch}</TableCell>
                                <TableCell>
                                    <span className="font-semibold">{item.quantity}</span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{item.threshold}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            item.status === 'Optimal' ? 'default' :
                                                item.status === 'Low' ? 'secondary' :
                                                    'destructive'
                                        }
                                        className="flex items-center gap-1 w-fit"
                                    >
                                        {item.status === 'Critical' && <AlertCircle className="h-3 w-3" />}
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default InventoryTable;