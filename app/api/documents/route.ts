import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real application, fetch from database
    const documents = [
      {
        id: 'doc_1',
        title: 'Loan Agreement - John Doe',
        status: 'pending',
        templateId: 'loan-agreement',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        signers: [
          { id: 's1', name: 'John Doe', email: 'john@example.com', status: 'signed' },
          { id: 's2', name: 'Jane Smith', email: 'jane@bank.com', status: 'pending' }
        ]
      },
      {
        id: 'doc_2',
        title: 'Insurance Policy - ABC Corp',
        status: 'completed',
        templateId: 'policy-application',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-11'),
        signers: [
          { id: 's3', name: 'Bob Wilson', email: 'bob@abc.com', status: 'signed' },
          { id: 's4', name: 'Alice Brown', email: 'alice@insurance.com', status: 'signed' }
        ]
      }
    ];

    return NextResponse.json({ documents });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In a real application, save to database
    const newDocument = {
      id: `doc_${Date.now()}`,
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      auditTrail: [{
        id: `log_${Date.now()}`,
        action: 'Document Created',
        userId: 'user_1',
        userName: 'System User',
        ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
        timestamp: new Date(),
        details: `Document created from template ${body.templateId}`
      }]
    };

    return NextResponse.json({ document: newDocument });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}