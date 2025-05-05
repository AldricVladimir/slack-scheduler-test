'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function SlackMessageForm() {
  const [message, setMessage] = useState('');
  const [delay, setDelay] = useState(0);
  const [unit, setUnit] = useState("seconds");
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    let delayInMilliseconds;
    console.log("Delay:", delay, "| Unit:", unit);
    console.log("Message:", message);
    console.log("Webhook URL:", webhookUrl);
    if (unit == "seconds") {
      delayInMilliseconds = delay * 1000;
    } else if (unit == "minutes") {
      delayInMilliseconds = delay * 60000;
    } else if (unit == "hours") {
      delayInMilliseconds = delay * 3600000;
    }
    setIsSending(true);
    setTimeout(async () => {
      try {
        const response = await fetch('/api/sendSlackMessage/', {
          method: "POST",
          headers: {"Content-Type": "application/json", },
          body: JSON.stringify({ message, webhookUrl }),
        });

        if (response.ok) {
          alert("Message sent successfully!");
        } else {
          alert("Failed to send the message.");
        }
      } catch (error) {
        alert("An error occurred while sending the message.");
      } finally {
        setIsSending(false);
      }
    }
    , delayInMilliseconds); 
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div>
        <Label htmlFor="message">Slack Message:</Label><br/>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
      </div>
      <Label htmlFor="message">Note: Enter the message you want to send.</Label><br/><br/>   
      <div className="mt-4">
        <Label htmlFor="delay">Delay:</Label><br/>
        <Input
          id="delay"
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          placeholder="Enter delay"
        />
      </div>
      <Label htmlFor="delay">Note: Enter the delay in the selected unit.</Label><br/><br/>
      <div className="mt-4">
        <Label htmlFor="unit">Unit:</Label><br/>
        <select
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="minutes">Minute(s)</option>
          <option value="hours">Hour(s)</option>
          <option value="seconds">Second(s)</option>
        </select>
      </div>
      <br/>
      <div className="mt-4">
        <Label htmlFor="webhook">Webhook URL:</Label><br/>
        <Input
          id="webhook"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="Enter your webhook URL"
        />
      </div>
      <Label htmlFor="webhook">Note: Make sure to use a valid webhook URL.</Label><br/><br/>
      <Button disabled={delay <= 0 || !message || !webhookUrl || isSending} onClick={handleSubmit} className="mt-6">
        {isSending ? "Sending..." : delay > 0 ? `Send in ${delay} ${unit}`: 'Send'}
      </Button>
    </div>
  );
}