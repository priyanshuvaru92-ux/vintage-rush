
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

interface AdminNewOrderNotificationProps {
  customerName: string;
  email: string;
  phone: string;
  orderId: string;
  paymentMethod: string;
  status: string;
  amount: number;
}

export default function AdminNewOrderNotification({
  customerName,
  email,
  phone,
  orderId,
  paymentMethod,
  status,
  amount,
}: AdminNewOrderNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New order received: #{orderId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>VINTAGE RUSH ADMIN</Text>
          </Section>
          
          <Section style={content}>
            <Text style={heading}>New Order Received</Text>
            
            <Section style={detailsContainer}>
              <Text style={detailRow}><strong>Customer Name:</strong> {customerName}</Text>
              <Text style={detailRow}><strong>Email:</strong> {email}</Text>
              <Text style={detailRow}><strong>Phone:</strong> {phone}</Text>
              <Text style={detailRow}><strong>Order ID:</strong> {orderId}</Text>
              <Text style={detailRow}><strong>Payment Method:</strong> {paymentMethod}</Text>
              <Text style={detailRow}><strong>Order Total:</strong> ₹{amount.toLocaleString('en-IN')}</Text>
              <Text style={detailRow}><strong>Current Status:</strong> {status}</Text>
            </Section>
          </Section>

          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              Vintage Rush Internal Notification System
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Re-using same styles for simplicity
const main = {
  backgroundColor: '#f5f5f5',
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
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#111111',
  margin: '0',
};
const content = {
  padding: '32px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
};
const heading = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#111111',
  marginBottom: '24px',
};
const detailsContainer = {
  margin: '24px 0',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '6px',
};
const detailRow = {
  color: '#333333',
  fontSize: '14px',
  margin: '8px 0',
  lineHeight: '20px',
};
const hr = {
  borderColor: '#e0e0e0',
  margin: '20px 0',
};
const footer = {
  padding: '0 24px',
  textAlign: 'center' as const,
};
const footerText = {
  color: '#888888',
  fontSize: '12px',
};
