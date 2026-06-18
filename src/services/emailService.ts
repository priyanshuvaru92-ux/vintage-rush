import { supabase } from '@/lib/supabase';
import { render } from '@react-email/render';
import React from 'react';

interface SendEmailParams {
  to: string;
  subject: string;
  react: React.ReactElement;
}

export const emailService = {
  async sendEmail({ to, subject, react }: SendEmailParams): Promise<{ success: boolean; error?: any }> {
    try {
      const html = await render(react);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { to, subject, html },
      });

      if (error) {
        console.error('Failed to send email via edge function:', error);
        return { success: false, error };
      }

      console.log('Email sent successfully:', data);
      return { success: true };
    } catch (error) {
      console.error('Exception while sending email:', error);
      return { success: false, error };
    }
  }
};
