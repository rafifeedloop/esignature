'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { TemplateEditor } from '@/components/document/template-editor';
import { SigningWorkflow } from '@/components/document/signing-workflow';
import { AuditTrail } from '@/components/compliance/audit-trail';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentDocuments } from '@/components/dashboard/recent-documents';
import { useDocumentStore } from '@/lib/stores/document-store';
import { industries } from '@/lib/data/industries';
import { Industry, UseCase, Template, SigningMode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'template' | 'signing' | 'complete'>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [documentData, setDocumentData] = useState<Record<string, any>>({});

  const {
    documents,
    currentDocument,
    addDocument,
    addSigner,
    updateDocument,
    addAuditLog,
  } = useDocumentStore();

  const handleSelectTemplate = (industry: Industry, useCase: UseCase, templateId: string) => {
    const template = useCase.templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setSelectedIndustry(industry);
      setCurrentView('template');
    }
  };

  const handleTemplateSubmit = (data: Record<string, any>) => {
    setDocumentData(data);

    // Create document in store
    addDocument({
      templateId: selectedTemplate!.id,
      title: `${selectedTemplate!.name} - ${data.full_name || data.borrower_name || data.patient_name || 'New Document'}`,
      status: 'draft',
      fields: data,
      signers: [],
      signingMode: 'sequential',
    });

    setCurrentView('signing');
  };

  const handleAddSigner = (signer: any) => {
    if (currentDocument) {
      addSigner(currentDocument.id, signer);
    }
  };

  const handleSendForSignature = () => {
    if (currentDocument) {
      updateDocument(currentDocument.id, { status: 'pending' });
      addAuditLog(currentDocument.id, {
        action: 'Sent for Signature',
        userId: 'user_1',
        userName: 'Current User',
        ipAddress: '127.0.0.1',
        details: `Document sent to ${currentDocument.signers.length} signers`,
      });
      setCurrentView('complete');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <DashboardStats />
            <RecentDocuments documents={documents} />
          </div>
        );

      case 'template':
        return selectedTemplate ? (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setCurrentView('dashboard')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h2 className="text-2xl font-semibold text-gray-900">
                Fill Document Details
              </h2>
              <p className="text-gray-600 mt-1">
                Complete the required fields below to prepare your document for signing.
              </p>
            </div>
            <TemplateEditor
              template={selectedTemplate}
              onSubmit={handleTemplateSubmit}
            />
          </div>
        ) : null;

      case 'signing':
        return currentDocument ? (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setCurrentView('template')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Template
              </Button>
              <h2 className="text-2xl font-semibold text-gray-900">
                Configure Signing Workflow
              </h2>
              <p className="text-gray-600 mt-1">
                Add signers and configure how the document will be signed.
              </p>
            </div>
            <SigningWorkflow
              signers={currentDocument.signers}
              signingMode={currentDocument.signingMode}
              onAddSigner={handleAddSigner}
              onRemoveSigner={(id) => console.log('Remove signer:', id)}
              onChangeMode={(mode: SigningMode) =>
                updateDocument(currentDocument.id, { signingMode: mode })
              }
              onSendForSignature={handleSendForSignature}
            />
          </div>
        ) : null;

      case 'complete':
        return currentDocument ? (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Document Sent Successfully!
              </h2>
              <p className="text-gray-600 mt-1">
                Your document has been sent to all signers. You'll receive notifications as they sign.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SigningWorkflow
                  signers={currentDocument.signers}
                  signingMode={currentDocument.signingMode}
                  onAddSigner={() => {}}
                  onRemoveSigner={() => {}}
                  onChangeMode={() => {}}
                  onSendForSignature={() => {}}
                />
              </div>
              <div>
                <AuditTrail
                  logs={currentDocument.auditTrail}
                  compliance={selectedTemplate?.compliance || []}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button onClick={() => setCurrentView('dashboard')}>
                Back to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-120px)]">
        <Sidebar onSelectTemplate={handleSelectTemplate} />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
        {currentView === 'template' && selectedTemplate && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-auto">
            <AuditTrail
              logs={currentDocument?.auditTrail || []}
              compliance={selectedTemplate.compliance}
            />
          </div>
        )}
      </div>
    </div>
  );
}
