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