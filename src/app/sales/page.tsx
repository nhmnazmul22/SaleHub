import React from 'react';
import PageHeader from "@/components/common/Headers/PageHeader";
import SalesTable from "@/components/pages/Sales/SalesTable/SalesTable";

const SalesPage = () => {
    const handleCreate =async ()=>{
        "use server";
        console.log("I am creating sale")
    }
    return (
        <div className="space-y-8">
            <PageHeader
             title={"Sales"}
             des={"Track and manage sales orders"}
              isAction={true}
             createActionHandler={handleCreate}
             actionBtnLabel={"New Sales Order"}
            />
           <SalesTable/>
        </div>
    );
};

export default SalesPage;