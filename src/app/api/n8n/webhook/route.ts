import { NextRequest, NextResponse } from 'next/server';

// Type definitions for webhook payloads
interface LeadCaptureData {
  email: string;
  businessType: string;
  teamSize: string;
  painPoints: string[];
  aiAuditRequested: boolean;
  source: string;
  timestamp: string;
}

interface AIAnalysisData {
  email: string;
  insights: string[];
  recommendations: string[];
  confidenceScore: number;
  timestamp: string;
}

interface WorkflowTriggerData {
  workflowId: string;
  triggerType: string;
  payload: any;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate webhook signature if provided
    const signature = request.headers.get('x-n8n-signature');
    if (signature && !validateWebhookSignature(signature, body)) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    // Process different webhook types from N8n
    let result;
    switch (body.type) {
      case 'lead_captured':
        result = await processLeadCapture(body.data as LeadCaptureData);
        break;
      case 'ai_analysis_complete':
        result = await processAIAnalysis(body.data as AIAnalysisData);
        break;
      case 'workflow_triggered':
        result = await processWorkflowTrigger(body.data as WorkflowTriggerData);
        break;
      case 'health_check':
        result = { status: 'healthy', timestamp: new Date().toISOString() };
        break;
      default:
        return NextResponse.json({ error: 'Unknown webhook type' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      processed: true,
      result 
    });

  } catch (error) {
    console.error('N8n webhook processing error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Webhook processing failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint for N8n
  return NextResponse.json({ 
    status: 'ok', 
    service: 'n8n-webhook',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
}

// Webhook signature validation (optional but recommended)
function validateWebhookSignature(signature: string, body: any): boolean {
  const expectedSignature = process.env.N8N_WEBHOOK_SECRET;
  if (!expectedSignature) {
    console.warn('N8N_WEBHOOK_SECRET not set, skipping signature validation');
    return true;
  }
  
  // Implement your signature validation logic here
  // This is a simplified example - use proper crypto validation in production
  return signature === expectedSignature;
}

async function processLeadCapture(data: LeadCaptureData) {
  console.log('Processing lead capture:', data);
  
  // Store lead in database (implement your database logic)
  const leadRecord = {
    id: generateId(),
    email: data.email,
    businessType: data.businessType,
    teamSize: data.teamSize,
    painPoints: data.painPoints,
    source: data.source,
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  // Trigger AI analysis if requested
  if (data.aiAuditRequested) {
    await triggerAIAnalysis(data.email, data);
  }

  // Send confirmation email (implement your email service)
  await sendConfirmationEmail(data.email);

  return { 
    leadId: leadRecord.id, 
    processed: true,
    aiAnalysisTriggered: data.aiAuditRequested
  };
}

async function processAIAnalysis(data: AIAnalysisData) {
  console.log('Processing AI analysis results:', data);
  
  // Update lead record with AI insights
  await updateLeadWithAIInsights(data.email, data.insights, data.recommendations);
  
  // Send AI insights email to the lead
  await sendAIAnalysisEmail(data.email, data.insights, data.recommendations);
  
  return { 
    analysisDelivered: true,
    insightsCount: data.insights.length,
    confidence: data.confidenceScore
  };
}

// MISSING FUNCTION - ADDED HERE
async function processWorkflowTrigger(data: WorkflowTriggerData) {
  console.log('Processing workflow trigger:', data.workflowId);
  
  // Implement workflow-specific logic
  switch (data.workflowId) {
    case 'lead_nurture_sequence':
      await triggerLeadNurtureSequence(data.payload);
      break;
    case 'ai_follow_up':
      await triggerAIFollowUp(data.payload);
      break;
    case 'onboarding_sequence':
      await triggerOnboardingSequence(data.payload);
      break;
    default:
      console.warn(`Unknown workflow: ${data.workflowId}`);
  }
  
  return { 
    workflowExecuted: true, 
    workflowId: data.workflowId,
    triggerType: data.triggerType
  };
}

// Helper functions (implement based on your infrastructure)
async function triggerAIAnalysis(email: string, context: any) {
  // Call your AI service (Claude, GPT, etc.)
  const aiServiceUrl = process.env.AI_SERVICE_URL;
  if (!aiServiceUrl) {
    console.warn('AI_SERVICE_URL not configured');
    return;
  }

  try {
    const response = await fetch(aiServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_SERVICE_KEY}`
      },
      body: JSON.stringify({
        email,
        context,
        analysis_type: 'workflow_optimization',
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`AI service responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('AI analysis trigger failed:', error);
    throw error;
  }
}

async function updateLeadWithAIInsights(email: string, insights: string[], recommendations: string[]) {
  // Update your lead in database with AI insights
  console.log('Updating lead with AI insights for:', email);
  // Implement your database update logic here
  return { updated: true, email, insightsCount: insights.length };
}

async function sendConfirmationEmail(email: string) {
  // Implement your email sending logic
  console.log('Sending confirmation email to:', email);
  return { emailSent: true, to: email };
}

async function sendAIAnalysisEmail(email: string, insights: string[], recommendations: string[]) {
  // Implement AI insights email logic
  console.log('Sending AI analysis email to:', email);
  return { analysisEmailSent: true, to: email, insightsCount: insights.length };
}

async function triggerLeadNurtureSequence(payload: any) {
  // Implement lead nurture sequence
  console.log('Triggering lead nurture sequence for:', payload.email);
  return { nurtureSequenceStarted: true, email: payload.email };
}

async function triggerAIFollowUp(payload: any) {
  // Implement AI-powered follow-up
  console.log('Triggering AI follow-up for:', payload.email);
  return { aiFollowUpSent: true, email: payload.email };
}

async function triggerOnboardingSequence(payload: any) {
  // Implement onboarding sequence
  console.log('Triggering onboarding sequence for:', payload.email);
  return { onboardingStarted: true, email: payload.email };
}

function generateId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}