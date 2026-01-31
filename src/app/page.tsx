import StatsCards from "@/components/pages/Home/StatsCards/StatsCards";
import LowStockProduct from "@/components/pages/Home/LowStockProducts/LowStockProduct";

export default function Home() {
  return (
    <div>
        <StatsCards/>
        <div className="grid gap-8 lg:grid-cols-3 mt-5">
            <div className="col-span-2">
                <LowStockProduct/>
            </div>
            <div>

            </div>
        </div>
    </div>
  );
}
