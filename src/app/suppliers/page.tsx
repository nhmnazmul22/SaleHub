import React from 'react';
import PageHeader from "@/components/common/Headers/PageHeader";
import FilterSearch from "@/components/pages/Suppliers/FilterAndSearch/FilterSearch";
import StatsCards from "@/components/pages/Suppliers/Stats/StatsCards";
import SupplierTableCard from "@/components/pages/Suppliers/SupplierTable/SupplierTableCard";


const SupplierPage = () => {
    return (
        <section className="space-y-6">
            <PageHeader
                title={"Suppliers"}
                des={"Manage and track all your suppliers and vendors"}
                actionBtnLabel={"New Supplier"}
                isAction={true}
                createActionHandler={async () => {
                    "use server";
                }}
            />
            <FilterSearch/>
            <StatsCards/>
            <SupplierTableCard/>
        </section>
    );
};

export default SupplierPage;