import {Home, Building2, Package, Layers, ShoppingCart, Truck, History, BarChart3} from "lucide-react";

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
