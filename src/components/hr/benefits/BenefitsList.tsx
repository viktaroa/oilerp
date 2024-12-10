import React from 'react';
import { Shield, Users, Calendar, DollarSign } from 'lucide-react';
import { useHRStore } from '../../../store/hrStore';
import { formatDate } from '../../../utils/date';
import type { Benefit } from '../../../types/hr';

export function BenefitsList() {
  const { benefits, employees, updateBenefit } = useHRStore();

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-4">
      {benefits.map((benefit) => (
        <div
          key={benefit.id}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{benefit.name}</h3>
                <p className="text-sm text-gray-500">{benefit.provider}</p>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusColors[benefit.status]
              }`}
            >
              {benefit.status}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Coverage</p>
                <p className="text-sm font-medium text-gray-900">
                  Individual: ${benefit.coverage.individual.toLocaleString()}
                  <br />
                  Family: ${benefit.coverage.family.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Enrolled Employees</p>
                <p className="text-sm font-medium text-gray-900">
                  {benefit.enrolledEmployees.length} / {employees.length}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Enrollment Period</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(benefit.enrollmentPeriod.start)} -{' '}
                  {formatDate(benefit.enrollmentPeriod.end)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">{benefit.description}</p>
          </div>

          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Eligibility</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Minimum Service: {benefit.eligibility.minServiceMonths} months
              </p>
              <p className="text-sm text-gray-500">
                Employment Types:{' '}
                {benefit.eligibility.employmentTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                  >
                    {type.replace('_', ' ')}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {benefit.status === 'active' && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => updateBenefit(benefit.id, { status: 'inactive' })}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Deactivate
              </button>
            </div>
          )}
        </div>
      ))}

      {benefits.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No benefits</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new benefit plan.
          </p>
        </div>
      )}
    </div>
  );
}