import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { z } from "zod";
import mongoose from "mongoose";

export interface StatType {
  title: string;
  value: string | number;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  trend: { value: number; isUp: boolean };
  color: string;
}
export interface ItemType {
  id: string | number;
  name: string;
  sku: string;
  branch: string;
  currentQty: number;
  threshold: number;
  status: string;
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  status: string;
  employees: number;
  products: number;
  revenue?: string;
  orders?: number;
  growth?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  status: string;
  stock: number;
}

export interface SalesOrder {
  id: string;
  customer: string;
  items: number;
  total: string;
  date: string;
  status: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Inactive";
  ordersCount: number;
  totalValue: string;
  rating: number;
}

export const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });
