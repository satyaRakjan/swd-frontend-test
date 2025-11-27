"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUsers } from "../../store/userSlice";
import FormUser from "./FormUser";
import UserTable from "./UserTable";
import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";


import React from 'react';
export default function TablePage() {
    const dispatch = useDispatch();
     const { t } = useTranslation();
    const [editData, setEditData] = useState<any>(null);

    useEffect(() => {
        dispatch(loadUsers());
    }, []);
    return (
        <div style={{ padding: 40 }} >

            <h1 style={{ marginBottom: 24 }}>{t("formtTitle")}</h1>
{/*             
  "addUser": "สร้างรายชื่อ",
  "editUser": "แก้ไขราชื่อ" */}
            <Card
                title={editData ? t("editUser") : t("addUser")}
                style={{ marginBottom: 24 }}
            >
                <FormUser editData={editData} onFinishEdit={() => setEditData(null)} />
            </Card>
            <UserTable onEdit={(u: any) => setEditData({ ...u })} />
            {/* <FormUser editData={editData} onFinishEdit={() => setEditData(null)} />

            <UserTable onEdit={(u: any) => setEditData(u)} /> */}
        </div>
    )

}