export interface SidebarItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export interface SidebarProps {
    items: SidebarItem[];
}