import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(email: string, token: string) {
    const link = `${baseUrl}/verify-email?token=${token}`;

    return resend.emails.send({
        from: 'noreply@faddlmatch.com',
        to: email,
        subject: '🕌 FADDL MATCH - Verify your email address',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #16a34a;">🕌 Welcome to FADDL MATCH</h1>
                <p>Assalamu Alaikum,</p>
                <p>Thank you for joining our Islamic matrimonial platform. Please verify your email address to start your halal journey to finding a life partner.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${link}" style="background: linear-gradient(135deg, #16a34a, #2563eb); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                        Verify Email Address
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">If you didn't create an account with FADDL MATCH, you can safely ignore this email.</p>
                <p style="color: #16a34a;">Barakallahu feeki,<br>The FADDL MATCH Team</p>
            </div>
        `
    })
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const link = `${baseUrl}/reset-password?token=${token}`;

    return resend.emails.send({
        from: 'noreply@faddlmatch.com',
        to: email,
        subject: '🔐 FADDL MATCH - Reset your password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #16a34a;">🕌 FADDL MATCH Password Reset</h1>
                <p>Assalamu Alaikum,</p>
                <p>You have requested to reset your password for your FADDL MATCH account. Click the button below to create a new password.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${link}" style="background: linear-gradient(135deg, #16a34a, #2563eb); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
                <p style="color: #666; font-size: 14px;">This link will expire in 24 hours for security purposes.</p>
                <p style="color: #16a34a;">Barakallahu feeki,<br>The FADDL MATCH Team</p>
            </div>
        `
    })
}