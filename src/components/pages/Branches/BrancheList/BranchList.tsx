import {initialBranches} from "@/constants";
import BranchCard from "@/components/pages/Branches/BrancheList/BranchCard";

const BranchList = () => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {initialBranches.map((branch) => (
                <BranchCard key={branch.id} branch={branch}/>
            ))}
        </div>
    );
};

export default BranchList;