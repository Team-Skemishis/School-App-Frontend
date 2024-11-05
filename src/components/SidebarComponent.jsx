import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../assets/images/wink.gif'
import { Bell, Calendar, ChevronDown, FileText, Home, LogOut, MessageCircle, PieChart, Settings, Users, Users2 } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar"

// Navigation items for the sidebar
const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users2, label: 'Teachers', path: '/teachers' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: Users, label: 'Parents', path: '/parents' },
    { icon: FileText, label: 'Subjects', path: '/subjects' },
    { icon: Calendar, label: 'Classes', path: '/classes' },
    { icon: FileText, label: 'Lessons', path: '/lessons' },
    { icon: FileText, label: 'Exams', path: '/exams' },
    { icon: FileText, label: 'Assignments', path: '/assignments' },
    { icon: PieChart, label: 'Results', path: '/results' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Announcements', path: '/announcements' },
]

const SidebarComponent = ({ isSidebarOpen = true }) => {
    const [activePath, setActivePath] = useState('/')

    return (
        <SidebarProvider>
            <Sidebar className={`border-r bg-white ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}>
                <SidebarHeader className="border-b p-4">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg  p-1">
                            <img src={logo} alt="logo-image" className='w-7' />
                        </div>
                        <span className="text-xl font-bold font-righteousStatic">EduBridge</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={activePath === item.path}
                                        onClick={() => setActivePath(item.path)}
                                    >
                                        <Link to={item.path} className="flex items-center gap-3">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>

                    {/* Settings and Logout */}
                    <SidebarGroup className="mt-auto border-t">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/settings" className="flex items-center gap-3">
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button className="flex w-full items-center gap-3 text-red-600">
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}

SidebarComponent.propTypes = {
    isSidebarOpen: PropTypes.bool,
};

export default SidebarComponent