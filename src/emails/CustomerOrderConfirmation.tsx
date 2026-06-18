
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface CustomerOrderConfirmationProps {
  customerName: string;
  orderId: string;
  paymentMethod: string;
  status: string;
  amount: number;
}

export default function CustomerOrderConfirmation({
  customerName,
  orderId,
  paymentMethod,
  status,
  amount,
}: CustomerOrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Vintage Rush order has been received.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>VINTAGE RUSH</Text>
          </Section>
          
          <Section style={content}>
            <Text style={heading}>Thank You For Ordering From Vintage Rush 🖤</Text>
            
            <Text style={text}>Hi {customerName},</Text>
            <Text style={text}>Thank you for choosing Vintage Rush. Your order has been received successfully.</Text>
            
            <Section style={detailsContainer}>
              <Text style={detailRow}><strong>Order ID:</strong> {orderId}</Text>
              <Text style={detailRow}><strong>Payment Method:</strong> {paymentMethod === 'COD' ? 'Cash on Delivery' : 'WhatsApp Payment'}</Text>
              <Text style={detailRow}><strong>Current Status:</strong> {status}</Text>
              <Text style={detailRow}><strong>Total Amount:</strong> ₹{amount.toLocaleString('en-IN')}</Text>
            </Section>

            <Text style={text}>We will contact you shortly regarding your order.</Text>
            
            <Text style={signature}>
              Stay Bold.<br/>
              Stay Vintage.<br/><br/>
              Team Vintage Rush
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 Vintage Rush. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#111111',
  fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  maxWidth: '100%',
};

const header = {
  padding: '24px',
  textAlign: 'center' as const,
};

const logo = {
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '4px',
  color: '#FFFFFF',
  margin: '0',
};

const content = {
  padding: '32px',
  backgroundColor: '#1a1a1a',
  borderRadius: '12px',
  border: '1px solid #333333',
};

const heading = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: '24px',
};

const text = {
  color: '#cccccc',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const detailsContainer = {
  margin: '24px 0',
  padding: '20px',
  backgroundColor: '#111111',
  borderRadius: '8px',
  border: '1px solid #333333',
};

const detailRow = {
  color: '#FFFFFF',
  fontSize: '14px',
  margin: '8px 0',
};

const signature = {
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '24px',
  marginTop: '32px',
};

const hr = {
  borderColor: '#333333',
  margin: '20px 0',
};

const footer = {
  padding: '0 24px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#666666',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};
