// import path from 'path';
// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ mode }) => {
//     const env = loadEnv(mode, '.', '');
//     return {
//       server: {
//         port: 3000,
//         host: '0.0.0.0',
//       },
//       plugins: [react()],
//       define: {
//         'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
//         'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
//       },
//       resolve: {
//         alias: {
//           '@': path.resolve(__dirname, '.'),
//         }
//       }
//     };
// });

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), ''); // استخدام process.cwd() أكثر استقراراً
    
    return {
      // 1. إضافة المسار الأساسي لضمان تحميل ملفات الـ JS/CSS بشكل صحيح
      base: '/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      
      plugins: [react()],
      
      // 2. تحسين تعريف المتغيرات (أحياناً Vercel يحتاج تعريفها كـ global)
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'global': {}, // إضافة هذا السطر يحل مشاكل توافق بعض المكتبات
      },

      resolve: {
        alias: {
          // 3. تعديل الـ Alias ليكون أكثر دقة (يشير لمجلد المشروع)
          '@': path.resolve(__dirname, './'),
        },
      },

      // 4. التأكد من إعدادات الـ Build (اختياري ولكن يفضل وجوده)
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false, // تعطيله يقلل من حجم الملفات المرفوعة
      }
    };
});
