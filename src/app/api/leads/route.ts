import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, businessType, teamSize, currentTools } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Save to database (implement your preferred database)
    // For now, we'll just send emails
    
    // Send confirmation email to user
    await resend.emails.send({
      from: 'WDT Technologies <systems@wdt-technologies.com>',
      to: email,
      subject: 'Your Systems Audit Checklist is Ready!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Systems Audit Checklist</h1>
              <p>Plus your free strategy call booking</p>
            </div>
            <div class="content">
              <h2>Ready to streamline your business operations?</h2>
              <p>Thank you for downloading our Systems Audit Checklist. This comprehensive guide will help you identify areas for improvement in your current business systems.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://wdt-technologies-site.vercel.app/downloads/systems-audit-checklist.pdf" class="button">
                  Download Your Checklist
                </a>
              </div>

              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Review the checklist and identify your top 3 pain points</li>
                <li>Book your free 30-minute systems audit call using the link below</li>
                <li>We'll analyze your current setup and provide specific recommendations</li>
              </ol>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://calendly.com/wdt-technologies/systems-audit" class="button" style="background: #764ba2;">
                  Book Your Free Audit Call
                </a>
              </div>

              <p>We're excited to help you build a business that runs like clockwork!</p>
              <p><strong>The WDT Technologies Team</strong></p>
            </div>
            <div class="footer">
              <p>WDT Technologies - The Invisible Systems Architect™</p>
              <p><a href="https://wdt-technologies-site.vercel.app">wdt-technologies-site.vercel.app</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    // Send notification to admin
    await resend.emails.send({
      from: 'Lead Notification <leads@wdt-technologies.com>',
      to: 'admin@wdt-technologies.com',
      subject: `New Lead: ${email}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <p><strong>Team Size:</strong> ${teamSize}</p>
        <p><strong>Current Tools:</strong> ${currentTools?.join(', ') || 'None selected'}</p>
        <p><a href="https://calendly.com/wdt-technologies/systems-audit">View in Calendly</a></p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Rate limiting middleware (basic implementation)
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}