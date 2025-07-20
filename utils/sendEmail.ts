import * as MailComposer from 'expo-mail-composer';

export const sendEmail = async (code: string) => {
  try {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      throw new Error('Email services are not available on this device.');
    }

    await MailComposer.composeAsync({
      recipients: [], // Leave empty for the user to fill in
      subject: 'Your Psycometrics Test Code',
      body: `Here is your test code: ${code}\n\nIn order to continue with our selection process you must answer our personality test.\n\nPlease use this link to access the test: https://psycometrics-web.vercel.app/`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};