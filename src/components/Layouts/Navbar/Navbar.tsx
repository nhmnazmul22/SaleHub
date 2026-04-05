'use client'

import {Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'
import {Button} from '@/components/ui/button'
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"


const Navbar = () => {
    const { theme, setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background px-3 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <SidebarTrigger />
                
                <div className="flex items-center gap-2 md:gap-4">
                    <Select>
                        <SelectTrigger className="w-full max-w-48 border-border dark:border-neutral-700">
                            <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value="apple">Dhaka Branch</SelectItem>
                                <SelectItem value="banana">Cumilla Branch</SelectItem>
                                <SelectItem value="blueberry">Demra Branch</SelectItem>
                                <SelectItem value="grapes">Chittagong Branch</SelectItem>
                                <SelectItem value="pineapple">Barishal Branch</SelectItem>
                        </SelectContent>
                    </Select>
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