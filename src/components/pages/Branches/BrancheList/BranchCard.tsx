"use client";
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertCircle, Edit2, Eye, MapPin, Package, Trash2, TrendingUp, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Branch} from "@/types";

interface BranchCardProps {
    branch: Branch
}

const BranchCard = ({branch}: BranchCardProps) => {

    const handleView = (id: number) => {
    }

    const handleEdit = (id: number) => {
    }

    const handleDelete = (id: number) => {
    }


    return (
        <Card
            key={branch.id}
            className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card"
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-semibold truncate">{branch.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{branch.location}</span>
                        </CardDescription>
                    </div>
                    <Badge
                        variant={branch.status === 'Active' ? 'default' : 'secondary'}
                        className="shrink-0 text-xs"
                    >
                        {branch.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Primary Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 p-2.5 rounded-lg bg-muted/40">
                        <p className="text-xs font-medium text-muted-foreground">Revenue</p>
                        <p className="text-sm font-bold text-foreground">{branch.revenue}</p>
                        {branch.growth && branch.growth !== '0%' && (
                            <p className="text-xs text-primary flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {branch.growth}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1 p-2.5 rounded-lg bg-muted/40">
                        <p className="text-xs font-medium text-muted-foreground">Orders</p>
                        <p className="text-sm font-bold text-foreground">{branch.orders}</p>
                        <p className="text-xs text-muted-foreground">this month</p>
                    </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1 p-2.5 rounded-lg bg-muted/40">
                        <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <p className="text-xs font-medium text-muted-foreground">Staff</p>
                        </div>
                        <p className="text-sm font-bold text-foreground">{branch.employees}</p>
                    </div>
                    <div className="space-y-1 p-2.5 rounded-lg bg-muted/40">
                        <div className="flex items-center gap-1">
                            <Package className="h-3.5 w-3.5 text-muted-foreground" />
                            <p className="text-xs font-medium text-muted-foreground">Inventory</p>
                        </div>
                        <p className="text-sm font-bold text-foreground">{branch.products}</p>
                    </div>
                </div>

                {/* Inactive Branch Warning */}
                {branch.status === 'Inactive' && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                        <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                        <p className="text-xs text-destructive font-medium">Not operational</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-1 h-8"
                        onClick={() => handleView(branch.id)}
                    >
                        <Eye className="h-3.5 w-3.5" />
                        <span className="text-xs">View</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-1 h-8"
                        onClick={() => handleEdit(branch.id)}
                    >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span className="text-xs">Edit</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-1 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(branch.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="text-xs">Delete</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BranchCard;