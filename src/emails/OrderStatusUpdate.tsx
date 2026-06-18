
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

interface OrderStatusUpdateProps {
  customerName: string;
  orderId: string;
  status: string;
}

export default function OrderStatusUpdate({
  customerName,
  orderId,
  status,
}: OrderStatusUpdateProps) {
  
  let headerText = 'Order Status Update';
  if (status === 'Shipped') headerText = 'Your Order Has Been Shipped 🚚';
  if (status === 'Delivered') headerText = 'Your Order Has Been Delivered 🎉';
  if (status === 'Confirmed') headerText = 'Your Order Is Confirmed ✅';

  return (
    <Html>
      <Head />
      <Preview>{headerText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>VINTAGE RUSH</Text>
          </Section>
          
          <Section style={content}>
            <Text style={heading}>{headerText}</Text>
            
            <Text style={text}>Hi {customerName},</Text>
            <Text style={text}>Good news!</Text>
            <Text style={text}>Your Vintage Rush order #{orderId.split('-')[0].toUpperCase()} has a new update.</Text>
            
            <Section style={detailsContainer}>
              <Text style={detailRow}><strong>Current Status:</strong> {status}</Text>
            </Section>

            <Text style={text}>Thank you for choosing Vintage Rush.</Text>
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

// Re-using luxury theme
const main = {
  backgroundColor: '#111111',
  fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
};
const container = { margin: '0 auto', padding: '20px 0 48px', width: '580px', maxWidth: '100%' };
const header = { padding: '24px', textAlign: 'center' as const };
const logo = { fontSize: '24px', fontWeight: 'bold', letterSpacing: '4px', color: '#FFFFFF', margin: '0' };
const content = { padding: '32px', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px solid #333333' };
const heading = { fontSize: '22px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '24px' };
const text = { color: '#cccccc', fontSize: '16px', lineHeight: '24px', margin: '16px 0' };
const detailsContainer = { margin: '24px 0', padding: '20px', backgroundColor: '#111111', borderRadius: '8px', border: '1px solid #333333' };
const detailRow = { color: '#FFFFFF', fontSize: '14px', margin: '8px 0' };
const hr = { borderColor: '#333333', margin: '20px 0' };
const footer = { padding: '0 24px', textAlign: 'center' as const };
const footerText = { color: '#666666', fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '1px' };
