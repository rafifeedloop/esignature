export type Industry =
  | 'banking'
  | 'insurance'
  | 'manufacturing'
  | 'healthcare'
  | 'real-estate'
  | 'education'
  | 'government'
  | 'retail'
  | 'hospitality';

export type DocumentStatus = 'draft' | 'pending' | 'signed' | 'completed' | 'cancelled';

export type SignerStatus = 'pending' | 'signed' | 'declined';

export type SigningMode = 'sequential' | 'parallel';

export interface UseCase {
  id: string;
  name: string;
  description: string;
  templates: Template[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  compliance: string[];
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'email' | 'signature' | 'checkbox' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: string;
}

export interface Document {
  id: string;
  templateId: string;
  title: string;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
  fields: Record<string, any>;
  signers: Signer[];
  signingMode: SigningMode;
  auditTrail: AuditLog[];
}

export interface Signer {
  id: string;
  name: string;
  email: string;
  role: string;
  status: SignerStatus;
  signedAt?: Date;
  ipAddress?: string;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: string;
  userId: string;
  userName: string;
  ipAddress: string;
  details: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: 'admin' | 'user' | 'viewer';
}