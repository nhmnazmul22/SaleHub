import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from '@/components/ui/badge'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {items} from "@/constants";

const LowStockProduct = () => {

    const getStatusColor = (status: string) => {
        if (status === 'critical') {
            return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
        }
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
    }


    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <CardTitle>Low Stock Alerts</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="hover:dark:text-white">
                    View All
                </Button>
            </CardHeader>
            <CardContent className="px-2">
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Current Qty</TableHead>
                                <TableHead>Threshold</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{item.sku}</TableCell>
                                    <TableCell className="text-sm">{item.branch}</TableCell>
                                    <TableCell className="text-center font-medium">{item.currentQty}</TableCell>
                                    <TableCell className="text-center text-muted-foreground">{item.threshold}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(item.status)}>
                                            {item.status === 'critical' ? 'Critical' : 'Warning'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
};

export default LowStockProduct;