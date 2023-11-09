import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.senderEmail,
        pass: process.env.senderPassword,
      },
    });
  }

  async sendCourseCreatedEmail(userName:string,userEmail: string, courseLink: string) {
    const mailOptions = {
      from: process.env.senderEmail,
      to: userEmail,
      subject: 'New Course Created',
      html: `
      <html>
        <head>
          <style>
            .email-container {
              background-color: #F5F5F5;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
            }
            .email-title {
              color: #007BFF;
              font-size: 24px;
            }
            .email-text {
              font-size: 16px;
              margin: 20px 0;
            }
            .access-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007BFF;
              color:#ffffff;
              text-decoration: none;
              border-radius: 4px;
              transition: background-color 0.3s;
            }
            .access-button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h1 class="email-title">New Course Created</h1>
            <p class="email-text">Hello ${userName}, we wanted to let you know that</p>
            <p class="email-text">A new course has been created. You can click on the link bellow to access the course:</p>
            <a href="${courseLink}" class="access-button" target="_blank">Access Course</a>
          </div>
        </body>
      </html>
    `,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    });
  }
}
