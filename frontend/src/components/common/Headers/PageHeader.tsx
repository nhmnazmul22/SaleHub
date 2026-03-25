"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

interface PageHeaderProps {
    title: string,
    des: string,
    isAction?: boolean,
    createActionHandler?: ()=>void;
    actionBtnLabel?: string
}


const PageHeader = ({title, des, isAction, createActionHandler, actionBtnLabel}: PageHeaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                <p className="text-muted-foreground mt-1">{des}</p>
            </div>
            {isAction && (
                <Button onClick={createActionHandler} className="gap-2 h-10 dark:text-slate-300">
                    <Plus className="h-4 w-4" />
                    {actionBtnLabel}
                </Button>
            )}
        </div>
    );
};

export default PageHeader;