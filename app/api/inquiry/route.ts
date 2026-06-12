import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity.write';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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

    // Send email notification
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Services:</strong> ${serviceTypes?.join(', ') || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}
