'use client';

import { cn } from '@/lib/utils';
import { industries } from '@/lib/data/industries';
import { Industry, UseCase } from '@/lib/types';
import {
  Building,
  Shield,
  Heart,
  Factory,
  Home,
  GraduationCap,
  Building2,
  ShoppingCart,
  Hotel,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  onSelectTemplate: (industry: Industry, useCase: UseCase, templateId: string) => void;
}

const iconMap: Record<string, any> = {
  Building,
  Shield,
  Heart,
  Factory,
  Home,
  GraduationCap,
  Building2,
  ShoppingCart,
  Hotel,
};

export function Sidebar({ onSelectTemplate }: SidebarProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [expandedIndustry, setExpandedIndustry] = useState<Industry | null>(null);

  const handleIndustryClick = (industry: Industry) => {
    setSelectedIndustry(industry);
    setExpandedIndustry(expandedIndustry === industry ? null : industry);
    setSelectedUseCase(null);
  };

  const handleUseCaseClick = (industry: Industry, useCase: UseCase) => {
    setSelectedIndustry(industry);
    setSelectedUseCase(useCase);
  };

  return (
    <div className="w-60 bg-white border-r border-gray-200 shadow-sm h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
          Industry & Use Cases
        </h2>

        <nav className="space-y-1">
          {Object.entries(industries).map(([key, industry]) => {
            const Icon = iconMap[industry.icon] || FileText;
            const isExpanded = expandedIndustry === key;
            const isSelected = selectedIndustry === key;

            return (
              <div key={key}>
                <button
                  onClick={() => handleIndustryClick(key as Industry)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isSelected
                      ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 mr-3" />
                    {industry.name}
                  </div>
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isExpanded && 'transform rotate-90'
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {industry.useCases.map((useCase) => (
                      <div key={useCase.id}>
                        <button
                          onClick={() => handleUseCaseClick(key as Industry, useCase)}
                          className={cn(
                            'w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors',
                            selectedUseCase?.id === useCase.id
                              ? 'bg-gray-100 text-primary-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          )}
                        >
                          {useCase.name}
                        </button>

                        {selectedUseCase?.id === useCase.id && (
                          <div className="ml-3 mt-1 space-y-0.5">
                            {useCase.templates.map((template) => (
                              <button
                                key={template.id}
                                onClick={() =>
                                  onSelectTemplate(key as Industry, useCase, template.id)
                                }
                                className="w-full text-left px-3 py-1 text-xs text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                <FileText className="inline h-3 w-3 mr-1" />
                                {template.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Quick Links
        </h3>
        <div className="space-y-1">
          <button className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            Recent Documents
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            Templates Library
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            Compliance Center
          </button>
        </div>
      </div>
    </div>
  );
}