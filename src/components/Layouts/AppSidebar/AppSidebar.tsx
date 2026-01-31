import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/components/common/Logo/Logo";
import {Separator} from "@/components/ui/separator";
import {menuItems} from "@/constants";
import Link from "next/link";
import {NavUser} from "./NavUser";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="px-5 py-3">
        <Logo />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="mt-5">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link className="p-5" href={item.id}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: "Jhon Deo", email: "name@example.com", avatar: "" }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
