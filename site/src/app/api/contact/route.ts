import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message, honey } = await request.json();

    // Silent honeypot check to intercept automated spam
    if (honey) {
      return NextResponse.json({ success: true, note: 'silently ignored' });
    }

    // Verify fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPass = process.env.GMAIL_APP_PASS;

    if (!gmailUser || !gmailAppPass) {
      console.error('SMTP credentials missing from environment (GMAIL_USER, GMAIL_APP_PASS)');
      return NextResponse.json({ error: 'SMTP credentials missing from backend' }, { status: 500 });
    }

    // Configure SMTP transporter using Gmail App Password (similar to Scribble's config)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL port 465
      auth: {
        user: gmailUser,
        pass: gmailAppPass,
      },
    });

    const mailOptions = {
      from: `"mncook.net Contact" <${gmailUser}>`,
      to: 'matt@mncook.net',
      replyTo: email,
      subject: `New Message from ${name} via mncook.net`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; color: #08080a; max-width: 600px; margin: auto; padding: 40px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 16px;">
            <h2 style="font-family: 'Georgia', serif; font-style: italic; font-weight: normal; color: #1a1a2e; font-size: 24px; margin: 0;">mncook.net</h2>
            <p style="font-size: 13px; color: #5d5d6a; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.05em;">New Portal Contact Submission</p>
          </div>
          
          <p style="margin: 0 0 16px 0; line-height: 1.5;">
            <strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #1e4d7b; text-decoration: underline;">${email}</a>)
          </p>
          
          <div style="background-color: #f7f9fc; padding: 20px; border-radius: 8px; margin-bottom: 24px; border: 1px solid rgba(0,0,0,0.05);">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #5d5d6a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Message Content</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #08080a;">${message}</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid rgba(0, 0, 0, 0.06); margin: 24px 0;">
          
          <p style="font-size: 12px; color: #5d5d6a; line-height: 1.5; margin-bottom: 0; text-align: center;">
            This email was generated automatically by the mncook.net contact form serverless routing engine.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('SMTP email error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({ status: 'API Route Active' });
}
