import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"

type ItemInfo = {
    itemId: string | number
    title: string,
}

interface ShowAlertDialogProps {
    title?: string
    deleteOpen: boolean
    itemInfo: ItemInfo
    onDeleteOpenChange: (open: boolean) => void
    onDeleteConfirm: (id: number | string) => void
}

const DeleteAlertDialog = ({title , deleteOpen, onDeleteOpenChange, onDeleteConfirm, itemInfo}: ShowAlertDialogProps) => {
    return (
        <AlertDialog open={deleteOpen} onOpenChange={onDeleteOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title ? title : "Delete Important Things?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <span className="font-semibold text-foreground">{itemInfo.title}</span>? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => {
                            onDeleteConfirm(itemInfo.itemId)
                            onDeleteOpenChange(false)
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAlertDialog;