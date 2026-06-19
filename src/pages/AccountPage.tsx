import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User as UserIcon, Package, MapPin, Heart, Mail, Bell } from 'lucide-react';

export default function AccountPage() {
  const { user } = useAuth();

  // Basic profile extraction
  const fullName = user?.user_metadata?.full_name || 'User';
  const email = user?.email || '';
  const phone = user?.user_metadata?.phone || 'Not provided';
  const joinedDate = new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const [prefs, setPrefs] = useState({
    orderConfirmations: true,
    statusUpdates: true,
    newsletter: false
  });

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAF8F5] pt-24 lg:pt-32 pb-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
            My Account
          </h1>
          <p className="mt-2 font-inter text-[#78716C] text-sm">
            Manage your profile, orders, and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <div className="p-4 bg-white border border-[#E8E2D9] rounded-lg space-y-1">
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1C1917] text-[#FAF8F5] font-inter text-sm font-semibold rounded-lg transition-colors"
                style={{ border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <UserIcon size={18} />
                Profile Info
              </button>
              <Link 
                to="/orders" 
                className="w-full flex items-center gap-3 px-4 py-3 text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] font-inter text-sm font-semibold rounded-lg transition-colors"
                style={{ textDecoration: "none" }}
              >
                <Package size={18} />
                Orders
              </Link>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] font-inter text-sm font-semibold rounded-lg transition-colors"
                style={{ border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
              >
                <MapPin size={18} />
                Addresses
              </button>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] font-inter text-sm font-semibold rounded-lg transition-colors"
                style={{ border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
              >
                <Heart size={18} />
                Wishlist
              </button>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] font-inter text-sm font-semibold rounded-lg transition-colors"
                style={{ border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
              >
                <Bell size={18} />
                Notifications
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Info Card */}
            <div className="bg-white border border-[#E8E2D9] rounded-lg p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid #E8E2D9",
                    background: "#1C1917",
                    color: "#FAF8F5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "20px",
                    fontWeight: 700,
                  }}>
                    {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                      <img 
                        src={user.user_metadata.avatar_url || user.user_metadata.picture} 
                        alt="Profile" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    ) : (
                      user?.email?.substring(0, 2).toUpperCase() || 'U'
                    )}
                  </div>
                  <div>
                    <h2 className="font-poppins text-xl font-semibold text-[#1C1917]">Profile Information</h2>
                    <p className="font-inter text-xs text-[#78716C]/60 mt-1">Joined {joinedDate}</p>
                  </div>
                </div>
                <button className="px-5 py-2 border border-[#C4B89F] text-[#1C1917] font-inter text-xs font-semibold uppercase tracking-widest rounded-lg hover:border-[#1C1917] hover:bg-[#FAF8F5] transition-colors duration-300" style={{ background: "none", cursor: "pointer" }}>
                  Edit Profile
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-inter uppercase tracking-widest text-[#78716C] block mb-1 font-bold">Name</label>
                    <p className="font-inter text-[#1C1917] text-sm bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9] font-medium">{fullName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-inter uppercase tracking-widest text-[#78716C] block mb-1 font-bold">Email</label>
                    <p className="font-inter text-[#1C1917] text-sm bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9] font-medium">{email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-inter uppercase tracking-widest text-[#78716C] block mb-1 font-bold">Phone Number</label>
                    <p className="font-inter text-[#1C1917] text-sm bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9] font-medium">{phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Preferences Card */}
            <div className="bg-white border border-[#E8E2D9] rounded-lg p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail size={24} className="text-[#1C1917]" />
                <div>
                  <h2 className="font-poppins text-xl font-semibold text-[#1C1917]">Email Preferences</h2>
                  <p className="font-inter text-xs text-[#78716C]/60 mt-1">Manage what we send to your inbox.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9]">
                  <div>
                    <h4 className="font-inter text-sm font-semibold text-[#1C1917]">Order Confirmations</h4>
                    <p className="font-inter text-xs text-[#78716C] mt-1">Receive emails when you place a new order.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('orderConfirmations')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prefs.orderConfirmations ? 'bg-[#B8974E]' : 'bg-gray-200'}`}
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${prefs.orderConfirmations ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9]">
                  <div>
                    <h4 className="font-inter text-sm font-semibold text-[#1C1917]">Order Status Updates</h4>
                    <p className="font-inter text-xs text-[#78716C] mt-1">Get notified when your order ships or arrives.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('statusUpdates')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prefs.statusUpdates ? 'bg-[#B8974E]' : 'bg-gray-200'}`}
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${prefs.statusUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9]">
                  <div>
                    <h4 className="font-inter text-sm font-semibold text-[#1C1917]">Newsletter Subscription</h4>
                    <p className="font-inter text-xs text-[#78716C] mt-1">Exclusive drops, early access, and brand news.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('newsletter')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prefs.newsletter ? 'bg-[#B8974E]' : 'bg-gray-200'}`}
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${prefs.newsletter ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Future Placeholder Card */}
            <Link 
              to="/orders" 
              className="block bg-[#FAF8F5] border border-dashed border-[#C4B89F] hover:border-[#1C1917] rounded-lg p-8 text-center flex flex-col items-center justify-center transition-colors"
              style={{ textDecoration: "none" }}
            >
               <Package size={32} className="text-[#78716C]/40 mb-3" />
               <p className="font-poppins text-[#78716C] text-sm hover:text-[#1C1917] font-semibold">View your complete order history</p>
            </Link>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
