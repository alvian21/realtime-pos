import {
    Album,
    Armchair,
    LayoutDashboard,
    LucideIcon,
    SquareMenu,
    Users,
} from 'lucide-react';


type SidebarMenuItem = {
    title: string;
    url: string;
    icon: LucideIcon;
    required?: string; // opsional, hanya ada kalau menu butuh permission
};

export const SIDEBAR_MENU_LIST: Record<"admin" | "cashier" | "kitchen", SidebarMenuItem[]>  = {
    admin: [
        {
            title: 'Dashboard',
            url: '/admin',
            icon: LayoutDashboard,
        },
        {
            title: 'Order',
            url: '/order',
            icon: Album,
            required: "order.read"
        },
        {
            title: 'Menu',
            url: '/admin/menu',
            icon: SquareMenu,
            required: "menu.read"
        },
        {
            title: 'Table',
            url: '/admin/table',
            icon: Armchair,
            required: "table.read"
        },
        {
            title: 'User',
            url: '/admin/user',
            icon: Users,
            required: "user.read"
        },
        {
            title: 'Role',
            url: '/admin/role',
            icon: Users,
            required: "role.read"
        },
    ],
    cashier: [{
        title: 'Order',
        url: '/order',
        icon: Album,
    },],
    kitchen: [{
        title: 'Order',
        url: '/order',
        icon: Album,
    },],
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;