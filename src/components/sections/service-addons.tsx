'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, Users, Zap, Shield, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const addons = [
  {
    icon: Shield,
    title: 'Monthly Systems Checkup',
    price: '$500/mo',
    description: 'Ongoing system maintenance and optimization',
    features: [
      'Monthly performance audit',
      'Automation optimization',
      'Team training support',
      'Priority bug fixes',
      'System health monitoring'
    ],
    cta: 'Add Monthly Checkup',
    popular: false
  },
  {
    icon: Users,
    title: 'Team Training Workshop',
    price: '$2,500',
    description: '4-hour Notion & Airtable mastery session',
    features: [
      'Custom training curriculum',
      'Hands-on exercises',
      'Team certification',
      'Documentation package',
      '30-day support included'
    ],
    cta: 'Book Workshop',
    popular: true
  },
  {
    icon: Zap,
    title: 'API Integrations Pack',
    price: '+$3,000',
    description: 'Advanced automation and API connections',
    features: [
      'Stripe payment integration',
      'Slack notifications',
      'Google Workspace sync',
      'Custom API endpoints',
      'Webhook configuration'
    ],
    cta: 'Add Integrations',
    popular: false
  }
]

export function ServiceAddons() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Scale Your System Further
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your business OS with specialized add-ons designed to accelerate growth 
            and maximize efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {addons.map((addon, index) => (
            <motion.div
              key={addon.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col border-2 transition-all duration-300 hover:shadow-lg ${
                addon.popular 
                  ? 'border-blue-500 relative bg-gradient-to-b from-blue-50 to-white' 
                  : 'border-gray-200'
              }`}>
                {addon.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      addon.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <addon.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{addon.title}</CardTitle>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-gray-900">{addon.price}</div>
                    <CardDescription className="text-base">{addon.description}</CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-3 mb-6">
                    {addon.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      addon.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    size="lg"
                  >
                    {addon.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Business?</h3>
              <p className="text-blue-100 mb-6">
                Get started with our 4-week business OS build and add these powerful extensions as you grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start 4-Week Build
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Book Discovery Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}