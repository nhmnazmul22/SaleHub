import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {ArrowDown, ArrowUp} from 'lucide-react'
import {StatType} from "@/types";

const StatsCard = ({stat}: {stat: StatType}) => {
    const Icon = stat.icon
    const TrendIcon = stat.trend.isUp ? ArrowUp : ArrowDown

    return (
        <Card className="overflow-hidden">
            <CardContent className="px-6 py-2">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                        <div className="mt-4 flex items-center gap-2">
                            {stat.trend.isUp ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                                    <TrendIcon className="mr-1 h-3 w-3" />
                                    {stat.trend.value}%
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">
                                    <TrendIcon className="mr-1 h-3 w-3" />
                                    {stat.trend.value}%
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className={`rounded-lg p-3 ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard;