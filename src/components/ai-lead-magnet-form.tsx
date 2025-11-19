'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { n8nAutomation } from '@/lib/n8n-automation';

// Updated schema to match n8nAutomation expectations
const leadSchema = z.object({
  email: z.string().email('Valid email required'),
  businessType: z.enum(['saas', 'ecommerce', 'agency', 'consulting', 'creator']),
  teamSize: z.enum(['1', '2-5', '6-10', '11-20', '20+']),
  painPoints: z.array(z.string()).min(1, 'Select at least one'),
  currentTools: z.array(z.string()).optional(),
  monthlySpend: z.enum(['<500', '500-2000', '2000-5000', '5000-10000', '10000+']).optional(),
  automationPriority: z.enum(['immediate', '1-3 months', '3-6 months', 'exploring']).optional(),
  aiAuditRequested: z.boolean() // Changed from aiAudit to aiAuditRequested
});

type LeadFormData = z.infer<typeof leadSchema>;

const painPointOptions = [
  'Manual data entry between tools',
  'Team collaboration issues',
  'No clear business metrics',
  'Customer onboarding chaos',
  'Sales pipeline visibility',
  'Marketing automation gaps',
  'Reporting takes too long',
  'Client communication overload'
];

const toolOptions = [
  'Notion',
  'Airtable',
  'Slack',
  'Discord',
  'Google Sheets',
  'Excel',
  'HubSpot',
  'Salesforce',
  'Zapier',
  'Make',
  'ClickUp',
  'Asana',
  'Trello',
  'Shopify',
  'WordPress',
  'Custom CRM'
];

