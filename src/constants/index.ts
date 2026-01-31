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