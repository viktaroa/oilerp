import React from 'react';
import { Shield, User, Calendar, CheckCircle } from 'lucide-react';
import { useHRStore } from '../../../store/hrStore';
import { formatDate } from '../../../utils/date';
import { BenefitEnrollmentForm } from './BenefitEnrollmentForm';

export function BenefitEnrollmentList() {
  const [selectedEnrollment, setSelectedEnrollment] = React.useState<string | null>(null);
  const { benefitEnrollments, benefits, employees, enrollInBenefit, terminateBenefitEnrollment } = useHRStore();

  const getBenefitDetails = (benefitId: string) => {
    return benefits.find(b => b.id === benefitId);
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    terminated: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-4">
      {benefitEnrollments.map((enrollment) => {
        const benefit = getBenefitDetails(enrollment.benefitId);
        if (!benefit) return null;

        return (
          <div
            key={enrollment.id}
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
                  statusColors[enrollment.status]
                }`}
              >
                {enrollment.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Employee</p>
                  <p className="text-sm font-medium text-gray-900">
                    {getEmployeeName(enrollment.employeeId)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Coverage Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {enrollment.coverageType}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(enrollment.startDate)}
                  </p>
                </div>
              </div>
            </div>

            {enrollment.dependents && enrollment.dependents.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Dependents</h4>
                <div className="space-y-2">
                  {enrollment.dependents.map((dependent, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-sm text-gray-900">{dependent.name}</div>
                        <div className="text-sm text-gray-500">{dependent.relationship}</div>
                        <div className="text-sm text-gray-500">
                          {formatDate(dependent.dateOfBirth)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {enrollment.status === 'active' && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => terminateBenefitEnrollment(enrollment.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Terminate Enrollment
                </button>
              </div>
            )}

            {selectedEnrollment === enrollment.id && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
                  <BenefitEnrollmentForm
                    benefit={benefit}
                    employee={employees.find(e => e.id === enrollment.employeeId)!}
                    existingEnrollment={enrollment}
                    onSubmit={(data) => {
                      enrollInBenefit(data);
                      setSelectedEnrollment(null);
                    }}
                    onCancel={() => setSelectedEnrollment(null)}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {benefitEnrollments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No enrollments</h3>
          <p className="mt-1 text-sm text-gray-500">
            No benefit enrollments found.
          </p>
        </div>
      )}
    </div>
  );
}