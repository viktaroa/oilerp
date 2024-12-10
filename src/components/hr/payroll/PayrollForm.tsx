import React from 'react';
import type { PayrollRecord, Employee } from '../../../types/hr';

interface PayrollFormProps {
  onSubmit: (payroll: Omit<PayrollRecord, 'id'>) => void;
  onCancel: () => void;
  employees: Employee[];
}

export function PayrollForm({ onSubmit, onCancel, employees }: PayrollFormProps) {
  const [formData, setFormData] = React.useState<Omit<PayrollRecord, 'id'>>({
    employeeId: '',
    period: new Date().toISOString().split('T')[0].substring(0, 7),
    basePay: 0,
    overtime: 0,
    deductions: {
      tax: 0,
      insurance: 0,
      other: 0,
    },
    allowances: {
      housing: 0,
      transport: 0,
      other: 0,
    },
    netPay: 0,
    status: 'pending',
    notes: '',
  });

  const calculateNetPay = React.useCallback(() => {
    const totalDeductions = Object.values(formData.deductions).reduce((a, b) => a + b, 0);
    const totalAllowances = Object.values(formData.allowances).reduce((a, b) => a + b, 0);
    const netPay = formData.basePay + formData.overtime + totalAllowances - totalDeductions;
    setFormData(prev => ({ ...prev, netPay }));
  }, [formData.basePay, formData.overtime, formData.deductions, formData.allowances]);

  React.useEffect(() => {
    calculateNetPay();
  }, [formData.basePay, formData.overtime, formData.deductions, formData.allowances, calculateNetPay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee</label>
          <select
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Employee</option>
            {employees
              .filter((e) => e.status === 'active')
              .map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Period</label>
          <input
            type="month"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Base Pay</label>
          <input
            type="number"
            value={formData.basePay}
            onChange={(e) => setFormData({ ...formData, basePay: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Overtime</label>
          <input
            type="number"
            value={formData.overtime}
            onChange={(e) => setFormData({ ...formData, overtime: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Deductions</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax</label>
            <input
              type="number"
              value={formData.deductions.tax}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deductions: { ...formData.deductions, tax: parseFloat(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Insurance</label>
            <input
              type="number"
              value={formData.deductions.insurance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deductions: { ...formData.deductions, insurance: parseFloat(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Other Deductions</label>
            <input
              type="number"
              value={formData.deductions.other}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deductions: { ...formData.deductions, other: parseFloat(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Allowances</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Housing</label>
            <input
              type="number"
              value={formData.allowances.housing}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allowances: { ...formData.allowances, housing: parseFloat(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transport</label>
            <input
              type="number"
              value={formData.allowances.transport}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allowances: { ...formData.allowances, transport: parseFloat(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Other Allowances</label>
            <input
              type="number"
              value={formData.allowances.other}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allowances: { ...formData.allowances, other: parseFloat(e.target.value) },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 rounded-lg">
        <div className="text-lg font-medium text-gray-900">
          Net Pay: ${formData.netPay.toLocaleString()}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          Process Payroll
        </button>
      </div>
    </form>
  );
}