import React from 'react';
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-2">
                <div className="flex p-2 items-center justify-center rounded-md bg-sidebar-primary
                text-sidebar-primary-foreground font-bold">
                    SH
                </div>
                <div className="flex flex-col w-fit">
                    <span className="text-lg font-bold text-sidebar-foreground">SaleHub Pro</span>
                    <span className="text-xs italic text-sidebar-foreground">Admin Panel</span>
                </div>
            </div>
        </Link>
    );
};

export default Logo;