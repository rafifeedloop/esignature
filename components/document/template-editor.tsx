'use client';

import { Template, TemplateField } from '@/lib/types';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, CheckSquare, Hash, Mail, PenTool, Type } from 'lucide-react';
import { useState } from 'react';

interface TemplateEditorProps {
  template: Template;
  onSubmit: (data: Record<string, any>) => void;
}

const fieldIcons: Record<string, any> = {
  text: Type,
  number: Hash,
  date: Calendar,
  email: Mail,
  signature: PenTool,
  checkbox: CheckSquare,
  select: Type,
};

export function TemplateEditor({ template, onSubmit }: TemplateEditorProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    template.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }

      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Invalid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: TemplateField) => {
    const Icon = fieldIcons[field.type] || Type;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return (
          <div key={field.id} className="flex items-start space-x-2">
            <Icon className="h-4 w-4 text-gray-400 mt-2" />
            <Input
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              error={errors[field.id]}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="flex items-start space-x-2">
            <Icon className="h-4 w-4 text-gray-400 mt-2" />
            <Select
              label={field.label}
              required={field.required}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              options={
                field.options?.map((opt) => ({ value: opt, label: opt })) || []
              }
              error={errors[field.id]}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.id}
              checked={formData[field.id] || false}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor={field.id} className="text-sm text-gray-700">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </label>
            {errors[field.id] && (
              <span className="text-sm text-error">{errors[field.id]}</span>
            )}
          </div>
        );

      case 'signature':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
              <PenTool className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Click to add signature
              </p>
              {formData[field.id] && (
                <p className="text-xs text-success mt-2">Signature added</p>
              )}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleFieldChange(field.id, 'signature_placeholder')}
            >
              Add Signature
            </Button>
            {errors[field.id] && (
              <p className="text-sm text-error">{errors[field.id]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{template.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          </div>
          <div className="flex gap-2">
            {template.compliance.map((comp) => (
              <Badge key={comp} variant="info">
                {comp}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {template.fields.map(renderField)}

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="secondary">
              Save as Draft
            </Button>
            <Button type="submit">Continue to Signing</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}