import PageHeader from "@/components/common/Headers/PageHeader";
import ProductTable from "@/components/pages/Products/ProductTable/ProductTable";

const ProductsPage = () => {

    const handleCreate = async  ()=> {"use server"; console.log('I am here')}


    return (
        <div>
            <div className="space-y-8">
                <PageHeader
                 title={"Products"}
                 des={"Manage your product catalog"}
                 isAction={true}
                 createActionHandler={handleCreate}
                 actionBtnLabel={"New Product"}
                />
                <ProductTable/>
            </div>

        </div>
    );
};

export default ProductsPage;