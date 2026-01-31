import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {transactions} from "@/constants";
import {ReceiptIcon} from "lucide-react";

export default function RecentTransactions() {

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Sale':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
            case 'Purchase':
                return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
            case 'Transfer':
                return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400'
        }
    }

    return (
        <Card className="h-full gap-0">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <ReceiptIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-2">
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((txn) => (
                                <TableRow key={txn.id} className="text-sm">
                                    <TableCell className="text-xs text-muted-foreground">{txn.date}</TableCell>
                                    <TableCell>
                                        <Badge className={getTypeColor(txn.type)}>
                                            {txn.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">{txn.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
