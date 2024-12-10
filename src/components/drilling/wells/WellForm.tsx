import React from 'react';
import type { Well } from '../../../types/drilling';

interface WellFormProps {
  onSubmit: (well: Omit<Well, 'id'>) => void;
  onCancel: () => void;
  initialData?: Partial<Well>;
}

export function WellForm({ onSubmit, onCancel, initialData }: WellFormProps) {
  const [formData, setFormData] = React.useState<Omit<Well, 'id'>>({
    name: initialData?.name || '',
    location: {
      latitude: initialData?.location?.latitude || 0,
      longitude: initialData?.location?.longitude || 0,
      field: initialData?.location?.field || '',
      block: initialData?.location?.block || '',
    },
    status: initialData?.status || 'planned',
    type: initialData?.type || 'exploration',
    depth: {
      planned: initialData?.depth?.planned || 0,
      current: initialData?.depth?.current || 0,
      unit: initialData?.depth?.unit || 'meters',
    },
    spudDate: initialData?.spudDate || '',
    completionDate: initialData?.completionDate || '',
    operator: initialData?.operator || '',
    contractor: initialData?.contractor || '',
    rigId: initialData?.rigId || '',
    metrics: {
      npTime: initialData?.metrics?.npTime || 0,
      efficiency: initialData?.metrics?.efficiency || 100,
      costPerFoot: initialData?.metrics?.costPerFoot || 0,
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
          <label className="block text-sm font-medium text-gray-700">Well Name</label>
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
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Well['type'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="exploration">Exploration</option>
            <option value="development">Development</option>
            <option value="injection">Injection</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Field</label>
          <input
            type="text"
            value={formData.location.field}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, field: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Block</label>
          <input
            type="text"
            value={formData.location.block}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, block: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            value={formData.location.latitude}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, latitude: parseFloat(e.target.value) },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            value={formData.location.longitude}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, longitude: parseFloat(e.target.value) },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Planned Depth</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="number"
              value={formData.depth.planned}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  depth: { ...formData.depth, planned: parseFloat(e.target.value) },
                })
              }
              className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
            />
            <select
              value={formData.depth.unit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  depth: { ...formData.depth, unit: e.target.value as 'meters' | 'feet' },
                })
              }
              className="rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="meters">meters</option>
              <option value="feet">feet</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Well['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="planned">Planned</option>
            <option value="drilling">Drilling</option>
            <option value="completed">Completed</option>
            <option value="suspended">Suspended</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Operator</label>
          <input
            type="text"
            value={formData.operator}
            onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Spud Date</label>
          <input
            type="date"
            value={formData.spudDate}
            onChange={(e) => setFormData({ ...formData, spudDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Completion Date</label>
          <input
            type="date"
            value={formData.completionDate}
            onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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
          Save Well
        </button>
      </div>
    </form>
  );
}