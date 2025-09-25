'use client';

import { useState } from 'react';
import { Signer, SigningMode } from '@/lib/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, X, Users, UserCheck, Clock, Mail } from 'lucide-react';

interface SigningWorkflowProps {
  signers: Signer[];
  signingMode: SigningMode;
  onAddSigner: (signer: Omit<Signer, 'id' | 'status'>) => void;
  onRemoveSigner: (signerId: string) => void;
  onChangeMode: (mode: SigningMode) => void;
  onSendForSignature: () => void;
}

export function SigningWorkflow({
  signers,
  signingMode,
  onAddSigner,
  onRemoveSigner,
  onChangeMode,
  onSendForSignature,
}: SigningWorkflowProps) {
  const [newSigner, setNewSigner] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleAddSigner = () => {
    if (newSigner.name && newSigner.email && newSigner.role) {
      onAddSigner(newSigner);
      setNewSigner({ name: '', email: '', role: '' });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'signed':
        return <Badge variant="success">Signed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'declined':
        return <Badge variant="error">Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Signing Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signing Mode
              </label>
              <Select
                value={signingMode}
                onChange={(e) => onChangeMode(e.target.value as SigningMode)}
                options={[
                  { value: 'sequential', label: 'Sequential - One at a time in order' },
                  { value: 'parallel', label: 'Parallel - All at once' },
                ]}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add Signers</h3>
              <div className="grid grid-cols-3 gap-3">
                <Input
                  placeholder="Full Name"
                  value={newSigner.name}
                  onChange={(e) => setNewSigner({ ...newSigner, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={newSigner.email}
                  onChange={(e) => setNewSigner({ ...newSigner, email: e.target.value })}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Role/Title"
                    value={newSigner.role}
                    onChange={(e) => setNewSigner({ ...newSigner, role: e.target.value })}
                  />
                  <Button onClick={handleAddSigner} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {signers.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Signers ({signers.length})
                </h3>
                <div className="space-y-2">
                  {signers.map((signer, index) => (
                    <div
                      key={signer.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        {signingMode === 'sequential' && (
                          <span className="flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-xs font-medium">
                            {index + 1}
                          </span>
                        )}
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900">{signer.name}</p>
                            {getStatusBadge(signer.status)}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {signer.email}
                            </span>
                            <span>{signer.role}</span>
                            {signer.signedAt && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Signed: {new Date(signer.signedAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveSigner(signer.id)}
                        disabled={signer.status === 'signed'}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={onSendForSignature}
          disabled={signers.length === 0}
          className="px-6"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Send for Signature
        </Button>
      </div>
    </div>
  );
}