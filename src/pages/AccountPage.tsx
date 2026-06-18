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
      className="min-h-screen bg-[#111111] pt-24 lg:pt-32 pb-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-white tracking-tight">
            My Account
          </h1>
          <p className="mt-2 font-inter text-white/50 text-sm">
            Manage your profile, orders, and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Navigation (Placeholder for future sub-pages) */}
          <div className="lg:col-span-1 space-y-2">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-primary font-inter text-sm font-medium rounded-lg transition-colors">
                <UserIcon size={18} />
                Profile Info
              </button>
              <Link to="/orders" className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 font-inter text-sm rounded-lg transition-colors">
                <Package size={18} />
                Orders
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 font-inter text-sm rounded-lg transition-colors">
                <MapPin size={18} />
                Addresses
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 font-inter text-sm rounded-lg transition-colors">
                <Heart size={18} />
                Wishlist
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 font-inter text-sm rounded-lg transition-colors">
                <Bell size={18} />
                Notifications
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Info Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-poppins text-xl font-semibold text-white">Profile Information</h2>
                  <p className="font-inter text-xs text-white/40 mt-1">Joined {joinedDate}</p>
                </div>
                <button className="px-5 py-2 border border-white/20 text-white font-inter text-xs font-semibold uppercase tracking-widest rounded-lg hover:border-secondary hover:text-secondary transition-colors duration-300">
                  Edit Profile
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-inter uppercase tracking-widest text-white/30 block mb-1">Name</label>
                    <p className="font-inter text-white text-sm bg-[#1a1a1a] p-3 rounded-lg border border-white/5">{fullName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-inter uppercase tracking-widest text-white/30 block mb-1">Email</label>
                    <p className="font-inter text-white text-sm bg-[#1a1a1a] p-3 rounded-lg border border-white/5">{email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-inter uppercase tracking-widest text-white/30 block mb-1">Phone Number</label>
                    <p className="font-inter text-white text-sm bg-[#1a1a1a] p-3 rounded-lg border border-white/5">{phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Preferences Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail size={24} className="text-white" />
                <div>
                  <h2 className="font-poppins text-xl font-semibold text-white">Email Preferences</h2>
                  <p className="font-inter text-xs text-white/40 mt-1">Manage what we send to your inbox.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <div>
                    <h4 className="font-inter text-sm font-medium text-white">Order Confirmations</h4>
                    <p className="font-inter text-xs text-white/40 mt-1">Receive emails when you place a new order.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('orderConfirmations')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prefs.orderConfirmations ? 'bg-secondary' : 'bg-white/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${prefs.orderConfirmations ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <div>
                    <h4 className="font-inter text-sm font-medium text-white">Order Status Updates</h4>
                    <p className="font-inter text-xs text-white/40 mt-1">Get notified when your order ships or arrives.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('statusUpdates')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prefs.statusUpdates ? 'bg-secondary' : 'bg-white/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${prefs.statusUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <div>
                    <h4 className="font-inter text-sm font-medium text-white">Newsletter Subscription</h4>
                    <p className="font-inter text-xs text-white/40 mt-1">Exclusive drops, early access, and brand news.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('newsletter')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prefs.newsletter ? 'bg-secondary' : 'bg-white/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${prefs.newsletter ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Future Placeholder Card */}
            <Link to="/orders" className="block bg-white/[0.02] border border-white/5 hover:border-white/20 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-colors">
               <Package size={32} className="text-white/20 mb-3" />
               <p className="font-poppins text-white/50 text-sm hover:text-secondary">View your complete order history</p>
            </Link>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
