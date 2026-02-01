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
import {Button} from "@/components/ui/button";
import {Branch} from "@/types";
import {Input} from "@/components/ui/input";

interface BranchEditModalProps{
    editOpen: boolean
    selectedBranch: Branch | null
    onEditOpenChange: (open: boolean) => void
    onEditSubmit: (branch: Branch) => void
}

const BranchEditModal = ({editOpen, onEditOpenChange, selectedBranch, onEditSubmit}: BranchEditModalProps) => {
    const [editFormData, setEditFormData] = useState<Branch | null>(selectedBranch)

    return (
        <Dialog open={editOpen} onOpenChange={onEditOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Branch</DialogTitle>
                    <DialogDescription>Update branch information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="edit-name">Branch Name</Label>
                        <Input
                            id="edit-name"
                            value={editFormData?.name || ''}
                            onChange={(e) => setEditFormData(editFormData ? { ...editFormData, name: e.target.value } : null)}
                            placeholder="Enter branch name"
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                            id="edit-location"
                            value={editFormData?.location || ''}
                            onChange={(e) => setEditFormData(editFormData ? { ...editFormData, location: e.target.value } : null)}
                            placeholder="Enter location"
                            className="mt-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit-employees">Employees</Label>
                            <Input
                                id="edit-employees"
                                type="number"
                                value={editFormData?.employees || 0}
                                onChange={(e) => setEditFormData(editFormData ? { ...editFormData, employees: parseInt(e.target.value) } : null)}
                                placeholder="0"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-products">Products</Label>
                            <Input
                                id="edit-products"
                                type="number"
                                value={editFormData?.products || 0}
                                onChange={(e) => setEditFormData(editFormData ? { ...editFormData, products: parseInt(e.target.value) } : null)}
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

export default BranchEditModal;