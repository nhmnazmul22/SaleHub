import {stats} from "@/constants";
import StatsCard from "@/components/pages/Home/StatsCards/StatsCard";


const StatsCards = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <StatsCard key={index} stat={stat}/>
            ))}
        </div>
    );
};

export default StatsCards;