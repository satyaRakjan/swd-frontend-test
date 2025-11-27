
"use client";
import "../../styles/shapes.scss";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rotateShape } from "../../store/shapeSlice";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { Button, Flex, Card } from 'antd';
import { LeftOutlined, RightOutlined, UpOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
interface ShapeState {
  type: 'circle' | 'square' | 'oval' | 'trapezoid' | 'rectangle' | 'parallelogram';
  color: string;
  reversed: boolean;
}
const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};
const ALLOWED_COLORS = ["#FFA200", "#6EDA78"];

const getRandomColor = () => ALLOWED_COLORS[Math.floor(Math.random() * ALLOWED_COLORS.length)];

const initialShapeStates: ShapeState[] = [
  { type: 'circle', color: '#FFA200', reversed: false },
  { type: 'square', color: '#6EDA78', reversed: false },
  { type: 'oval', color: '#FFA200', reversed: false },
  { type: 'trapezoid', color: '#6EDA78', reversed: false },
  { type: 'rectangle', color: '#FFA200', reversed: false },
  { type: 'parallelogram', color: '#6EDA78', reversed: false },

];


export default function ShapePage() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const rotation = useSelector((s: RootState) => s.shape.rotation);
  const [layoutDown, setLayoutDown] = useState(false);

  const [shapeStates, setShapeStates] = useState(initialShapeStates);

  const moveLeft = () => {
    setShapeStates(prevStates => {
      const newArr = [...prevStates];

      const firstShape = newArr.shift();

      if (firstShape) {
        newArr.push(firstShape);
      }

      return newArr;
    });
  };
  const moveRight = () => {
    setShapeStates(prevStates => {
      const newArr = [...prevStates];
      const lastShape = newArr.pop(); // นำตัวสุดท้ายออก
      if (lastShape) {
        newArr.unshift(lastShape); // มาอยู่หน้าสุด
      }
      return newArr;
    });
  }

  const swapPosition = () => {
    setLayoutDown(prev => !prev);

    // setLayoutDown((prev) => !prev);
    // setShapeStates(prevStates => prevStates.map(shape => ({
    //   ...shape,
    //   reversed: !shape.reversed,
    // })));
  };

  const randomizeShape = () => {

    const newColors = shapeStates.map(() => getRandomColor());

    setShapeStates((array) => {
      const newArr = [...array];

      let i = newArr.length, j, temp;

      while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));

        temp = newArr[j];
        newArr[j] = newArr[i];
        newArr[i] = temp;
      }

      return newArr.map((shape, index) => ({
        ...shape,
        color: newColors[index],
      }));
    });
  };

  const getShapeStyle = (shape: ShapeState, rotation: number) => {
    let style: React.CSSProperties = {
      transform: `rotate(${rotation}deg)`,
    };

    if (shape.reversed) {
      style.transform += ` scaleX(-1)`;
    }

    if (shape.type === 'trapezoid') {
      style.borderBottomColor = shape.color;
    } else {
      style.backgroundColor = shape.color;
    }

    return style;
  };


  return (
    <div style={{ margin: '16px 0' }}>
      <h1 style={{ marginBottom: 24 }}>{t("shapeTitle")}</h1>
      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        <Button icon={<LeftOutlined />} onClick={moveLeft}>{t("moveShape")} {t("left")}</Button>
        <Button icon={layoutDown ? <DownOutlined /> : <UpOutlined />} type="primary" onClick={swapPosition}>{t("movePosition")}</Button>

        <Button type="default" onClick={moveRight} >
          {t("moveShape")} {t("right")} <RightOutlined />
        </Button>
      </div>
      <Card style={{ marginTop: 16,marginRight: "200px" ,backgroundColor: '#FFF8DE' }} >
        <Flex justify={layoutDown ? "center" : "flex-end"} align="center" style={{ gap: "15px",}}>
          {shapeStates.slice(3, 6).map((shape, i) => (
            <div
              key={`left-${i}`}
              className={`shape ${shape.type}`}
              style={getShapeStyle(shape, rotation)}
              onClick={randomizeShape}
            />
          ))}
        </Flex>

        <Flex justify={layoutDown ? "flex-end" : "center"} align="center" style={{ marginTop: 16, gap: "15px" }}>
          {shapeStates.slice(0, 3).map((shape, i) => (
            <div
              key={`right-${i}`}
              className={`shape ${shape.type}`}
              style={getShapeStyle(shape, rotation)}
              onClick={randomizeShape}
            />
          ))}
        </Flex>

      </Card>

    </div>

  );
}