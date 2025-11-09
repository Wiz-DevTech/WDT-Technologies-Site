// components/sections/ROICalculator.tsx
'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState([10]);
  const [currentEfficiency, setCurrentEfficiency] = useState([65]);
  const [projectedEfficiency, setProjectedEfficiency] = useState([85]);
  const [avgSalary, setAvgSalary] = useState([75000]);
  const [roi, setRoi] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Calculate ROI based on inputs
    const efficiencyGain = projectedEfficiency[0] - currentEfficiency[0];
    const annualSavings = (teamSize[0] * avgSalary[0] * efficiencyGain) / 100;
    const implementationCost = teamSize[0] * 5000; // Example implementation cost
    const calculatedRoi = ((annualSavings - implementationCost) / implementationCost) * 100;
    
    setSavings(annualSavings);
    setRoi(calculatedRoi);
  }, [teamSize, currentEfficiency, projectedEfficiency, avgSalary]);

  return (
    <div className="max-w-4xl mx-auto my-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-2">ROI Calculator</h2>
      <p className="text-center text-gray-600 mb-8">See the potential return on your investment</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Team Size</label>
              <span className="font-mono">{teamSize[0]} people</span>
            </div>
            <Slider
              value={teamSize}
              onValueChange={setTeamSize}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Current Efficiency</label>
              <span className="font-mono">{currentEfficiency[0]}%</span>
            </div>
            <Slider
              value={currentEfficiency}
              onValueChange={setCurrentEfficiency}
              max={100}
              min={10}
              step={1}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Projected Efficiency</label>
              <span className="font-mono">{projectedEfficiency[0]}%</span>
            </div>
            <Slider
              value={projectedEfficiency}
              onValueChange={setProjectedEfficiency}
              max={100}
              min={currentEfficiency[0]}
              step={1}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Average Salary</label>
              <span className="font-mono">${avgSalary[0].toLocaleString()}</span>
            </div>
            <Slider
              value={avgSalary}
              onValueChange={setAvgSalary}
              max={200000}
              min={30000}
              step={5000}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-primary mb-2">{roi.toFixed(1)}%</div>
            <div className="text-gray-600">Projected ROI</div>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-800 mb-2">
              ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="text-gray-600">Annual Savings</div>
          </div>
          
          <Button className="w-full mt-4">
            Get Detailed Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
