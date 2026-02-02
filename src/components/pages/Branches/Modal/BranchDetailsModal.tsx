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
import {MapPin, Package, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Branch} from "@/types";

interface BranchDetailsModalProps {
    viewOpen: boolean,
    onViewOpenChange: (open: boolean)=> void;
    selectedBranch: Branch
}


const BranchDetailsModal = ({viewOpen, onViewOpenChange, selectedBranch}: BranchDetailsModalProps) => {
    return (
        <Dialog open={viewOpen} onOpenChange={onViewOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Branch Details</DialogTitle>
                    <DialogDescription>View complete branch information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label className="text-muted-foreground text-sm">Branch Name</Label>
                        <p className="text-foreground font-medium mt-1">{selectedBranch.name}</p>
                    </div>
                    <div>
                        <Label className="text-muted-foreground text-sm flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location
                        </Label>
                        <p className="text-foreground font-medium mt-1">{selectedBranch.location}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground text-sm flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Employees
                            </Label>
                            <p className="text-foreground font-medium text-xl mt-1">{selectedBranch.employees}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground text-sm flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Products
                            </Label>
                            <p className="text-foreground font-medium text-xl mt-1">{selectedBranch.products}</p>
                        </div>
                    </div>
                    <div>
                        <Label className="text-muted-foreground text-sm">Status</Label>
                        <p className="text-foreground font-medium mt-1">{selectedBranch.status}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onViewOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BranchDetailsModal;