import React from 'react';

interface MenuItem {
  id: string
  label: string
  icon: React.ElementType
  path: string
}

interface SidebarProps {
  menuItems: MenuItem[]
  activeSection: string
  onSectionChange: (section: string) => void
}

const Sidebar = ({ menuItems, activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="h-full w-80 bg-white p-4 flex flex-col space-y-2 overflow-y-auto">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id

        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex items-center p-3 rounded-lg transition-colors w-full text-left ${
              isActive ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        )
      })}
    </aside>
  )
}

export default Sidebar
