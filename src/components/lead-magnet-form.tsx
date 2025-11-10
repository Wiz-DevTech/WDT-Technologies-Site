'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Download, CheckCircle, Loader2 } from 'lucide-react'

const leadMagnetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  businessType: z.enum(['saas', 'ecommerce', 'agency', 'consulting', 'other']),
  teamSize: z.enum(['1', '2-5', '6-10', '11-20', '20+']),
  currentTools: z.array(z.string()).min(1, 'Please select at least one tool'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and privacy policy'
  })
})

type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>

const currentToolsOptions = [
  { id: 'notion', label: 'Notion' },
  { id: 'airtable', label: 'Airtable' },
  { id: 'trello', label: 'Trello' },
  { id: 'asana', label: 'Asana' },
  { id: 'slack', label: 'Slack' },
  { id: 'google-workspace', label: 'Google Workspace' },
  { id: 'other', label: 'Other' }
]

export function LeadMagnetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
    defaultValues: {
      businessType: 'saas',
      teamSize: '2-5',
      currentTools: [],
      acceptTerms: false
    }
  })

  const selectedTools = watch('currentTools')

  const onSubmit = async (data: LeadMagnetFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Trigger download
        const pdfResponse = await fetch('/downloads/systems-audit-checklist.pdf')
        const pdfBlob = await pdfResponse.blob()
        const url = window.URL.createObjectURL(pdfBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'WDT-Systems-Audit-Checklist.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        // Redirect to Calendly
        setTimeout(() => {
          window.open('https://calendly.com/wdt-technologies/systems-audit', '_blank')
        }, 1000)

        setIsSuccess(true)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Success!
          </CardTitle>
          <CardDescription className="text-green-700">
            Your checklist has been downloaded and we've redirected you to schedule your free systems audit call.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-600 mb-4">
            Check your email for the download link and call details.
          </p>
          <Button 
            variant="outline" 
            className="w-full text-green-800 border-green-300"
            onClick={() => setIsSuccess(false)}
          >
            Submit Another Response
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Get Your Free Systems Audit
        </CardTitle>
        <CardDescription>
          Download our comprehensive Systems Audit Checklist and book your free strategy call
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Business Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type *</Label>
            <select
              id="businessType"
              {...register('businessType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="saas">SaaS Company</option>
              <option value="ecommerce">E-commerce Store</option>
              <option value="agency">Marketing Agency</option>
              <option value="consulting">Consulting Firm</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size *</Label>
            <select
              id="teamSize"
              {...register('teamSize')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Solo Founder</option>
              <option value="2-5">2-5 People</option>
              <option value="6-10">6-10 People</option>
              <option value="11-20">11-20 People</option>
              <option value="20+">20+ People</option>
            </select>
          </div>

          {/* Current Tools */}
          <div className="space-y-2">
            <Label>Current Tools Used *</Label>
            <div className="grid grid-cols-2 gap-2">
              {currentToolsOptions.map((tool) => (
                <div key={tool.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={tool.id}
                    checked={selectedTools.includes(tool.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setValue('currentTools', [...selectedTools, tool.id])
                      } else {
                        setValue('currentTools', selectedTools.filter(t => t !== tool.id))
                      }
                    }}
                  />
                  <Label htmlFor={tool.id} className="text-sm font-normal">
                    {tool.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.currentTools && (
              <p className="text-sm text-red-500">{errors.currentTools.message}</p>
            )}
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              {...register('acceptTerms')}
            />
            <Label htmlFor="acceptTerms" className="text-sm font-normal">
              I accept the{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download Checklist & Book Call
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            No credit card required. 100% free systems audit.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}