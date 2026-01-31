import {ForwardRefExoticComponent, RefAttributes} from "react";
import {LucideProps} from "lucide-react";

export interface StatType  {
    title: string,
    value: string |number,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    trend: { value: number, isUp: boolean },
    color: string,
}