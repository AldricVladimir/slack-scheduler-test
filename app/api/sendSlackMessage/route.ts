import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message, webhookUrl } = await request.json();
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `From Aldric Vladimir's Slack Bot: ${message}`,
      }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}