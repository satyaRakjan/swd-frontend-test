"use client"
import Image from "next/image";
import styles from "./page.module.css";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button, Space, Layout, Typography, Flex } from 'antd';
import { useRouter } from 'next/navigation'; // Hook สำหรับการนำทางใน App Router
import { useTranslation } from "react-i18next";


const { Title } = Typography;
const { Header, Content, Footer } = Layout;
export default function Home() {
  const { t } = useTranslation();

  const router = useRouter();

  // ฟังก์ชันสำหรับนำทางไปยังหน้า /shape
  const navigateToShape = () => {
    router.push('/shape');
  };

  // ฟังก์ชันสำหรับนำทางไปยังหน้า /table
  const navigateToTable = () => {
    router.push('/table');
  };
  // {t("language.english")}

  return (

    <Content style={{ minHeight: '100vh', backgroundColor: '#FFF8DE', }}>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingTop: 80,
      }}>
        <Space size="large" direction="horizontal">
          {/* ปุ่มนำทางไปยังหน้า Shape */}
          <Button
            type="primary"
            size="large"
            onClick={navigateToShape}
            style={{ height: 60, minWidth: 200, backgroundColor: '#FFA200',borderColor: '#000000ff' }}
          >
            {t("shapeTitle")}
          </Button>

          {/* ปุ่มนำทางไปยังหน้า Table */}
          <Button
            type="default"
            size="large"
            onClick={navigateToTable}
            style={{ height: 60, minWidth: 200, backgroundColor: '#6EDA78', borderColor: '#000000ff', color: 'white' }}
          >
            {t("formtTitle")}
          </Button>
        </Space>

      </div>


    </Content>


  );
}
