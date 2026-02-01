import {ForwardRefExoticComponent, RefAttributes} from "react";
import {LucideProps} from "lucide-react";

export interface StatType  {
    title: string,
    value: string |number,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    trend: { value: number, isUp: boolean },
    color: string,
}
export  interface ItemType{
    id: string |number,
    name: string,
    sku: string,
    branch: string,
    currentQty: number,
    threshold: number,
    status: string,
}


export interface Branch {
    id: number
    name: string
    location: string
    status: string
    employees: number
    products: number
    revenue?: string
    orders?: number
    growth?: string
}