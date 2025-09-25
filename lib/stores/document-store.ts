import { create } from 'zustand';
import { Document, Signer, AuditLog, DocumentStatus, SigningMode } from '../types';

interface DocumentStore {
  documents: Document[];
  currentDocument: Document | null;
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  setCurrentDocument: (id: string) => void;
  addSigner: (documentId: string, signer: Omit<Signer, 'id' | 'status'>) => void;
  updateSigner: (documentId: string, signerId: string, updates: Partial<Signer>) => void;
  addAuditLog: (documentId: string, log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  signDocument: (documentId: string, signerId: string, signature: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  currentDocument: null,

  addDocument: (doc) => {
    const newDoc: Document = {
      ...doc,
      id: `doc_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      auditTrail: [],
    };

    set((state) => ({
      documents: [...state.documents, newDoc],
      currentDocument: newDoc,
    }));

    get().addAuditLog(newDoc.id, {
      action: 'Document Created',
      userId: 'user_1',
      userName: 'Current User',
      ipAddress: '127.0.0.1',
      details: `Document "${newDoc.title}" created from template`,
    });
  },

  updateDocument: (id, updates) => {
    set((state) => ({
      documents: state.documents.map(doc =>
        doc.id === id
          ? { ...doc, ...updates, updatedAt: new Date() }
          : doc
      ),
      currentDocument: state.currentDocument?.id === id
        ? { ...state.currentDocument, ...updates, updatedAt: new Date() }
        : state.currentDocument,
    }));
  },

  setCurrentDocument: (id) => {
    const doc = get().documents.find(d => d.id === id);
    set({ currentDocument: doc || null });
  },

  addSigner: (documentId, signer) => {
    const newSigner: Signer = {
      ...signer,
      id: `signer_${Date.now()}`,
      status: 'pending',
    };

    set((state) => ({
      documents: state.documents.map(doc =>
        doc.id === documentId
          ? { ...doc, signers: [...doc.signers, newSigner] }
          : doc
      ),
    }));

    get().addAuditLog(documentId, {
      action: 'Signer Added',
      userId: 'user_1',
      userName: 'Current User',
      ipAddress: '127.0.0.1',
      details: `Added signer ${newSigner.name} (${newSigner.email})`,
    });
  },

  updateSigner: (documentId, signerId, updates) => {
    set((state) => ({
      documents: state.documents.map(doc =>
        doc.id === documentId
          ? {
              ...doc,
              signers: doc.signers.map(signer =>
                signer.id === signerId
                  ? { ...signer, ...updates }
                  : signer
              ),
            }
          : doc
      ),
    }));
  },

  addAuditLog: (documentId, log) => {
    const newLog: AuditLog = {
      ...log,
      id: `log_${Date.now()}`,
      timestamp: new Date(),
    };

    set((state) => ({
      documents: state.documents.map(doc =>
        doc.id === documentId
          ? { ...doc, auditTrail: [...doc.auditTrail, newLog] }
          : doc
      ),
    }));
  },

  signDocument: (documentId, signerId, signature) => {
    const doc = get().documents.find(d => d.id === documentId);
    const signer = doc?.signers.find(s => s.id === signerId);

    if (!doc || !signer) return;

    get().updateSigner(documentId, signerId, {
      status: 'signed',
      signedAt: new Date(),
      ipAddress: '127.0.0.1',
    });

    get().addAuditLog(documentId, {
      action: 'Document Signed',
      userId: signerId,
      userName: signer.name,
      ipAddress: '127.0.0.1',
      details: `${signer.name} signed the document`,
    });

    const updatedDoc = get().documents.find(d => d.id === documentId);
    const allSigned = updatedDoc?.signers.every(s => s.status === 'signed');

    if (allSigned) {
      get().updateDocument(documentId, { status: 'completed' });
      get().addAuditLog(documentId, {
        action: 'Document Completed',
        userId: 'system',
        userName: 'System',
        ipAddress: '127.0.0.1',
        details: 'All signers have signed. Document is now complete.',
      });
    }
  },
}));