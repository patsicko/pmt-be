// sms.service.ts

import { Injectable } from '@nestjs/common';
const twilio = require('twilio');

@Injectable()
export class SmsService {
  private client: any;

  constructor() {
    this.client = new twilio( process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,);
  }

  async sendSms(to: string, message: string): Promise<void> {
    try {
      await this.client.messages.create({
        to,
        from:process.env.TWILIO_PHONE_NUMBER,
        body: message,
      });
    } catch (error) {
      // Handle error
      console.error('Error sending SMS:', error);
    }
  }
}
