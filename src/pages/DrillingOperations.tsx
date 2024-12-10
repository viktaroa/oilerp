import React from 'react';
import { RigList } from '../components/drilling/rigs/RigList';

export function DrillingOperations() {
  const [activeTab, setActiveTab] = React.useState<'rigs' | 'wells' | 'operations'>('rigs');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Drilling Operations</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'rigs', name: 'Rig Management' },
            { id: 'wells', name: 'Well Management' },
            { id: 'operations', name: 'Operations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'rigs' && <RigList />}
        {activeTab === 'wells' && <div>Well Management interface will be implemented here.</div>}
        {activeTab === 'operations' && (
          <div>Operations management interface will be implemented here.</div>
        )}
      </div>
    </div>
  );
}