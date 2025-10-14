import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock teams data - replace with your actual database call
    const teams = [
      {
        _id: "team-1",
        name: "John Doe",
        position: "CEO & Founder",
        image: "/images/team-member-1.jpg",
        description: "Experienced entrepreneur with 15+ years in tax consulting",
        linkedin: "https://linkedin.com/in/johndoe",
        email: "john@taxque.com"
      },
      {
        _id: "team-2",
        name: "Jane Smith",
        position: "CTO",
        image: "/images/team-member-2.jpg",
        description: "Technology expert specializing in fintech solutions",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "jane@taxque.com"
      },
      {
        _id: "team-3",
        name: "Mike Johnson",
        position: "Head of Operations",
        image: "/images/team-member-3.jpg",
        description: "Operations specialist with expertise in process optimization",
        linkedin: "https://linkedin.com/in/mikejohnson",
        email: "mike@taxque.com"
      },
      {
        _id: "team-4",
        name: "Sarah Wilson",
        position: "Lead Tax Consultant",
        image: "/images/team-member-4.jpg",
        description: "Certified tax consultant with 10+ years of experience",
        linkedin: "https://linkedin.com/in/sarahwilson",
        email: "sarah@taxque.com"
      },
      {
        _id: "team-5",
        name: "David Brown",
        position: "Customer Success Manager",
        image: "/images/team-member-5.jpg",
        description: "Dedicated to ensuring exceptional customer experience",
        linkedin: "https://linkedin.com/in/davidbrown",
        email: "david@taxque.com"
      },
      {
        _id: "team-6",
        name: "Lisa Davis",
        position: "Marketing Director",
        image: "/images/team-member-6.jpg",
        description: "Creative marketing professional with digital expertise",
        linkedin: "https://linkedin.com/in/lisadavis",
        email: "lisa@taxque.com"
      }
    ];

    return NextResponse.json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error('Teams API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}
