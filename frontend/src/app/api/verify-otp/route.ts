import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Mock OTP verification - replace with actual verification logic
    // In a real application, you would:
    // 1. Check OTP from database/cache
    // 2. Verify expiration time
    // 3. Generate JWT token
    // 4. Return user data and token

    // For development, accept any 6-digit OTP
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      const user = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'user',
        avatar: null
      };

      const token = `mock-jwt-token-${Date.now()}`;

      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully',
        user: user,
        token: token
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
