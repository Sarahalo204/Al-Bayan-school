import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TEACHERS, MIN_PAYMENT_TO_RESERVE } from '../constants';
import { calculateLevel, cn } from '../utils';
import { AcademicLevel } from '../types';
import { Upload, Info, Check, Loader2 } from 'lucide-react';

export const RegistrationPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    fatherName: '',
    grandfatherName: '',
    familyName: '',
    idNumber: '',
    dob: '',
    password: '',
    confirmPassword: '',
    motherName: '',
    motherPhone: '',
    teacher: '',
    busSubscription: false,
    file: null as File | null,
  });

  const [level, setLevel] = useState<AcademicLevel>(AcademicLevel.UNKNOWN);

  useEffect(() => {
    if (formData.dob) {
      setLevel(calculateLevel(formData.dob));
    }
  }, [formData.dob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, busSubscription: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }
    if (!formData.file) {
      setError("يجب إرفاق إيصال التحويل");
      return;
    }
    if (level === AcademicLevel.UNKNOWN) {
      setError("تاريخ الميلاد غير مقبول للتسجيل في المراحل المتاحة");
      return;
    }

    setLoading(true);

    try {
      await register({
        id: formData.idNumber,
        fullName: {
          first: formData.firstName,
          father: formData.fatherName,
          grandfather: formData.grandfatherName,
          family: formData.familyName,
        },
        dob: formData.dob,
        level: level,
        password: formData.password,
        motherName: formData.motherName,
        motherPhone: formData.motherPhone,
        teacher: formData.teacher,
        busSubscription: formData.busSubscription,
        initialPaymentReceipt: formData.file.name, // Mock storage
        remainingPaymentReceipt: null,
        registrationDate: new Date().toISOString(),
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء التسجيل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">تسجيل طالب جديد</h2>
            <p className="text-primary-100 mt-2 text-sm">يرجى تعبئة جميع البيانات بدقة لضمان قبول التسجيل</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Info className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* Student Name */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">بيانات الطالب</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الأول</label>
                <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">اسم الأب</label>
                <input required name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">اسم الجد</label>
                <input required name="grandfatherName" value={formData.grandfatherName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">العائلة</label>
                <input required name="familyName" value={formData.familyName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">رقم الهوية / الإقامة</label>
                <input required type="text" pattern="\d+" name="idNumber" value={formData.idNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" placeholder="10xxxxxxxx" />
               </div>
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">تاريخ الميلاد</label>
                <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
               </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between border border-slate-200">
               <span className="text-sm font-medium text-slate-600">المستوى الأكاديمي المقترح:</span>
               <span className={cn(
                 "font-bold px-3 py-1 rounded-full text-sm",
                 level === AcademicLevel.UNKNOWN ? "bg-slate-200 text-slate-600" : "bg-primary-100 text-primary-700"
               )}>
                 {level}
               </span>
            </div>
          </div>

          {/* Login Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">بيانات الدخول</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">تأكيد كلمة المرور</label>
                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* Contact & Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">معلومات التواصل والتفضيلات</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">اسم الأم</label>
                    <input required name="motherName" value={formData.motherName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">رقم جوال الأم</label>
                    <input required type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors dir-ltr text-right" placeholder="05xxxxxxxx" />
                </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">اختيار المعلمة (اختياري)</label>
                <select name="teacher" value={formData.teacher} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                    <option value="">-- اختر المعلمة --</option>
                    {TEACHERS.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
                </select>
             </div>

             <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 cursor-pointer" onClick={() => setFormData(prev => ({...prev, busSubscription: !prev.busSubscription}))}>
                <input type="checkbox" name="busSubscription" checked={formData.busSubscription} onChange={handleCheckboxChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 border-gray-300" />
                <label className="text-sm font-medium text-slate-700 cursor-pointer">الاشتراك في النقل المدرسي (الباص)</label>
             </div>
          </div>

          {/* Payment */}
          <div className="space-y-4">
             <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">الدفع وإرفاق الإيصال</h3>
             <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <p className="font-bold mb-1">تنبيه هام:</p>
                يجب تحويل مبلغ لا يقل عن <span className="font-bold">{MIN_PAYMENT_TO_RESERVE} ريال</span> لحجز المقعد. يرجى إرفاق صورة التحويل أدناه.
             </div>
             
             <div className="mt-4">
                <label className="block w-full cursor-pointer group">
                    <div className={cn(
                        "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors",
                        formData.file ? "border-primary-500 bg-primary-50" : "border-slate-300 hover:border-primary-400 hover:bg-slate-50"
                    )}>
                         {formData.file ? (
                             <>
                                <Check className="w-10 h-10 text-primary-600 mb-2" />
                                <span className="text-sm font-medium text-primary-700">{formData.file.name}</span>
                                <span className="text-xs text-primary-500 mt-1">اضغط لتغيير الملف</span>
                             </>
                         ) : (
                             <>
                                <Upload className="w-10 h-10 text-slate-400 group-hover:text-primary-500 transition-colors mb-2" />
                                <span className="text-sm font-medium text-slate-600">اضغط لرفع صورة الإيصال</span>
                                <span className="text-xs text-slate-400 mt-1">PNG, JPG, PDF (Max 5MB)</span>
                             </>
                         )}
                         <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
                    </div>
                </label>
             </div>
          </div>

          <div className="pt-6">
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg"
            >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'إتمام التسجيل'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};