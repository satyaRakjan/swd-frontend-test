"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import I18nProvider from "../components/I18nProvider"; // 💡 นำเข้า I18nProvider


export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <I18nProvider>{children}</I18nProvider></Provider>;
}
