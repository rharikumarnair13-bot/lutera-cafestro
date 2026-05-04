/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  Utensils, 
  Users, 
  PartyPopper,
  Instagram,
  Facebook,
  Award,
  CircleCheck,
  Menu as MenuIcon,
  X,
  ChefHat
} from 'lucide-react';
import { useState, FormEvent } from 'react';

// --- Components ---

const Logo = ({ stacked = false }: { stacked?: boolean }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex ${stacked ? 'flex-col' : 'flex-row'} items-center gap-3`}>
      {!imgError ? (
        <img 
          src="https://i.ibb.co/wfm3LtG/Whats-App-Image-2026-05-04-at-2-52-21-PM-removebg-preview.png" 
          alt="Lootera Cafestro Logo" 
          className={`object-contain ${stacked ? 'w-32 h-32 md:w-40 md:h-40' : 'w-16 h-16 md:w-20 md:h-20'} drop-shadow-xl`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`bg-gold-500 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-gold-500/20 ${stacked ? 'w-20 h-20 md:w-24 md:h-24' : 'w-12 h-12 md:w-14 md:h-14'}`}>
          <ChefHat className={`text-brand-dark ${stacked ? 'w-10 h-10 md:w-12 md:h-12' : 'w-6 h-6 md:w-7 md:h-7'}`} />
        </div>
      )}
      
      <div className={`flex flex-col ${stacked ? 'items-center mt-2' : 'items-start'}`}>
        <span className={`font-serif font-extrabold tracking-[0.1em] text-gold-500 uppercase leading-none drop-shadow-md ${stacked ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
          Lootera
        </span>
        <span className={`tracking-[0.4em] text-white uppercase mt-1 opacity-90 font-medium leading-none ${stacked ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs'}`}>
          Cafestro
        </span>
      </div>
    </div>
  );
};

