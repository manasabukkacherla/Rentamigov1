import React from 'react';
import { ArrowLeft, Phone, HelpCircle, X } from 'lucide-react';
import { Step, StepStatus } from './Step';
import { ProgressBar } from './ProgressBar';

type StepInfo = {
  id: string;
  label: string;
  description: string;
  status: StepStatus;
};

type SidebarProps = {
  onClose?: () => void;
};

const steps: StepInfo[] = [
  { 
    id: 'details', 
    label: 'Property Details',
    description: 'Basic information about your property',
    status: 'in-progress' 
  },
  { 
    id: 'address', 
    label: 'Address',
    description: 'Location and address details',
    status: 'pending' 
  },
  { 
    id: 'photos', 
    label: 'Photos',
    description: 'Upload property photos',
    status: 'pending' 
  },
  { 
    id: 'verify', 
    label: 'Verify',
    description: 'Verify property details',
    status: 'pending' 
  },
  { 
    id: 'review', 
    label: 'Review',
    description: 'Final review and submit',
    status: 'pending' 
  },
];

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="w-[280px] sm:w-[320px] lg:w-80 bg-white border-r border-gray-200 h-full">
      <div className="sticky top-0 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Return to dashboard</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              Post your property
            </h1>
            <p className="text-sm text-gray-500">
              Fill in the details to list your property
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-700">Completion</span>
              <span className="text-sm font-medium text-purple-700">7%</span>
            </div>
            <ProgressBar progress={7} />
          </div>
        </div>

        {/* Steps */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4">
          <div className="py-4 space-y-1">
            {steps.map((step, index) => (
              <Step
                key={step.id}
                label={step.label}
                description={step.description}
                status={step.status}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Need help?</h3>
              <p className="text-sm text-gray-500 mt-0.5 mb-2">
                Our support team is here to assist you
              </p>
              <a 
                href="tel:08048811281" 
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                Call 08048811281
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}