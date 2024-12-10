import React from 'react';
import type { Benefit, Employee } from '../../../types/hr';

interface BenefitsFormProps {
  onSubmit: (benefit: Omit<Benefit, 'id'>) => void;
  onCancel: () => void;
  employees: Employee[];
}

export function BenefitsForm({ onSubmit, onCancel }: BenefitsFormProps) {
  const [formData, setFormData] = React.useState<Omit<Benefit, 'id'>>({
    name: '',
    type: 'health',
    provider: '',
    coverage: {
      individual: 0,
      family: 0,
    },
    eligibility: {
      minServiceMonths: 0,
      employmentTypes: ['full_time'],
    },
    enrollmentPeriod: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    description: '',
    status: 'active',
    enrolledEmployees: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleEmploymentTypeChange = (type: Employee['employmentType']) => {
    setFormData((prev) => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        employmentTypes: prev.eligibility.employmentTypes.includes(type)
          ? prev.eligibility.employmentTypes.filter((t) => t !== type)
          : [...prev.eligibility.employmentTypes, type],
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Benefit Name</label>
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
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Benefit['type'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="health">Health Insurance</option>
            <option value="dental">Dental Insurance</option>
            <option value="vision">Vision Insurance</option>
            <option value="life">Life Insurance</option>
            <option value="retirement">Retirement Plan</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Provider</label>
          <input
            type="text"
            value={formData.provider}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Minimum Service (Months)</label>
          <input
            type="number"
            value={formData.eligibility.minServiceMonths}
            onChange={(e) =>
              setFormData({
                ...formData,
                eligibility: {
                  ...formData.eligibility,
                  minServiceMonths: parseInt(e.target.value),
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Coverage</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Individual Coverage</label>
            <input
              type="number"
              value={formData.coverage.individual}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coverage: {
                    ...formData.coverage,
                    individual: parseFloat(e.target.value),
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Family Coverage</label>
            <input
              type="number"
              value={formData.coverage.family}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coverage: {
                    ...formData.coverage,
                    family: parseFloat(e.target.value),
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Enrollment Period</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={formData.enrollmentPeriod.start}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  enrollmentPeriod: {
                    ...formData.enrollmentPeriod,
                    start: e.target.value,
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={formData.enrollmentPeriod.end}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  enrollmentPeriod: {
                    ...formData.enrollmentPeriod,
                    end: e.target.value,
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Eligible Employment Types</label>
        <div className="mt-2 space-x-4">
          {['full_time', 'part_time', 'contract'].map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.eligibility.employmentTypes.includes(type as Employee['employmentType'])}
                onChange={() => handleEmploymentTypeChange(type as Employee['employmentType'])}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{type.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
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
          Create Benefit
        </button>
      </div>
    </form>
  );
}