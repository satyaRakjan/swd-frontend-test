"use client";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  console.log(i18n)
  return (
    <Select
      defaultValue={i18n.language}
      style={{ width: 140 }}
      onChange={(lng) => i18n.changeLanguage(lng)}
      options={[
        { value: "en", label: "English" },
        { value: "th", label: "ไทย" }
      ]}
    />
  );
}
