import StatsCards from "@/components/pages/Home/StatsCards/StatsCards";
import LowStockProduct from "@/components/pages/Home/LowStockProducts/LowStockProduct";
import RecentTransactions from "@/components/pages/Home/RecentTransactions/RecentTransactions";
import Chart from "@/components/pages/Home/Chart/Chart";

export default function Home() {
  return (
    <div>
        <StatsCards/>
        <div className="grid gap-6 lg:grid-cols-3 mt-5">
            <div className="col-span-2">
                <LowStockProduct/>
            </div>
            <div>
                <RecentTransactions/>
            </div>
        </div>
        <div className="mt-5 w-full">
            <Chart/>
        </div>
    </div>
  );
}