export function AILeadMagnetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    trigger,
    formState: { errors, isValid } 
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      aiAuditRequested: true, // Updated field name
      painPoints: [],
      currentTools: [],
      monthlySpend: '500-2000',
      automationPriority: 'exploring',
      businessType: 'saas',
      teamSize: '2-5'
    }
  });

  const selectedPains = watch('painPoints') || [];
  const selectedTools = watch('currentTools') || [];
  const aiAuditRequested = watch('aiAuditRequested'); // Updated variable name
  const monthlySpend = watch('monthlySpend');
  const automationPriority = watch('automationPriority');

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    
    try {
      // Send to N8n for AI processing - data now matches expected structure
      const result = await n8nAutomation.captureLead(data);
      
      // Trigger AI workflow analysis
      if (data.aiAuditRequested) { // Updated field name
        const auditResult = await n8nAutomation.triggerAIWorkflowAudit(
          data.email, 
          `${data.businessType} with ${data.teamSize} team - Pain: ${data.painPoints.join(', ')}`
        );
        
        // Generate instant AI insight
        const insight = await generateInstantInsight(data);
        setAiInsight(insight);
      }

      // Download PDF and redirect
      window.open('/downloads/ai-workflow-audit.pdf', '_blank');
      setTimeout(() => {
        window.open('https://calendly.com/wdt-architect/ai-audit', '_blank');
      }, 1000);

    } catch (error) {
      console.error('Lead capture failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateInstantInsight = async (data: LeadFormData): Promise<string> => {
    const commonSolutions: Record<string, string> = {
      'Manual data entry between tools': 'AI can automate 80% of manual entry between tools',
      'Team collaboration issues': 'Real-time dashboards sync your team instantly',
      'No clear business metrics': 'Automated KPI tracking with AI insights',
      'Customer onboarding chaos': 'Self-service portals cut onboarding time by 70%',
      'Sales pipeline visibility': 'AI predicts deals and auto-follows up',
      'Marketing automation gaps': 'Personalized campaigns based on behavior',
      'Reporting takes too long': 'Automated reports delivered daily',
      'Client communication overload': 'AI chatbots handle 50% of inquiries'
    };

    const toolIntegration = selectedTools.length > 0 
      ? `Integrating ${selectedTools.slice(0, 2).join(' + ')}${selectedTools.length > 2 ? ' + more' : ''}`
      : 'Connecting your existing tools';

    const budgetContext = monthlySpend ? ` with ${monthlySpend} monthly tool spend` : '';
    const urgency = automationPriority === 'immediate' ? ' (Urgent)' : '';

    const insights = data.painPoints.map(pain => commonSolutions[pain] || 'Workflow optimization');
    return `${toolIntegration}${budgetContext}${urgency}. Key opportunities: ${insights.slice(0, 3).join(' • ')}`;
  };

  const toggleSelection = (field: 'painPoints' | 'currentTools', value: string) => {
    const currentValues = watch(field) || [];
    if (currentValues.includes(value)) {
      setValue(field, currentValues.filter(item => item !== value));
    } else {
      setValue(field, [...currentValues, value]);
    }
  };

  const nextStep = async () => {
    const fields = getStepFields(currentStep);
    const isValidStep = await trigger(fields as any);
    if (isValidStep) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getStepFields = (step: number): (keyof LeadFormData)[] => {
    switch (step) {
      case 1: return ['email', 'businessType', 'teamSize'];
      case 2: return ['painPoints'];
      case 3: return ['currentTools', 'monthlySpend'];
      case 4: return ['automationPriority'];
      default: return [];
    }
  };

  const getStepProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(getStepProgress())}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getStepProgress()}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          AI-Powered Systems Audit
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {currentStep === 1 && 'Tell Us About Your Business'}
          {currentStep === 2 && 'Identify Your Challenges'}
          {currentStep === 3 && 'Current Tools & Budget'}
          {currentStep === 4 && 'Automation Priority'}
        </h3>
        <p className="text-gray-600">
          {currentStep === 1 && 'Help us understand your business context'}
          {currentStep === 2 && 'What workflow challenges are you facing?'}
          {currentStep === 3 && 'What tools are you using and spending on?'}
          {currentStep === 4 && 'When are you looking to implement solutions?'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Business Basics */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select
                {...register('businessType')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="saas">SaaS Company</option>
                <option value="ecommerce">E-commerce Store</option>
                <option value="agency">Marketing Agency</option>
                <option value="consulting">Consulting Firm</option>
                <option value="creator">Content Creator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size *
              </label>
              <select
                {...register('teamSize')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 person</option>
                <option value="2-5">2-5 people</option>
                <option value="6-10">6-10 people</option>
                <option value="11-20">11-20 people</option>
                <option value="20+">20+ people</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Pain Points */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What's slowing you down? (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {painPointOptions.map((pain) => (
                  <label 
                    key={pain} 
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPains.includes(pain)}
                      onChange={() => toggleSelection('painPoints', pain)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 flex-1">{pain}</span>
                  </label>
                ))}
              </div>
              {errors.painPoints && (
                <p className="mt-2 text-sm text-red-600">{errors.painPoints.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Tools & Budget */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Current Tools (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {toolOptions.map((tool) => (
                  <label 
                    key={tool} 
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTools.includes(tool)}
                      onChange={() => toggleSelection('currentTools', tool)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{tool}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Software Spend
              </label>
              <select
                {...register('monthlySpend')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="<500">Less than $500</option>
                <option value="500-2000">$500 - $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Priority & Final Step */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When are you looking to implement automation?
              </label>
              <select
                {...register('automationPriority')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="immediate">Immediately (within 30 days)</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="exploring">Just exploring options</option>
              </select>
            </div>

            {/* AI Audit Toggle - Updated field name */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <p className="font-medium text-gray-900">AI Workflow Analysis</p>
                <p className="text-sm text-gray-600">Instant personalized insights + PDF report</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('aiAuditRequested')} // Updated field name
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* AI Insight Preview */}
            {aiInsight && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">AI Insight Preview:</p>
                <p className="text-sm text-green-700 mt-1">{aiInsight}</p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating AI Analysis...
                </span>
              ) : (
                'Get Free AI Audit + Automation Blueprint'
              )}
            </button>
          )}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index + 1 === currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-center text-gray-500 pt-4">
          ✅ PDF Checklist + AI Analysis + Strategy Call
        </p>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}