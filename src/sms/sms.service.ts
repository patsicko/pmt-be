// sms.service.ts

import { Injectable } from '@nestjs/common';
const twilio = require('twilio');

@Injectable()
export class SmsService {
  private client: any;

  constructor() {
    this.client = new twilio('ACf94fa7c31a83e777ecbcbacc55627d37', '517980b716b73713bf7553086d34584f');
  }

  async sendSms(to: string, message: string): Promise<void> {
    try {
      await this.client.messages.create({
        to,
        from: '+19725841583',
        body: message,
      });
    } catch (error) {
      // Handle error
      console.error('Error sending SMS:', error);
    }
  }
}
