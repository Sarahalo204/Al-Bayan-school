import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, cn } from '../utils';
import { User, Calendar, BookOpen, Truck, Receipt, CheckCircle, Clock, Upload, Loader2 } from 'lucide-react';
import { FEES } from '../constants';

export const DashboardPage: React.FC = () => {
  const { student, updateStudent } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [remainingFile, setRemainingFile] = useState<File | null>(null);

  if (!student) return null;

  // Simple logic to determine simulated balance
  // Assuming full year fee for simplicity of demo
  const totalFee = FEES.find(f => f.id === 'full')?.amount || 5700;
  const paidAmount = student.remainingPaymentReceipt ? totalFee : (student.initialPaymentReceipt ? 500 : 0);
  const remainingAmount = totalFee - paidAmount;
  
  const handleUploadRemaining = async () => {
    if (!remainingFile) return;
    setUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateStudent({
        ...student,
        remainingPaymentReceipt: remainingFile.name
    });
    setUploading(false);
    setRemainingFile(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">مرحباً، {student.fullName.first}</h1>
           <p className="text-slate-500">لوحة تحكم ولي الأمر ومتابعة المستحقات</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-slate-600">حالة التسجيل: <span className="text-green-600">نشط</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Student Info Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-600" />
                    بيانات الطالب
                </h3>
                <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">{student.id}</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">الاسم الكامل</label>
                    <p className="font-medium text-slate-700">
                        {student.fullName.first} {student.fullName.father} {student.fullName.grandfather} {student.fullName.family}
                    </p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">تاريخ الميلاد</label>
                    <div className="flex items-center gap-2 text-slate-700">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{student.dob}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">المستوى الأكاديمي</label>
                    <div className="flex items-center gap-2 text-slate-700">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{student.level}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">المعلمة</label>
                    <p className="font-medium text-slate-700">{student.teacher || 'لم يتم الاختيار'}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">النقل المدرسي</label>
                    <div className="flex items-center gap-2">
                        <Truck className={cn("w-4 h-4", student.busSubscription ? "text-primary-600" : "text-slate-400")} />
                        <span className={cn("font-medium", student.busSubscription ? "text-primary-700" : "text-slate-500")}>
                            {student.busSubscription ? 'مشترك' : 'غير مشترك'}
                        </span>
                    </div>
                </div>
                 <div className="space-y-1">
                    <label className="text-xs text-slate-400">هاتف الأم</label>
                    <p className="font-medium text-slate-700 dir-ltr text-right">{student.motherPhone}</p>
                </div>
            </div>
        </div>

        {/* Payment Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-amber-500" />
                    الرسوم والمدفوعات
                </h3>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div>
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500 text-sm">إجمالي الرسوم</span>
                        <span className="font-bold text-lg text-slate-800">{formatCurrency(totalFee)}</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                        <div 
                            className={cn("h-2.5 rounded-full", remainingAmount === 0 ? "bg-green-500" : "bg-amber-400")} 
                            style={{ width: `${(paidAmount / totalFee) * 100}%` }}
                        ></div>
                     </div>
                     <div className="flex justify-between text-xs text-slate-500">
                        <span>المدفوع: {formatCurrency(paidAmount)}</span>
                        <span>المتبقي: {formatCurrency(remainingAmount)}</span>
                     </div>
                </div>

                {/* Status Indicator */}
                <div className={cn(
                    "rounded-xl p-4 flex items-start gap-3",
                    remainingAmount === 0 ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-800"
                )}>
                    {remainingAmount === 0 ? <CheckCircle className="w-5 h-5 mt-0.5" /> : <Clock className="w-5 h-5 mt-0.5" />}
                    <div>
                        <p className="font-bold text-sm mb-1">
                            {remainingAmount === 0 ? "تم سداد كامل الرسوم" : "يوجد رصيد متبقي"}
                        </p>
                        {remainingAmount > 0 && <p className="text-xs opacity-80">يرجى سداد المبلغ المتبقي لإتمام الإجراءات.</p>}
                    </div>
                </div>

                {/* Secondary Payment Upload */}
                {remainingAmount > 0 && (
                    <div className="border-t border-slate-100 pt-4">
                        <h4 className="text-sm font-bold text-slate-700 mb-2">إرفاق إيصال السداد النهائي</h4>
                        {!student.remainingPaymentReceipt ? (
                            <div className="space-y-3">
                                <label className="block w-full cursor-pointer">
                                    <div className="border border-dashed border-slate-300 rounded-lg p-3 text-center hover:bg-slate-50 transition-colors">
                                        <span className="text-xs text-slate-500 block mb-1">
                                            {remainingFile ? remainingFile.name : 'اضغط لاختيار الملف'}
                                        </span>
                                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => e.target.files && setRemainingFile(e.target.files[0])} />
                                    </div>
                                </label>
                                <button 
                                    onClick={handleUploadRemaining}
                                    disabled={!remainingFile || uploading}
                                    className="w-full bg-slate-800 text-white text-sm py-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Upload className="w-3 h-3" /> رفع الإيصال</>}
                                </button>
                            </div>
                        ) : (
                             <div className="text-center py-2 text-sm text-green-600 font-medium bg-green-50 rounded-lg">
                                 جاري مراجعة الإيصال المرفق
                             </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};