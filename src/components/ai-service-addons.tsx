'use client';

import { useState } from 'react';

interface AIService {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  aiCapabilities: string[];
  popular: boolean;
  highlight?: string;
}

const aiServices: AIService[] = [
  {
    id: 'ai-automation',
    name: 'AI Workflow Automation',
    price: '+$2,500',
    description: 'Claude/GPT agents for intelligent process automation',
    features: [
      'AI-powered data processing and entry',
      'Smart document classification and routing',
      'Predictive analytics dashboards',
      'Natural language queries and commands',
      'Automated reporting and insights generation',
      'Custom AI model training'
    ],
    aiCapabilities: ['Content generation', 'Data analysis', 'Process optimization', 'Predictive modeling'],
    popular: true,
    highlight: 'Eliminates 80% of manual work'
  },
  {
    id: 'n8n-integration',
    name: 'N8n Automation Stack',
    price: '+$1,500',
    description: 'Enterprise-grade workflow automation platform',
    features: [
      'Multi-tool integration (50+ connectors)',
      'Custom API endpoints and webhooks',
      'Advanced error handling systems',
      'Real-time performance monitoring',
      'Workflow version control',
      'Team collaboration features'
    ],
    aiCapabilities: ['Workflow optimization', 'Error prediction', 'Performance insights', 'Auto-scaling'],
    popular: false,
    highlight: 'Connect all your tools seamlessly'
  },
  {
    id: 'ai-analytics',
    name: 'AI Business Intelligence',
    price: '+$3,000',
    description: 'Predictive insights and automated KPI forecasting',
    features: [
      'AI-powered interactive dashboards',
      'Revenue forecasting and trend analysis',
      'Customer behavior pattern recognition',
      'Anomaly detection and alerts',
      'Automated insight generation',
      'Competitive intelligence tracking'
    ],
    aiCapabilities: ['Predictive modeling', 'Pattern recognition', 'Trend analysis', 'Sentiment analysis'],
    popular: false,
    highlight: 'See the future of your business'
  }
];

export function AIServiceAddons() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            AI-Powered Add-ons
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Supercharge with Artificial Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Add cutting-edge AI capabilities to your business operating system. 
            Each add-on integrates seamlessly with your core setup.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {aiServices.map((service) => (
            <div
              key={service.id}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:scale-105 ${
                service.popular 
                  ? 'border-blue-500 ring-2 ring-blue-200 shadow-2xl' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              {service.highlight && (
                <div className="absolute -top-2 -right-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {service.highlight}
                  </span>
                </div>
              )}
              
              <div className="p-8">
                {/* Service Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${
                    service.popular 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="mb-6">
                  <p className="text-2xl font-bold text-gray-900">{service.price}</p>
                  <p className="text-gray-500 text-sm">One-time addition to your build</p>
                </div>

                {/* AI Capabilities */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">AI Capabilities:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.aiCapabilities.map((capability) => (
                      <span
                        key={capability}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                      >
                        🧠 {capability}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg 
                        className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    service.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                  }`}
                >
                  Add AI Power
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Integration Demo Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">See AI in Action</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Watch how our AI analyzes your workflows in real-time, identifies optimization opportunities, 
                  and generates personalized automation blueprints tailored to your business.
                </p>
                <div className="flex gap-4">
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                    View AI Demo
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Case Studies
                  </button>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Analyzing workflow patterns...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Identifying automation opportunities...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Generating optimization blueprint...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Calculating ROI potential...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All AI add-ons include 30 days of support and integration assistance
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Schedule AI Consultation
          </button>
        </div>
      </div>
    </section>
  );
}