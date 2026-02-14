import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '../utils';


export const Layout: React.FC = () => {
  const { student, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    ...(student 
      ? [{ name: 'لوحة التحكم', path: '/dashboard' }] 
      : [
          { name: 'تسجيل جديد', path: '/register' },
          { name: 'دخول أولياء الأمور', path: '/login' }
        ]
    )
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-right">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center cursor-pointer gap-4" onClick={() => navigate('/')}>
               <img 
                 src="logo.png"   
                 alt="Al-Bayan Nursery Logo" 
                 className="h-16 w-auto object-contain"
               />
               <div className="flex flex-col">
                 <h1 className="text-xl font-bold text-primary-900 tracking-tight leading-none">روضة البيان</h1>
                 <p className="text-xs text-primary-600 font-medium mt-1">تأسيس .. تعليم .. رعاية</p>
               </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 space-x-reverse items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
                    location.pathname === link.path
                      ? "text-white bg-primary-800 shadow-md"
                      : "text-slate-600 hover:text-primary-800 hover:bg-slate-100"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              {student && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-transparent hover:border-red-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>تسجيل خروج</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-500 hover:text-primary-800 focus:outline-none p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium",
                    location.pathname === link.path
                      ? "text-primary-900 bg-primary-50 border border-primary-100"
                      : "text-slate-600 hover:text-primary-800 hover:bg-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {student && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-right block px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                >
                  تسجيل خروج
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white border-t-4 border-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="bg-white p-1.5 rounded-lg">
                    <img src="logo.png" alt="Al-Bayan Nursery Logo" className="h-10 w-auto" />
                 </div>
                 <h3 className="font-bold text-xl">روضة البيان</h3>
              </div>
              <p className="text-primary-100 text-sm leading-relaxed max-w-xs">
                بيئة تربوية متكاملة تسعى لبناء جيل واعد متسلح بالعلم والقيم، تحت إشراف نخبة من التربويين المتميزين.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white border-b border-primary-700 pb-2 inline-block">معلومات التواصل</h4>
              <ul className="space-y-3 text-sm text-primary-100">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                  <span>الرياض - حي الصفا - مخرج 15</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span className="dir-ltr">011 234 5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>info@albayan-nursery.edu.sa</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white border-b border-primary-700 pb-2 inline-block">روابط سريعة</h4>
              <div className="flex flex-col space-y-2 text-sm text-primary-200">
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  عن الروضة
                </a>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  التقويم الدراسي
                </a>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  بوابة القبول
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-primary-800 text-center md:flex md:justify-between md:items-center text-xs text-primary-400">
            <p>© {new Date().getFullYear()} روضة البيان. جميع الحقوق محفوظة.</p>
            <div className="flex space-x-4 space-x-reverse mt-4 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
               <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};