import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Mock OTP generation - replace with actual OTP service
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real application, you would:
    // 1. Generate OTP
    // 2. Store it in database/cache with expiration
    // 3. Send email/SMS with OTP
    // 4. Return success response

    console.log(`OTP for ${email}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        otp: otp, 
        expiresIn: 300 
      }
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
