import StatsCards from "@/components/pages/Home/StatsCards/StatsCards";
import LowStockProduct from "@/components/pages/Home/LowStockProducts/LowStockProduct";
import RecentTransactions from "@/components/pages/Home/RecentTransactions/RecentTransactions";

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
    </div>
  );
}
