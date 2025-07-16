import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';

const MinimalMenu = () => {
  const menuItems = [
    { 
      label: 'HOW IT WORKS', 
      href: '#how-it-works',
      dropdownItems: [
        { label: 'Getting Started', href: '#getting-started' },
        { label: 'Features', href: '#features' },
        { label: 'Tutorials', href: '#tutorials' },
      ]
    },
    { 
      label: 'COMPANY', 
      href: '#company',
      dropdownItems: [
        { label: 'About Us', href: '#about' },
        { label: 'Team', href: '#team' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
      ]
    }
  ];

  return (
    <NavigationMenu.Root className="relative z-10 flex max-w-max flex-1 items-center justify-center">
      <NavigationMenu.List className="group flex flex-1 list-none items-center justify-center space-x-6 mx-2">
        {menuItems.map((item, index) => (
          <NavigationMenu.Item key={index} className="relative">
            <NavigationMenu.Trigger className="group flex items-center text-gray-800 font-medium text-sm tracking-wide uppercase hover:text-gray-600 transition-colors duration-200 outline-none px-3 py-3 rounded-md focus:bg-gray-50 data-[state=open]:text-gray-600">
              <span>{item.label}</span>
              <ChevronDown 
                className="h-3 w-3 ml-1 transition-transform duration-200 group-data-[state=open]:rotate-180" 
                aria-hidden="true" 
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute left-0 top-full w-full sm:w-auto">
              <div className="bg-white border border-gray-200 shadow-lg rounded-md mt-1 min-w-[160px] overflow-hidden">
                <ul className="grid gap-1 p-1">
                  {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <li key={dropdownIndex}>
                      <NavigationMenu.Link
                        href={dropdownItem.href}
                        className="block w-full text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 px-3 py-2 rounded-sm text-sm outline-none focus:bg-gray-50 focus:text-gray-900"
                      >
                        {dropdownItem.label}
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
        
        <NavigationMenu.Indicator className="data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-gray-200 shadow-md" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute left-0 top-full flex justify-center">
        <NavigationMenu.Viewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default MinimalMenu;