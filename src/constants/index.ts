import {
    AlertTriangle,
    BarChart3,
    Building2,
    DollarSign,
    History,
    Home,
    Layers,
    Package,
    ShoppingCart,
    Truck,
    Zap
} from "lucide-react";
import {Branch, Product} from "@/types";

export const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'branches', label: 'Branches', icon: Building2, href: '/branches' },
    { id: 'products', label: 'Products', icon: Package, href: '/products' },
    { id: 'inventory', label: 'Inventory', icon: Layers, href: '/inventory' },
    { id: 'sales', label: 'Sales', icon: ShoppingCart, href: '/sales' },
    { id: 'purchases', label: 'Purchases', icon: Truck, href: '/purchases' },
    { id: 'transactions', label: 'Transactions', icon: History, href: '/transactions' },
    { id: 'reports', label: 'Reports', icon: BarChart3, href: '/reports' },
]

export const stats = [
    {
        title: 'Total Products',
        value: '1,248',
        icon: Package,
        trend: { value: 12, isUp: true },
        color: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    },
    {
        title: 'Stock Value',
        value: '$124,580',
        icon: DollarSign,
        trend: { value: 8, isUp: true },
        color: 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400',
    },
    {
        title: 'Low Stock Items',
        value: '34',
        icon: AlertTriangle,
        trend: { value: 5, isUp: false },
        color: 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
    },
    {
        title: "Today's Sales",
        value: '$8,420',
        icon: Zap,
        trend: { value: 23, isUp: true },
        color: 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    },
]

export const items = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        sku: 'WH-1000XM4',
        branch: 'Main Branch',
        currentQty: 5,
        threshold: 20,
        status: 'critical',
    },
    {
        id: 2,
        name: 'USB-C Lightning Cable',
        sku: 'USB-LC-001',
        branch: 'Downtown Store',
        currentQty: 8,
        threshold: 50,
        status: 'critical',
    },
    {
        id: 3,
        name: 'Smartphone Case (Blue)',
        sku: 'CASE-BLU-L',
        branch: 'Mall Branch',
        currentQty: 12,
        threshold: 30,
        status: 'warning',
    },
    {
        id: 4,
        name: 'Phone Screen Protector',
        sku: 'SCREEN-PRO',
        branch: 'Main Branch',
        currentQty: 15,
        threshold: 40,
        status: 'warning',
    },
    {
        id: 5,
        name: 'Portable Power Bank 20K',
        sku: 'POWER-20K',
        branch: 'Airport Store',
        currentQty: 3,
        threshold: 15,
        status: 'critical',
    },
]

export const transactions = [
    {
        id: 1,
        date: 'Jan 28, 2025',
        type: 'Sale',
        branch: 'Main Branch',
        total: '$1,240',
        status: 'Completed',
        icon: ShoppingCart,
    },
    {
        id: 2,
        date: 'Jan 27, 2025',
        type: 'Purchase',
        branch: 'Downtown',
        total: '$3,850',
        status: 'Pending',
        icon: Truck,
    },
    {
        id: 3,
        date: 'Jan 26, 2025',
        type: 'Transfer',
        branch: 'Mall Branch',
        total: '$680',
        status: 'Completed',
        icon: Package,
    },
    {
        id: 4,
        date: 'Jan 25, 2025',
        type: 'Sale',
        branch: 'Airport',
        total: '$2,120',
        status: 'Completed',
        icon: ShoppingCart,
    },
]


export const initialBranches: Branch[] = [
    { id: 1, name: 'Main Branch', location: 'New York, NY', status: 'Active', employees: 12, products: 450, revenue: '$125,450', orders: 342, growth: '+12.5%' },
    { id: 2, name: 'Downtown Store', location: 'Los Angeles, CA', status: 'Active', employees: 8, products: 320, revenue: '$98,230', orders: 267, growth: '+8.3%' },
    { id: 3, name: 'Airport Hub', location: 'Chicago, IL', status: 'Active', employees: 6, products: 280, revenue: '$76,890', orders: 189, growth: '+5.2%' },
    { id: 4, name: 'Warehouse East', location: 'Miami, FL', status: 'Inactive', employees: 0, products: 0, revenue: '$0', orders: 0, growth: '0%' },
]

export  const initialProducts: Product[] = [
    { id: 'SKU001', name: 'Wireless Mouse', category: 'Electronics', price: '$29.99', status: 'Active', stock: 145 },
    { id: 'SKU002', name: 'USB-C Cable', category: 'Accessories', price: '$12.99', status: 'Active', stock: 320 },
    { id: 'SKU003', name: 'Mechanical Keyboard', category: 'Electronics', price: '$79.99', status: 'Active', stock: 45 },
    { id: 'SKU004', name: 'Monitor Stand', category: 'Furniture', price: '$45.00', status: 'Active', stock: 62 },
    { id: 'SKU005', name: 'Desk Lamp', category: 'Lighting', price: '$34.99', status: 'Low Stock', stock: 8 },
]


export const inventoryItems = [
    { id: 1, product: 'Wireless Mouse', branch: 'Main Branch', quantity: 145, threshold: 50, status: 'Optimal' },
    { id: 2, product: 'USB-C Cable', branch: 'Downtown Store', quantity: 320, threshold: 100, status: 'Optimal' },
    { id: 3, product: 'Mechanical Keyboard', branch: 'Airport Hub', quantity: 45, threshold: 30, status: 'Low' },
    { id: 4, product: 'Monitor Stand', branch: 'Main Branch', quantity: 8, threshold: 20, status: 'Critical' },
    { id: 5, product: 'Desk Lamp', branch: 'Downtown Store', quantity: 120, threshold: 40, status: 'Optimal' },
]