import React from 'react';
import {Download, Filter, Search} from "lucide-react";
import {Button} from "@/components/ui/button";

const FilterSearch = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div
                className="flex-1 flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-3 py-2 w-full sm:w-auto max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground shrink-0"/>
                <input
                    type="text"
                    placeholder="Search supplier..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4"/>
                    Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="h-4 w-4"/>
                    Export
                </Button>
            </div>
        </div>
    );
};

export default FilterSearch;