const Navbar = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#about" className="hover:text-gold-400 transition-colors">About</a>
          <a href="#menu" className="hover:text-gold-400 transition-colors">Menu</a>
          <a href="#parties" className="hover:text-gold-400 transition-colors">Parties</a>
          <a href="#location" className="hover:text-gold-400 transition-colors">Location</a>
          <button 
            onClick={onOpenBooking}
            className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2.5 rounded-full transition-all flex items-center gap-2 cursor-pointer"
          >
            <Phone size={16} />
            Book Table
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-charcoal border-b border-white/10 p-6 flex flex-col gap-4"
          >
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg text-gray-300">About</a>
            <a href="#menu" onClick={() => setIsOpen(false)} className="text-lg text-gray-300">Menu</a>
            <a href="#parties" onClick={() => setIsOpen(false)} className="text-lg text-gray-300">Parties</a>
            <a href="#location" onClick={() => setIsOpen(false)} className="text-lg text-gray-300">Location</a>
            <button 
              onClick={() => { onOpenBooking(); setIsOpen(false); }} 
              className="bg-gold-500 text-white p-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Book Table
            </button>
            <a href="tel:+919437126324" className="border border-gold-500/50 text-gold-400 p-3 rounded-xl flex items-center justify-center gap-2">
              <Phone size={18} />
              Call Directly
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', guests: '2' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: '', phone: '', date: '', guests: '2' });
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative glass-card w-full max-w-md p-8 rounded-[2rem] overflow-hidden"
          >
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CircleCheck size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Request Sent!</h3>
                <p className="text-gray-400">We will call you on your number shortly to confirm your table. Dhanyavad!</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif font-bold">Book a Table</h3>
                  <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                      placeholder="+91"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Date</label>
                      <input 
                        required
                        type="date" 
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        style={{ colorScheme: 'dark' }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Guests</label>
                      <select 
                        value={formData.guests}
                        onChange={e => setFormData({...formData, guests: e.target.value})}
                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-white"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-brand-dark text-white">{n} Guests</option>)}
                        <option value="9+" className="bg-brand-dark text-white">9+ Guests</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-lg shadow-gold-900/20"
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Indian Cuisine" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">Open | 9 AM - 11 PM</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-8xl font-bold leading-tight mb-4">
            Bargarh's Best <br />
            <span className="text-gold-400 italic">Premium Dining</span> <br />
            Experience.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            Ultimate North Indian dining for foodies. Budget-friendly party place for families and friends. Taste jo aap bhool nahi paayenge!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenBooking}
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              Book Table Now
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 px-4 text-left">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center text-gold-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  <span className="ml-2 font-bold text-white">4.5</span>
                </div>
                <p className="text-gray-400">250+ Happy Reviews</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2036&auto=format&fit=crop" 
              alt="Restaurant Ambience" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-2xl hidden md:block">
            <p className="text-4xl font-serif font-bold text-gold-400">₹200-400</p>
            <p className="text-sm uppercase tracking-widest opacity-60 font-semibold">Per Person</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">Welcome to Lootera</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
            Swad wahi, feel bilkul naya.
          </h2>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            At Lootera Cafestro, we believe good food shouldn't cost a fortune. Our mission is to bring the authentic flavors of North India to Bargarh in a setting that's perfect for your biggest celebrations.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold-500/10 rounded-xl text-gold-400">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold">Family First</h4>
                <p className="text-xs text-gray-400">Perfect for large groups & kids</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold-500/10 rounded-xl text-gold-400">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-bold">Unbeatable Value</h4>
                <p className="text-xs text-gray-400">Premium taste at budget prices</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('Veg');

  const menuData = {
    'Veg': [
      { name: 'Paneer Butter Masala', price: '₹220', desc: 'Soft cottage cheese in rich tomato gravy' },
      { name: 'Dal Makhani', price: '₹180', desc: 'Creamy black lentils simmered overnight' },
      { name: 'Mix Veg Jaipuri', price: '₹190', desc: 'Seasonal vegetables with a spicy Rajasthani twist' },
      { name: 'Malai Kofta', price: '₹240', desc: 'Paneer balls in a luscious white gravy' },
    ],
    'Non-Veg': [
      { name: 'Butter Chicken', price: '₹280', desc: 'Classic tandoori chicken in makhani gravy' },
      { name: 'Mutton Rogan Josh', price: '₹350', desc: 'Slow-cooked lamb with aromatic spices' },
      { name: 'Chicken Tikka', price: '₹240', desc: 'Smokey charcoal-grilled chicken chunks' },
      { name: 'Fish Amritsari', price: '₹310', desc: 'Crispy fried fish with carom seeds' },
    ],
    'Chinese': [
      { name: 'Chilli Chicken', price: '₹220', desc: 'Diced chicken tossed with capsicum and soy' },
      { name: 'Veg Manchurian', price: '₹160', desc: 'Deep-fried veg balls in tangy gravy' },
      { name: 'Hakka Noodles', price: '₹150', desc: 'Street-style wok-tossed noodles' },
      { name: 'Dragon Rolls', price: '₹180', desc: 'Spicy vegetable-filled crispy rolls' },
    ],
    'Biryani': [
      { name: 'Hyderabadi Chicken Biryani', price: '₹260', desc: 'Fragrant basmati with succulent chicken' },
      { name: 'Lootera Special Veg Biryani', price: '₹210', desc: 'Our signature slow-cooked veg dum biryani' },
      { name: 'Zarda Pulao', price: '₹140', desc: 'Sweet aromatic rice with dry fruits' },
    ],
    'Beverages': [
      { name: 'Thandai Special', price: '₹80', desc: 'Traditional chilled milk with saffron and nuts' },
      { name: 'Masala Chaas', price: '₹50', desc: 'Refreshing spiced buttermilk' },
      { name: 'Virgin Mojito', price: '₹110', desc: 'Classic mint and lime cooler' },
    ]
  };

  return (
    <section id="menu" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Explore Our Flavour</h2>
          <p className="text-gray-400">Discover Bargarh's most loved dishes across every category</p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.keys(menuData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/30' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-x-12 gap-y-8"
            >
              {menuData[activeTab as keyof typeof menuData].map((item, i) => (
                <div key={i} className="flex justify-between items-start group">
                  <div className="flex-1 mr-4 text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg font-bold group-hover:text-gold-400 transition-colors">{item.name}</h4>
                      <div className="h-[1px] flex-1 bg-white/10 border-t border-dashed border-white/20 mt-1" />
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="text-xl font-serif font-bold text-gold-400">{item.price}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-20 glass-card p-8 rounded-[2rem] text-center max-w-2xl mx-auto border-gold-500/20">
          <p className="text-gold-400 font-bold mb-2 italic">Psst... Planning a party?</p>
          <h3 className="text-2xl font-serif font-bold mb-4">Special Thali starting at ₹299</h3>
          <p className="text-sm text-gray-400 mb-6">Available Tuesday to Sunday. Includes a complete multi-course meal and special drinks.</p>
          <a href="#location" className="inline-flex items-center gap-2 text-white font-bold bg-gold-500/20 hover:bg-gold-500 border border-gold-400/30 px-8 py-3 rounded-xl transition-all">
            See Special Menu <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const BirthdaySpecial = () => {
  return (
    <section id="parties" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
        <PartyPopper size={200} />
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="glass-card rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-gold-900/10">
          <div className="flex-1 p-8 md:p-16">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Exclusive Offer
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Host Your Kids' Birthday Here!</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Sab kuch setup hum karenge! Decoration, Music, and Lootera's Special Menu. Affordable party packages starting for large groups.
            </p>
            <ul className="space-y-4 mb-10">
              {["Custom Decoration", "Private Space available", "Dedicated Party Menu", "Special Surprise for Birthday Hero"].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-200">
                  <CircleCheck className="text-gold-500" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <a 
              href="tel:+919437126324" 
              className="bg-white text-brand-dark px-10 py-4 rounded-xl text-lg font-bold hover:bg-gold-100 transition-colors inline-block"
            >
              Enquire Now (Free Quote)
            </a>
          </div>
          <div className="flex-1 aspect-square md:aspect-auto">
            <img 
              src="https://i.ibb.co/p6zvtpJb/Gemini-Generated-Image-xvhv2jxvhv2jxvhv-ezremove.png" 
              alt="Birthday Party at Lootera" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Rahul Sahoo", text: "Best value for money in Bargarh. Food options r amazing. Kids enjoyed the mini starters.", rating: 5 },
    { name: "Sneha Tripathy", text: "Celebrated my son's 5th bday. Very smooth experience. Staff is helpful and humble.", rating: 5 },
    { name: "Manoj Kumar", text: "Authentic North Indian taste. Paneer items are must try. Highly recommended for family dinners.", rating: 4 }
  ];

  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center">What Bargarh Says</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl border-t-2 border-t-gold-500/30">
              <div className="flex text-gold-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"{rev.text}"</p>
              <p className="font-bold">{rev.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="location" className="py-24 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Reach Out to Us</h2>
          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gold-400/10 rounded-2xl text-gold-400 shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-gold-200">Location</h4>
                <p className="text-gray-400 leading-relaxed">
                  C13 Tower, <br />
                  Bargarh, Odisha 768028
                </p>
                <a href="https://maps.google.com" target="_blank" className="text-gold-400 mt-2 inline-block font-semibold underline underline-offset-4">Get Directions</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-4 bg-gold-400/10 rounded-2xl text-gold-400 shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-gold-200">Timings</h4>
                <p className="text-gray-400">Monday - Sunday</p>
                <p className="text-white font-bold">9:00 AM - 11:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-4 bg-gold-400/10 rounded-2xl text-gold-400 shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-gold-200">Contact</h4>
                <p className="text-gray-400">Direct bookings & enquiries</p>
                <a href="tel:+919437126324" className="text-2xl font-bold text-white hover:text-gold-400 transition-colors">+91 94371 26324</a>
              </div>
            </div>
          </div>

          <div className="h-[400px] bg-brand-charcoal rounded-[2rem] overflow-hidden border border-white/5 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14867.752358359424!2d83.61081515!3d21.3134371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a213e4337d7a8d5%3A0x6b8d4f4f4f4f4f4f!2sBargarh%2C%20Odisha%20768028!5e0!3m2!1sen!2sin!4v1714570000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert opacity-80 contrast-125"
            />
            <div className="absolute inset-0 bg-gold-500/5 pointer-events-none px-4 py-2 flex items-start justify-end">
               <div className="glass-card px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gold-400">
                  Open in Maps
               </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[3rem] border-t-2 border-t-gold-500/30 self-start">
          <h3 className="text-3xl font-serif font-bold mb-6">Send a Message</h3>
          {success ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-2xl mb-6">
              <p className="font-bold mb-1 flex items-center gap-2 font-serif text-xl">
                <CircleCheck size={24} /> Success!
              </p>
              <p className="text-sm">Thank you for your message. We'll get back to you as soon as possible.</p>
            </div>
          ) : null}
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold-500 transition-all text-white placeholder:text-gray-600"
                placeholder="What should we call you?"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Email Address (Optional)</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold-500 transition-all text-white placeholder:text-gray-600"
                placeholder="yourname@gmail.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Message</label>
              <textarea 
                required
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold-500 transition-all text-white placeholder:text-gray-600 resize-none"
                placeholder="Tell us about your event, feedback, or any query..."
              />
            </div>
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-gold-900/20 flex items-center justify-center gap-3 group"
            >
              {loading ? "Sending..." : "Send Message"}
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 text-center text-gray-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="mb-8">
          <Logo stacked />
        </div>
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="hover:text-gold-500 transition-colors"><Instagram size={24} /></a>
          <a href="#" className="hover:text-gold-500 transition-colors"><Facebook size={24} /></a>
        </div>
        <p className="text-sm">© 2026 Lootera Cafestro. All rights reserved.</p>
        <p className="text-[10px] uppercase tracking-widest mt-2">Designed for the Ultimate Foodies of Bargarh</p>
      </div>
    </footer>
  );
};

const StickyCall = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 left-0 right-0 z-50 px-4 md:hidden"
    >
      <div 
        className="flex items-center justify-between bg-gold-500 text-white p-4 rounded-2xl shadow-2xl shadow-gold-500/40"
      >
        <div className="flex flex-col" onClick={onOpenBooking}>
          <span className="font-bold text-lg leading-none">Visit Lootera</span>
          <span className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Book Your Table</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenBooking}
            className="flex items-center gap-2 font-bold px-4 py-2 bg-black/10 rounded-xl"
          >
            Book
          </button>
          <a 
            href="tel:+919437126324" 
            className="flex items-center gap-2 font-bold px-4 py-2 bg-white text-gold-500 rounded-xl"
          >
            <Phone size={20} fill="currentColor" />
            Call
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="selection:bg-gold-500 selection:text-white">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <Hero onOpenBooking={() => setIsBookingOpen(true)} />
      <About />
      <Highlights />
      <MenuPreview />
      <BirthdaySpecial />
      <Testimonials />
      <Contact />
      <Footer />
      <StickyCall onOpenBooking={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

const Highlights = () => {
  return (
    <section className="py-20 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Price Range", val: "₹200-400", icon: <Utensils /> },
          { label: "Top Rated", val: "4.5 Stars", icon: <Star /> },
          { label: "Best For", val: "Families", icon: <Users /> },
          { label: "Specialty", val: "Premium", icon: <Award /> },
        ].map((item, idx) => (
          <div key={idx} className="text-center group">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold-400 group-hover:bg-gold-500 group-hover:text-white transition-all">
              {item.icon}
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">{item.label}</p>
            <p className="font-serif text-xl font-bold">{item.val}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

