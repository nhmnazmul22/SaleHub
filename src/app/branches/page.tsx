import React from 'react';
import PageHeader from "@/components/common/Headers/PageHeader";
import BranchList from "@/components/pages/Branches/BrancheList/BranchList";

const BranchesPage = () => {
    const handleCreate = async () => {
        "use server";
        alert('Create new branch modal')
    }

    return (
        <div>
            <div className="space-y-8">
                <PageHeader
                    title="Branches"
                    des="Manage and monitor all your business locations"
                    isAction={true}
                    createActionHandler={handleCreate}
                    actionBtnLabel="New Branch"
                />
              <BranchList/>
            </div>
        </div>
    );
};

export default BranchesPage;