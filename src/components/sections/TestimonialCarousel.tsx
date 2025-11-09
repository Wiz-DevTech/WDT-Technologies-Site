// components/sections/TestimonialCarousel.tsx
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, Tech Innovations Inc.",
      content: "WDT Technologies transformed our outdated systems into a streamlined, efficient infrastructure. The ROI exceeded our expectations by 40%.",
      avatar: "/avatars/sarah.jpg"
    },
    {
      name: "Michael Chen",
      role: "Operations Director, Global Logistics",
      content: "The invisible systems approach eliminated our operational bottlenecks. We've seen a 60% improvement in process efficiency.",
      avatar: "/avatars/michael.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "VP of Engineering, FinTech Solutions",
      content: "Working with WDT was a game-changer. They identified issues we didn't even know we had and implemented solutions seamlessly.",
      avatar: "/avatars/emily.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="max-w-4xl mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-12">Client Success Stories</h2>
      
      <div className="relative bg-white p-8 rounded-xl shadow-lg">
        <div className="absolute top-0 left-8 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full">
          <Quote size={24} />
        </div>
        
        <div className="text-center mb-8">
          <p className="text-xl italic text-gray-700 mb-6">
            "{testimonials[currentIndex].content}"
          </p>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden">
              {/* Placeholder for avatar */}
              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
            </div>
            <div className="text-left">
              <div className="font-bold">{testimonials[currentIndex].name}</div>
              <div className="text-gray-600">{testimonials[currentIndex].role}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevTestimonial}>
            <ChevronLeft className="mr-2" /> Previous
          </Button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <Button variant="outline" onClick={nextTestimonial}>
            Next <ChevronRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}