import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock services data - replace with your actual database call
    const services = [
      {
        _id: "service-1",
        title: "GST Registration",
        Slug: "gst-registration",
        displayName: "GST Registration Service",
        category: {
          title: "Tax Services"
        },
        feturePoints: [
          { title: "Quick Processing", summary: "Fast GST registration in 7-10 days" },
          { title: "Expert Support", summary: "Dedicated CA support throughout the process" },
          { title: "Document Assistance", summary: "Help with document preparation and verification" }
        ],
        documentsRequired: {
          tableData: {
            headers: ["Identity Documents", "Business Documents"],
            rows: [
              { "Identity Documents": "PAN Card", "Business Documents": "Business Registration" },
              { "Identity Documents": "Aadhaar Card", "Business Documents": "Bank Statement" },
              { "Identity Documents": "Photo", "Business Documents": "Address Proof" }
            ]
          }
        },
        price: 2999,
        description: "Complete GST registration service with expert guidance"
      },
      {
        _id: "service-2",
        title: "Company Registration",
        Slug: "company-registration",
        displayName: "Private Limited Company Registration",
        category: {
          title: "Registration"
        },
        feturePoints: [
          { title: "Fast Processing", summary: "Company registration in 10-15 days" },
          { title: "Legal Compliance", summary: "Ensures all legal requirements are met" },
          { title: "Post Registration Support", summary: "Ongoing support after registration" }
        ],
        documentsRequired: {
          tableData: {
            headers: ["Director Documents", "Company Documents"],
            rows: [
              { "Director Documents": "PAN Card", "Company Documents": "Company Name" },
              { "Director Documents": "Aadhaar Card", "Company Documents": "Registered Office" },
              { "Director Documents": "Address Proof", "Company Documents": "Business Plan" }
            ]
          }
        },
        price: 4999,
        description: "Complete private limited company registration service"
      },
      {
        _id: "service-3",
        title: "Income Tax Return Filing",
        Slug: "income-tax-return-filing",
        displayName: "ITR Filing Service",
        category: {
          title: "Tax Services"
        },
        feturePoints: [
          { title: "Expert Preparation", summary: "CA-prepared tax returns" },
          { title: "Maximum Deductions", summary: "Optimize your tax savings" },
          { title: "E-filing Support", summary: "Complete e-filing assistance" }
        ],
        documentsRequired: {
          tableData: {
            headers: ["Income Documents", "Deduction Documents"],
            rows: [
              { "Income Documents": "Form 16", "Deduction Documents": "Investment Proofs" },
              { "Income Documents": "Bank Statements", "Deduction Documents": "Insurance Premiums" },
              { "Income Documents": "TDS Certificates", "Deduction Documents": "Home Loan Interest" }
            ]
          }
        },
        price: 1999,
        description: "Professional income tax return filing service"
      }
    ];

    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Services API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
