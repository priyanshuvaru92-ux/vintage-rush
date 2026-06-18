const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics 4
  if (GA_MEASUREMENT_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }

  // Initialize Microsoft Clarity
  if (CLARITY_ID) {
    const c = window as any;
    c.clarity = c.clarity || function() { (c.clarity.q = c.clarity.q || []).push(arguments) };
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
    const y = document.getElementsByTagName("script")[0];
    if (y && y.parentNode) {
      y.parentNode.insertBefore(t, y);
    }
  }
};

export const analytics = {
  trackPageView: (url: string) => {
    if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  },

  trackEvent: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  },

  trackProductView: (product: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'INR',
        value: product.price,
        items: [{ item_id: product.id, item_name: product.name, price: product.price }]
      });
    }
  },

  trackAddToCart: (product: any, quantity: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'INR',
        value: product.price * quantity,
        items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity }]
      });
    }
  },

  trackPurchase: (order: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: order.id,
        currency: 'INR',
        value: order.total_price,
        items: order.order_items?.map((item: any) => ({
          item_id: item.product?.id,
          item_name: item.product?.name,
          price: item.price,
          quantity: item.quantity
        })) || []
      });
    }
  }
};

// Global type augmentation for window
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
