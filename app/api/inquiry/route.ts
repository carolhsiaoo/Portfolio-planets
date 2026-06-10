import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity.write';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceTypes, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    await writeClient.create({
      _type: 'inquiry',
      name,
      email,
      phone: phone || '',
      serviceTypes: serviceTypes || [],
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}
