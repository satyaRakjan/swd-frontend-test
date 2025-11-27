'use client'; 

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/index'; // นำเข้า config i18next ของคุณ

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  return (
    // ใช้ I18nextProvider จาก react-i18next เพื่อให้ Context ใช้งานได้
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;