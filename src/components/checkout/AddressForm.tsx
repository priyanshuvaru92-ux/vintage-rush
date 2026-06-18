export interface AddressFormData {
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface AddressFormProps {
  formData: AddressFormData;
  setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
}

export default function AddressForm({ formData, setFormData }: AddressFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-poppins text-lg font-semibold text-white">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Full Name</label>
            <input
              type="text"
              name="customer_name"
              required
              value={formData.customer_name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-poppins text-lg font-semibold text-white">Shipping Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Street Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">City</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">State</label>
            <input
              type="text"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-inter text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
