import React, {useState} from 'react';
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
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface ProductEditModalProps{
    editOpen: boolean
    selectedProduct: Product | null
    onEditOpenChange: (open: boolean) => void
    onEditSubmit: (product: Product) => void
}



const ProductEditModal = ({editOpen, onEditOpenChange, selectedProduct, onEditSubmit}: ProductEditModalProps) => {
    const [editFormData, setEditFormData] = useState<Product | null>(selectedProduct)


    return (
        <Dialog open={editOpen} onOpenChange={onEditOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>Update product information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="edit-name">Product Name</Label>
                        <Input
                            id="edit-name"
                            value={editFormData?.name || ''}
                            onChange={(e) => setEditFormData(editFormData ? { ...editFormData, name: e.target.value } : null)}
                            placeholder="Enter product name"
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-category">Category</Label>
                        <Input
                            id="edit-category"
                            value={editFormData?.category || ''}
                            onChange={(e) => setEditFormData(editFormData ? { ...editFormData, category: e.target.value } : null)}
                            placeholder="Enter category"
                            className="mt-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit-price">Price</Label>
                            <Input
                                id="edit-price"
                                value={editFormData?.price || ''}
                                onChange={(e) => setEditFormData(editFormData ? { ...editFormData, price: e.target.value } : null)}
                                placeholder="$0.00"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-stock">Stock Qty</Label>
                            <Input
                                id="edit-stock"
                                type="number"
                                value={editFormData?.stock || 0}
                                onChange={(e) => setEditFormData(editFormData ? { ...editFormData, stock: parseInt(e.target.value) } : null)}
                                placeholder="0"
                                className="mt-1"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onEditOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (editFormData) {
                                onEditSubmit(editFormData)
                                onEditOpenChange(false)
                            }
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductEditModal;