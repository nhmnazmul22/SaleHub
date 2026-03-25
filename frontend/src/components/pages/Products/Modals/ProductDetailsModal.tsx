"use client";
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Product} from "@/types";
import {Button} from "@/components/ui/button";

interface ProductDetailsModalProps {
    viewOpen: boolean,
    onViewOpenChange: (open: boolean)=> void;
    selectedProduct: Product
}


const ProductDetailsModal = ({viewOpen, onViewOpenChange, selectedProduct}: ProductDetailsModalProps) => {
    return (
        <Dialog open={viewOpen} onOpenChange={onViewOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                    <DialogDescription>View complete product information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label className="text-muted-foreground text-sm">Product Name</Label>
                        <p className="text-foreground font-medium mt-1">{selectedProduct.name}</p>
                    </div>
                    <div>
                        <Label className="text-muted-foreground text-sm">SKU</Label>
                        <p className="text-foreground font-mono text-sm mt-1">{selectedProduct.id}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground text-sm">Category</Label>
                            <p className="text-foreground font-medium mt-1">{selectedProduct.category}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground text-sm">Price</Label>
                            <p className="text-foreground font-medium mt-1">{selectedProduct.price}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground text-sm">Stock Qty</Label>
                            <p className="text-foreground font-medium text-lg mt-1">{selectedProduct.stock}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground text-sm">Status</Label>
                            <p className="text-foreground font-medium mt-1">{selectedProduct.status}</p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onViewOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailsModal;