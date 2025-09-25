'use client';

import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">E-Signature Platform</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-600"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-error rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </Button>

          <Button variant="ghost" size="sm">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      <nav className="flex space-x-8 mt-4">
        <button className="text-sm font-medium text-primary-600 border-b-2 border-primary-600 pb-1">
          Dashboard
        </button>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Documents
        </button>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Templates
        </button>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Reports
        </button>
      </nav>
    </header>
  );
}