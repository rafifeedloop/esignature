import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { signerId, signature } = body;

    // In a real application, update document in database
    const updatedDocument = {
      id: params.id,
      signerId,
      signature,
      signedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
      status: 'signed'
    };

    // Send email notifications in production
    // await sendSignatureNotification(signerId);

    return NextResponse.json({
      success: true,
      document: updatedDocument,
      message: 'Document signed successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to sign document' },
      { status: 500 }
    );
  }
}