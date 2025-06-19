import { NextRequest, NextResponse } from 'next/server';

// Required for API routes that handle dynamic requests
export const dynamic = 'force-dynamic';

interface FeedbackRequest {
  summaryId: string;
  feedback: 'positive' | 'negative' | null;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    
    // Validate request body
    if (!body.summaryId || !body.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: summaryId, timestamp' },
        { status: 400 }
      );
    }

    // Validate feedback type
    if (body.feedback !== null && !['positive', 'negative'].includes(body.feedback)) {
      return NextResponse.json(
        { error: 'Invalid feedback type. Must be "positive", "negative", or null' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database/service integration
    // For now, we'll log the feedback for demonstration
    console.log('AI Summary Feedback Received:', {
      summaryId: body.summaryId,
      feedback: body.feedback,
      timestamp: body.timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });

    // In a real implementation, you would:
    // 1. Store the feedback in your database
    // 2. Associate it with the user session/ID
    // 3. Use this data to improve AI model training
    // 4. Potentially trigger analytics events
    
    // Example database operation:
    // await FeedbackService.createFeedback({
    //   summaryId: body.summaryId,
    //   feedback: body.feedback,
    //   timestamp: new Date(body.timestamp),
    //   userAgent: request.headers.get('user-agent'),
    //   ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    // });

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Feedback recorded successfully',
        data: {
          summaryId: body.summaryId,
          feedback: body.feedback,
          recordedAt: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing AI summary feedback:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process feedback'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 