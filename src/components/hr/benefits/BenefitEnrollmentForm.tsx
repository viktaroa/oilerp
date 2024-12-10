import React from 'react';
import type { BenefitEnrollment, Benefit, Employee } from '../../../types/hr';
import { formatDate } from '../../../utils/date';

interface BenefitEnrollmentFormProps {
  onSubmit: (enrollment: Omit<BenefitEnrollment, 'id'>) => void;
  onCancel: () => void;
  benefit: Benefit;
  employee: Employee;
  existingEnrollment?: BenefitEnrollment;
}

export function BenefitEnrollmentForm({
  onSubmit,
  onCancel,
  benefit,
  employee,
  existingEnrollment,
}: BenefitEnrollmentFormProps) {
  const [formData, setFormData] = React.useState<Omit<BenefitEnrollment, 'id'>>({
    employeeId: employee.id,
    benefitId: benefit.id,
    coverageType: existingEnrollment?.coverageType || 'individual',
    startDate: existingEnrollment?.startDate || new Date().toISOString().split('T')[0],
    status: existingEnrollment?.status || 'pending',
    dependents: existingEnrollment?.dependents || [],
  });

  const [newDependent, setNewDependent] = React.useState({
    name: '',
    relationship: '',
    dateOfBirth: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addDependent = () => {
    if (newDependent.name && newDependent.relationship && newDependent.dateOfBirth) {
      setFormData({
        ...formData,
        dependents: [...(formData.dependents || []), newDependent],
      });
      setNewDependent({ name: '', relationship: '', dateOfBirth: '' });
    }
  };

  const removeDependent = (index: number) => {
    setFormData({
      ...formData,
      dependents: formData.dependents?.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 px-4 py-3 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">{benefit.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{benefit.description}</p>
        <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>Provider: {benefit.provider}</div>
          <div>Type: {benefit.type}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Coverage Type</label>
          <select
            value={formData.coverageType}
            onChange={(e) =>
              setFormData({
                ...formData,
                coverageType: e.target.value as BenefitEnrollment['coverageType'],
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="individual">Individual</option>
            <option value="family">Family</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Coverage Amount:{' '}
            {formData.coverageType === 'individual'
              ? `$${benefit.coverage.individual.toLocaleString()}`
              : `$${benefit.coverage.family.toLocaleString()}`}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min={benefit.enrollmentPeriod.start}
            max={benefit.enrollmentPeriod.end}
          />
          <p className="mt-1 text-sm text-gray-500">
            Enrollment Period: {formatDate(benefit.enrollmentPeriod.start)} -{' '}
            {formatDate(benefit.enrollmentPeriod.end)}
          </p>
        </div>
      </div>

      {formData.coverageType === 'family' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-900">Dependents</h4>
            <button
              type="button"
              onClick={addDependent}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Dependent
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newDependent.name}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Relationship</label>
              <input
                type="text"
                value={newDependent.relationship}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, relationship: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={newDependent.dateOfBirth}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, dateOfBirth: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {formData.dependents && formData.dependents.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Added Dependents</h5>
              <div className="space-y-2">
                {formData.dependents.map((dependent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="grid grid-cols-3 gap-4 flex-1">
                      <div className="text-sm text-gray-900">{dependent.name}</div>
                      <div className="text-sm text-gray-500">{dependent.relationship}</div>
                      <div className="text-sm text-gray-500">
                        {formatDate(dependent.dateOfBirth)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDependent(index)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
          {existingEnrollment ? 'Update Enrollment' : 'Submit Enrollment'}
        </button>
      </div>
    </form>
  );
}