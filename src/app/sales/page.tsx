import React from 'react';
import PageHeader from "@/components/common/Headers/PageHeader";

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
           <SalesPage/>
        </div>
    );
};

export default SalesPage;