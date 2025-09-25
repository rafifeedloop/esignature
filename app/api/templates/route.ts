import { NextRequest, NextResponse } from 'next/server';
import { industries } from '@/lib/data/industries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const industry = searchParams.get('industry');
    const useCase = searchParams.get('useCase');

    if (!industry || !industries[industry as keyof typeof industries]) {
      return NextResponse.json(
        { error: 'Invalid industry' },
        { status: 400 }
      );
    }

    const industryData = industries[industry as keyof typeof industries];

    if (useCase) {
      const useCaseData = industryData.useCases.find(uc => uc.id === useCase);
      if (!useCaseData) {
        return NextResponse.json(
          { error: 'Use case not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ templates: useCaseData.templates });
    }

    // Return all templates for the industry
    const allTemplates = industryData.useCases.flatMap(uc => uc.templates);
    return NextResponse.json({ templates: allTemplates });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}