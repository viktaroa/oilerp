import React from 'react';
import type { DrillingRig } from '../../../types/drilling';

interface RigFormProps {
  onSubmit: (rig: Omit<DrillingRig, 'id'>) => void;
  onCancel: () => void;
  initialData?: Partial<DrillingRig>;
}

export function RigForm({ onSubmit, onCancel, initialData }: RigFormProps) {
  const [formData, setFormData] = React.useState<Omit<DrillingRig, 'id'>>({
    name: initialData?.name || '',
    type: initialData?.type || 'onshore',
    status: initialData?.status || 'standby',
    capacity: {
      hookload: initialData?.capacity?.hookload || 0,
      depth: initialData?.capacity?.depth || 0,
    },
    contractor: initialData?.contractor || '',
    crew: {
      dayshift: initialData?.crew?.dayshift || 0,
      nightshift: initialData?.crew?.nightshift || 0,
    },
    location: {
      current: initialData?.location?.current || '',
      next: initialData?.location?.next || '',
    },
    maintenance: {
      lastDate: initialData?.maintenance?.lastDate || new Date().toISOString().split('T')[0],
      nextDate: initialData?.maintenance?.nextDate || new Date().toISOString().split('T')[0],
      status: initialData?.maintenance?.status || 'up-to-date',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rig Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as DrillingRig['type'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="onshore">Onshore</option>
            <option value="offshore">Offshore</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as DrillingRig['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="active">Active</option>
            <option value="standby">Standby</option>
            <option value="maintenance">Maintenance</option>
            <option value="mobilizing">Mobilizing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contractor</label>
          <input
            type="text"
            value={formData.contractor}
            onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Capacity</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hookload (lbs)</label>
            <input
              type="number"
              value={formData.capacity.hookload}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: { ...formData.capacity, hookload: parseInt(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Depth Capacity (ft)</label>
            <input
              type="number"
              value={formData.capacity.depth}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: { ...formData.capacity, depth: parseInt(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Crew</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Day Shift</label>
            <input
              type="number"
              value={formData.crew.dayshift}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  crew: { ...formData.crew, dayshift: parseInt(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Night Shift</label>
            <input
              type="number"
              value={formData.crew.nightshift}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  crew: { ...formData.crew, nightshift: parseInt(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Location</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Location</label>
            <input
              type="text"
              value={formData.location.current}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, current: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Next Location</label>
            <input
              type="text"
              value={formData.location.next || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, next: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Maintenance</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Maintenance</label>
            <input
              type="date"
              value={formData.maintenance.lastDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintenance: { ...formData.maintenance, lastDate: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Next Maintenance</label>
            <input
              type="date"
              value={formData.maintenance.nextDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintenance: { ...formData.maintenance, nextDate: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maintenance Status</label>
            <select
              value={formData.maintenance.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintenance: {
                    ...formData.maintenance,
                    status: e.target.value as DrillingRig['maintenance']['status'],
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="up-to-date">Up to Date</option>
              <option value="due-soon">Due Soon</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Rig
        </button>
      </div>
    </form>
  );
}