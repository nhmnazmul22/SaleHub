import PageHeader from "@/components/common/Headers/PageHeader";
import InventoryTable from "@/components/pages/Inventory/InventoryTable/InventoryTable";


const InventoryPage = () => {
    return (
        <div className="space-y-8">
            <PageHeader
             title={"Inventory"}
             des={"Monitor stock levels across all branches"}
            />
           <InventoryTable/>
        </div>
    );
};

export default InventoryPage;