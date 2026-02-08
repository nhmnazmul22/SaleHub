import React from 'react';
import {Card, CardContent} from "@/components/ui/card";

interface StatsCardProps {
    label: string,
    value: string | number
}

const StatsCard = ({label, value}: StatsCardProps) => {
    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
            </CardContent>
        </Card>
    );
};

export default StatsCard;