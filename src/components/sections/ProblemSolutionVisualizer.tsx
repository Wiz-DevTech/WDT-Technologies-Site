// components/sections/ProblemSolutionVisualizer.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ProblemSolutionVisualizer() {
  const [activeTab, setActiveTab] = useState('problem');
  
  const problems = [
    { title: "Inefficient Systems", description: "Legacy systems causing operational bottlenecks" },
    { title: "Scalability Issues", description: "Infrastructure unable to handle growth demands" },
    { title: "Security Vulnerabilities", description: "Outdated security protocols exposing risks" }
  ];
  
  const solutions = [
    { title: "System Optimization", description: "Streamlined processes with modern architecture" },
    { title: "Scalable Infrastructure", description: "Cloud-native solutions that grow with your business" },
    { title: "Advanced Security", description: "Enterprise-grade security with continuous monitoring" }
  ];

  return (
    <div className="max-w-4xl mx-auto my-16">
      <div className="flex border-b border-gray-200 mb-8">
        <Button
          variant={activeTab === 'problem' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('problem')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Current Challenges
        </Button>
        <Button
          variant={activeTab === 'solution' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('solution')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Our Solutions
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(activeTab === 'problem' ? problems : solutions).map((item, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">{index + 1}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}