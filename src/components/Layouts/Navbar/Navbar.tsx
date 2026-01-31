'use client'

import {Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'
import {Button} from '@/components/ui/button'
import {SidebarTrigger} from "@/components/ui/sidebar";


const Navbar = () => {
    const { theme, setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background px-3 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <SidebarTrigger />
                <h1 className="hidden text-xl font-semibold text-foreground md:block md:flex-1 md:text-center lg:text-left">
                    Dashboard
                </h1>

                <div className="flex items-center gap-2 md:gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                        className="group cursor-pointer"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5 dark:text-white group-hover:dark:text-white!" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Navbar;