import transporter from "../config/mail";
import { env } from "../config/env";

export class AuthMail {
  /**
   * Send Email Verification
   */
  static async sendVerificationEmail(
    email: string,
    firstName: string,
    token: string,
  ): Promise<void> {
    const verificationUrl = `${env.appUrl}/api/v1/auth/verify-email/${token}`;

    await transporter.sendMail({
      from: `"${env.appName}" <${env.smtp.user}>`,
      to: email,
      subject: "Verify your email address",

      html: `
        <h2>Welcome to ${env.appName}</h2>

        <p>Hello <strong>${firstName}</strong>,</p>

        <p>
          Thank you for creating an account.
        </p>

        <p>
          Please click the button below to verify your email.
        </p>

        <p>
          <a
            href="${verificationUrl}"
            style="
              display:inline-block;
              padding:12px 24px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Verify Email
          </a>
        </p>

        <p>
          If you didn't create this account,
          you can safely ignore this email.
        </p>
      `,
    });
  }
}
