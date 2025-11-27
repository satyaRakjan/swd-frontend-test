"use client"
import React from "react";
import { Button ,Space,Layout, Typography, Flex } from 'antd';


const { Title } = Typography;
const { Header, Content, Footer } = Layout;



type ContentComponentProps = {
  children: React.ReactNode;
};

function ContentComponent({ children }: ContentComponentProps) {
  return (
    <Content style={{ padding: '0 50px', backgroundColor: '#FFF8DE', }}>
      {children}
    </Content>
  );
}

export default ContentComponent;