import React from 'react';
import {suppliers} from "@/constants";
import StatsCard from "@/components/pages/Suppliers/Stats/StatsCard";


const stats = [
    {
        label: "Active Suppliers",
        value: suppliers.filter(s => s.status === 'Active').length
    },
    {
        label: "Total Orders",
        value: suppliers.reduce((sum, s) => sum + s.ordersCount, 0)
    },
    {
        label: "Total Value",
        value: "$512K"
    },
    {
        label: "Avg Rating",
        value: "4.6★"
    }
]


const StatsCards = () => {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            {stats.map((stat) => (
                <StatsCard value={stat.value} label={stat.label}/>
            ))}
        </div>
    );
};

export default StatsCards;