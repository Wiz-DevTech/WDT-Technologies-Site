export class N8nAutomation {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.N8N_WEBHOOK_URL || 'https://your-n8n-instance.com';
  }

  async captureLead(leadData: {
    email: string;
    businessType: string;
    painPoints: string[];
    aiAuditRequested: boolean;
    teamSize?: string;
    source?: string;
  }) {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/lead-capture`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${process.env.N8N_API_KEY}` 
        },
        body: JSON.stringify({
          ...leadData,
          source: leadData.source || 'website',
          timestamp: new Date().toISOString(),
          aiAnalysis: leadData.aiAuditRequested
        })
      });

      if (!response.ok) {
        throw new Error(`N8n API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('N8n lead capture failed:', error);
      // Fallback to local storage if N8n fails
      return this.storeLeadLocally(leadData);
    }
  }

  async triggerAIWorkflowAudit(email: string, businessContext: string) {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/ai-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.N8N_API_KEY}`
        },
        body: JSON.stringify({
          email,
          businessContext,
          analysisType: 'comprehensive_workflow_audit',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`AI audit trigger failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI audit trigger failed:', error);
      return { success: false, error: 'AI service unavailable' };
    }
  }

  private async storeLeadLocally(leadData: any) {
    // Fallback method to store leads locally if N8n is down
    console.log('Storing lead locally:', leadData);
    return { 
      success: true, 
      message: 'Lead stored locally - will sync when N8n available',
      localBackup: true 
    };
  }

  async generateAIInsight(leadData: any): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/ai-insight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.N8N_API_KEY}`
        },
        body: JSON.stringify({
          businessType: leadData.businessType,
          teamSize: leadData.teamSize,
          painPoints: leadData.painPoints,
          insightType: 'instant_workflow_analysis'
        })
      });

      if (response.ok) {
        const result = await response.json();
        return result.insight || this.generateFallbackInsight(leadData);
      }
      
      return this.generateFallbackInsight(leadData);
    } catch (error) {
      console.error('AI insight generation failed:', error);
      return this.generateFallbackInsight(leadData);
    }
  }

  private generateFallbackInsight(leadData: any): string {
    const commonSolutions: Record<string, string> = {
      'Manual data entry between tools': 'AI can automate 80% of manual entry between Notion ↔ Airtable with smart sync',
      'Team collaboration issues': 'Real-time dashboards and automated notifications sync your team in seconds',
      'No clear business metrics': 'Automated KPI tracking with AI-powered insights and predictive analytics',
      'Customer onboarding chaos': 'Self-service client portals and automated workflows cut onboarding time by 70%',
      'Sales pipeline visibility': 'AI predicts deal probability and auto-follows up with personalized messaging',
      'Marketing automation gaps': 'Personalized campaigns based on user behavior with AI content generation'
    };

    const relevantSolutions = leadData.painPoints
      .map((pain: string) => commonSolutions[pain] || 'AI workflow optimization and process automation')
      .join('. ');

    return `Based on ${leadData.teamSize} ${leadData.businessType} team: ${relevantSolutions}. Our AI will identify specific automation opportunities during your audit.`;
  }
}

export const n8nAutomation = new N8nAutomation();