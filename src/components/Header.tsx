"use client"
import Image from "next/image";
import styles from "./page.module.css";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button, Space, Layout, Typography, Flex } from 'antd';
import { useRouter, usePathname } from 'next/navigation'; // Hook สำหรับการนำทางใน App Router
import { useTranslation } from "react-i18next";


const { Title } = Typography;
const { Header, Content, Footer } = Layout;
export default function HeaderComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const showNavButtons = pathname !== "/";


  return (
    <Header
      style={{
        backgroundColor: '#FFF2C6',

      }}
    >
      <Flex gap="middle" justify="space-between" align="center" >
        <Title level={2}>
          SWD Frontend Test
        </Title>
        {showNavButtons && (
          <Flex gap="small" style={{ marginTop: 10 }}>
            {/* ซ่อนปุ่ม Home ถ้าอยู่หน้า "/" */}
            {pathname !== "/" && (
              <Button type="link" onClick={() => router.push("/")}>
                {t("HomeTitle")} /
                
              </Button>
            )}
            {pathname !== "/shape" && (
              <Button type="link" onClick={() => router.push("/shape")}>
                {t("shapeTitle")} /
              </Button>
            )}
            {pathname !== "/table" && (
              <Button type="link" onClick={() => router.push("/table")}>
                 {t("formtTitle")} /
              </Button>
            )}
          </Flex>
        )}


        <LanguageSwitcher />

      </Flex>

      {/* เมนูนำทาง */}

    </Header>
  );
}
