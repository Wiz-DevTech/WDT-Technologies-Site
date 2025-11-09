// components/sections/InteractiveProcess.tsx
'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

export default function InteractiveProcess() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { 
      title: "Discovery & Analysis", 
      description: "Understanding your unique challenges and objectives",
      duration: "1-2 weeks"
    },
    { 
      title: "Strategy Development", 
      description: "Creating a tailored roadmap for transformation",
      duration: "1 week"
    },
    { 
      title: "Implementation", 
      description: "Executing the plan with minimal disruption",
      duration: "4-8 weeks"
    },
    { 
      title: "Optimization", 
      description: "Fine-tuning for peak performance",
      duration: "Ongoing"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Proven Process</h2>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative pl-12 cursor-pointer transition-all duration-300 ${activeStep === index ? 'scale-105' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              {/* Step indicator */}
              <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                index <= activeStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {index < activeStep ? <CheckCircle size={16} /> : index + 1}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className={`absolute left-4 top-8 w-0.5 h-12 transform -translate-x-1/2 ${
                  index < activeStep ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              )}
              
              {/* Content */}
              <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
                activeStep === index ? 'border-primary' : 'border-transparent'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">{step.duration}</span>
                </div>
                <p className="text-gray-600">{step.description}</p>
                
                {activeStep === index && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-primary font-medium flex items-center">
                      Learn more about this step <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8 space-x-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`w-3 h-3 rounded-full ${
              activeStep === index ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}