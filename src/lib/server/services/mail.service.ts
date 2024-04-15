import { env as privateEnv } from '$env/dynamic/private';
import type { SendMailOptions } from 'nodemailer';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
	host: privateEnv.EMAIL_SMTP_ENDPOINT,
	port: Number.parseInt(privateEnv.EMAIL_SMTP_PORT ?? '587', 10),
	// Using !== false to avoid accidentally setting secure to false.
	secure: privateEnv.EMAIL_SMTP_SECURE !== 'false',
	auth: {
		user: privateEnv.EMAIL_SMTP_USERNAME,
		pass: privateEnv.EMAIL_SMTP_PASSWORD
	}
});

/**
 * Sends email to recipients.
 * From address will be set to EMAIL_SENDER in private env, if it's not specified.
 * @param options Send Mail options
 * @param senderName Optional Name of sender
 */
export async function sendEmail(options: SendMailOptions): Promise<void>;
export async function sendEmail(
	options: Omit<SendMailOptions, 'from'>,
	senderName: string
): Promise<void>;
export async function sendEmail(options: SendMailOptions, senderName?: string) {
	if (privateEnv.EMAIL_ENABLED !== 'true') {
		console.log(
			'Email is disabled. Skipping sending email.',
			JSON.stringify(options, undefined, 2)
		);
		return;
	}
	if (!options.from) {
		options.from = {
			address: privateEnv.EMAIL_SENDER!,
			name: 'Nimbus Mobile'
		};
	}
	if (senderName) {
		options.from = {
			address: privateEnv.EMAIL_SENDER!,
			name: senderName
		};
	}
	try {
		console.log('Sending email:', JSON.stringify(options, undefined, 2));
		await transport.sendMail(options);
	} catch (error) {
		console.log('Error sending email:', error);
		throw error;
	}
}
