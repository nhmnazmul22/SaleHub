import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {Edit2, Eye, Mail, MapPin, Phone, Trash2} from 'lucide-react'
import Link from 'next/link'
import {suppliers} from "@/constants";
import Rating from "@/components/common/ui/Rating";


const SupplierTableCard = () => {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Suppliers List</CardTitle>
                        <CardDescription>Total suppliers: {suppliers.length}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b hover:bg-transparent">
                                <TableHead className="font-semibold">Name</TableHead>
                                <TableHead className="font-semibold">Email</TableHead>
                                <TableHead className="font-semibold">Phone</TableHead>
                                <TableHead className="font-semibold">Location</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Orders</TableHead>
                                <TableHead className="font-semibold">Total Value</TableHead>
                                <TableHead className="font-semibold">Rating</TableHead>
                                <TableHead className="text-right font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.map((supplier) => (
                                <TableRow key={supplier.id} className="hover:bg-muted/50 transition-colors">
                                    <TableCell className="font-semibold">{supplier.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground shrink-0"/>
                                            {supplier.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-muted-foreground shrink-0"/>
                                            {supplier.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0"/>
                                            {supplier.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={supplier.status === 'Active' ? 'default' : 'secondary'}
                                               className="text-xs">
                                            {supplier.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-semibold">{supplier.ordersCount}</TableCell>
                                    <TableCell className="font-semibold">{supplier.totalValue}</TableCell>
                                    <TableCell className="text-sm">
                                        <Rating rating={supplier.rating}/>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-1 justify-end">
                                            <Button variant="ghost" size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-muted">
                                                <Eye className="h-4 w-4"/>
                                            </Button>
                                            <Link href={`/suppliers/edit/${supplier.id}`}>
                                                <Button variant="ghost" size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-muted">
                                                    <Edit2 className="h-4 w-4"/>
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4"/>
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

export default SupplierTableCard;