import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock category data - replace with your actual database call
    const categories = [
      {
        _id: "cat-1",
        title: "Tax Services",
        Slug: "tax-services",
        category: "Tax Services"
      },
      {
        _id: "cat-2", 
        title: "Business Registration",
        Slug: "business-registration",
        category: "Registration"
      },
      {
        _id: "cat-3",
        title: "Compliance Services",
        Slug: "compliance-services", 
        category: "Compliance"
      },
      {
        _id: "cat-4",
        title: "Accounting Services",
        Slug: "accounting-services",
        category: "Accounting"
      }
    ];

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Category API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
