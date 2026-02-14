import React from 'react';
import { Link } from 'react-router-dom';
import { FEES } from '../constants';
import { formatCurrency } from '../utils';
import { ArrowLeft, Palette, Bus, Award, MapPin } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-primary-900 rounded-2xl overflow-hidden shadow-2xl mx-0 lg:mx-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/geometric-leaves.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-800/80 to-primary-950/90 z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-right space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-800/50 border border-primary-700 text-primary-100 rounded-full text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              التسجيل متاح للعام الدراسي الجديد
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              روضة البيان <br/>
              <span className="text-primary-300">منارة للعلم والقيم</span>
            </h1>
            
            <p className="text-lg text-primary-100 max-w-xl mx-auto md:mx-0 leading-relaxed">
              نقدم تعليماً متطوراً في بيئة آمنة ومحفزة، نركز على بناء شخصية الطفل وتنمية مهاراته من خلال برامج أكاديمية وأنشطة إثرائية متنوعة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 font-bold rounded-lg hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                تسجيل طالب جديد
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary-400 text-white font-bold rounded-lg hover:bg-primary-800 hover:border-primary-300 transition-all text-lg"
              >
                دخول أولياء الأمور
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center perspective-1000">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Creative Learning at Al-Bayan" 
                    className="relative rounded-2xl shadow-2xl border-4 border-primary-800/50 w-full max-w-md object-cover h-[450px]"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Updated */}
      <section className="px-4 lg:px-0">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900">لماذا روضة البيان؟</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">نحرص على تقديم تجربة تعليمية متكاملة تتجاوز الفصول الدراسية</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-primary-50 text-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <Palette className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-800 transition-colors">أنشطة لا منهجية أسبوعية</h3>
                <p className="text-slate-500 leading-relaxed">
                    نخصص وقتاً أسبوعياً لتنمية مواهب الأطفال في الرسم، الرياضة، والفنون اليدوية لتعزيز إبداعهم.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-primary-50 text-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <Bus className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-800 transition-colors">رحلات مدرسية تعليمية</h3>
                <p className="text-slate-500 leading-relaxed">
                    ننظم زيارات ميدانية دورية لمعالم تعليمية وترفيهية مختارة بعناية لربط التعلم بالواقع.
                </p>
            </div>

            {/* Feature 3 (Kept general quality) */}
             <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-primary-50 text-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <Award className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-800 transition-colors">تميز أكاديمي وتربوي</h3>
                <p className="text-slate-500 leading-relaxed">
                    مناهجنا معتمدة وكادرنا مؤهل للتعامل مع الفروق الفردية وغرس القيم الإسلامية الحميدة.
                </p>
            </div>
        </div>
      </section>

      {/* Fees Section */}
      <section className="px-4 lg:px-0 bg-slate-50 rounded-3xl py-16 border border-slate-100">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900">الرسوم الدراسية</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                <thead className="bg-primary-900 text-white">
                    <tr>
                    <th className="px-6 py-5 font-bold text-lg">نوع الرسوم</th>
                    <th className="px-6 py-5 font-bold text-lg">التفاصيل</th>
                    <th className="px-6 py-5 font-bold text-lg text-left">المبلغ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {FEES.map((fee, idx) => (
                    <tr key={fee.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="px-6 py-5 text-slate-800 font-bold">{fee.title}</td>
                        <td className="px-6 py-5 text-slate-500 text-sm">{fee.description}</td>
                        <td className="px-6 py-5 text-primary-700 font-bold text-left dir-ltr text-lg">
                        {formatCurrency(fee.amount)}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-200 text-center sm:text-right flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <p className="text-sm font-medium">يشترط دفع رسوم حجز مقعد تخصم من الرسوم.</p>
                </div>
                <Link to="/register" className="bg-primary-700 text-white px-8 py-3 rounded-lg hover:bg-primary-800 transition-colors shadow-sm font-bold text-sm">
                    سجّل الآن
                </Link>
            </div>
            </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="px-4 lg:px-0 pb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 space-y-6">
                <div className="inline-block p-3 bg-primary-50 text-primary-700 rounded-lg">
                    <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">موقعنا</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                    تقع روضة البيان في موقع استراتيجي يسهل الوصول إليه، لتوفير الوقت والجهد على أولياء الأمور.
                </p>
                
                <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center flex-shrink-0 mt-1 text-xs">1</div>
                        <div>
                            <h4 className="font-bold text-slate-800">العنوان الرئيسي</h4>
                            <p className="text-slate-500">الرياض - حي الصفا - مخرج 15</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center flex-shrink-0 mt-1 text-xs">2</div>
                        <div>
                            <h4 className="font-bold text-slate-800">أوقات الدوام</h4>
                            <p className="text-slate-500">من الأحد إلى الخميس: 6:30 صباحاً - 2:00 ظهراً</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full min-h-[400px] w-full bg-slate-100 relative">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.588863678076!2d46.77259631500366!3d24.70664998412644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f070c79215033%3A0x67c024765796030!2sAs%20Safa%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, minHeight: '400px'}} 
                    allowFullScreen={false} 
                    loading="lazy"
                    title="Al-Bayan Nursery Location"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </div>
        </div>
      </section>
    </div>
  );
};