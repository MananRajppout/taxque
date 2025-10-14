import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock blogs data - replace with your actual database call
    const blogs = [
      {
        _id: "blog-1",
        title: "Understanding GST Registration Process",
        Slug: "understanding-gst-registration-process",
        metaTitle: "GST Registration Guide",
        metaDescription: "Complete guide to GST registration for new businesses",
        category: "Tax Services",
        imageUrl: "/assests/images/GSTCardImg.png",
        date: "2024-01-15",
        blogText: [
          {
            summarys: [
              {
                summary: "Complete guide to GST registration for new businesses. Learn about the requirements, process, and benefits of GST registration in India."
              }
            ]
          }
        ]
      },
      {
        _id: "blog-2",
        title: "Business Registration Requirements in India",
        Slug: "business-registration-requirements-india",
        metaTitle: "Business Registration Guide",
        metaDescription: "Essential documents and steps for business registration",
        category: "Registration",
        imageUrl: "/assests/images/BRCardImg.png",
        date: "2024-01-10",
        blogText: [
          {
            summarys: [
              {
                summary: "Essential documents and steps for business registration in India. Understand the complete process and requirements for starting a business."
              }
            ]
          }
        ]
      },
      {
        _id: "blog-3",
        title: "Tax Compliance Checklist for Small Businesses",
        Slug: "tax-compliance-checklist-small-businesses",
        metaTitle: "Tax Compliance Guide",
        metaDescription: "Monthly and annual tax compliance requirements",
        category: "Compliance",
        imageUrl: "/assests/images/ITSCardImg.png",
        date: "2024-01-05",
        blogText: [
          {
            summarys: [
              {
                summary: "Monthly and annual tax compliance requirements for small businesses. Stay compliant with our comprehensive checklist."
              }
            ]
          }
        ]
      },
      {
        _id: "blog-4",
        title: "Accounting Best Practices for Startups",
        Slug: "accounting-best-practices-startups",
        metaTitle: "Startup Accounting Guide",
        metaDescription: "How to maintain proper books of accounts",
        category: "Accounting",
        imageUrl: "/assests/images/ROCCardImg.png",
        date: "2024-01-01",
        blogText: [
          {
            summarys: [
              {
                summary: "How to maintain proper books of accounts for startups. Learn best practices for financial management and record keeping."
              }
            ]
          }
        ]
      }
    ];

    const response = NextResponse.json({
      success: true,
      data: blogs,
      timestamp: Date.now() // Cache busting
    });
    
    // Add cache-busting headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Blogs API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
