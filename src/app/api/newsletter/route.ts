import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create subscriber document in Sanity
    await client.create({
      _type: 'subscriber',
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 