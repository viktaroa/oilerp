import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAppStore } from '../../store';

export function Header() {
  const user = useAppStore((state) => state.user);

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <button className="rounded-full p-1 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}