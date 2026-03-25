import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {BarChart3, TrendingUp} from 'lucide-react'

export default function Chart() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle>Sales Trend</CardTitle>
                </div>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                    <div className="text-center">
                        <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
                        <p className="text-sm font-medium text-muted-foreground">
                            Chart placeholder – integrate Recharts later
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Sales trend data will be displayed here
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
