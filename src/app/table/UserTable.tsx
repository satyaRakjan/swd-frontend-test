


"use client";
import { Table, Button, Checkbox, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteUser, deleteMany } from "../../store/userSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { User } from "../../type/User";

type ColumnItem = {
  title: string;
  dataIndex?: keyof User;
  sortable?: boolean;
  type?: "action";
  renderName?: (r: User) => string;
};



export default function UserTable({ onEdit }: any) {
  const { t } = useTranslation();
  const users = useSelector((s: RootState) => s.users.users);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);



  const columnConfig: ColumnItem[] = [

    { title: t("fullName"), dataIndex: "firstname", renderName: (r: User) => r.firstname + " " + r.lastname, sortable: true },
    { title: t("gender"), dataIndex: "gender", sortable: true, renderName: (r: User) => t(`${r.gender}`) },
    { title: t("phone_number"), dataIndex: "phone", renderName: (r: User) => `${r.countryCode || ""}${r.phone || ""}`, sortable: true },
    { title: t("require_nationality"), dataIndex: "nationality", renderName: (r: User) => t(`${r.nationality}`), sortable: true },
    { title: t("mange"), type: "action" }, // action column ไม่ต้อง sort
  ];

  const handleDeleteSelected = () => {
    if (selected.length === 0) {
      return;
    }
    dispatch(deleteMany(selected));
    message.success(t("deleteSucess"));
    setSelected([]);
  };

  const handleDeleteSingle = (record: any) => {
    dispatch(deleteUser(record.id));
    message.success(t("deleteSucess")); 
  };
  

  

  const columns = columnConfig.map(col => {
    if (col.type === "action") {
      return {
        title: col.title,
        render: (_: User, record: User) => (
          <>
            <Button onClick={() => onEdit(record)} type="link">{t("edit")}</Button>
            <Popconfirm
              title={t("confirm_delete_title")}
              description={t("confirm_delete_description")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={() => 
               handleDeleteSingle(record)
                
              }
            >
              <Button danger type="link">
                {t("delete")}
              </Button>
            </Popconfirm>

            {/* <Button danger type="link" onClick={() => dispatch(deleteUser(record.id))}>
              {t("delete")}
            </Button> */}
          </>
        ),
      };
    }

    return {
      title: col.title,
      dataIndex: col.dataIndex,
      render: col.renderName
        ? (_: any, record: User) => col.renderName!(record)
        : undefined,
      sorter: col.sortable
        ? (a: User, b: User) => {
          const valA = col.renderName ? col.renderName(a) : a[col.dataIndex!];
          const valB = col.renderName ? col.renderName(b) : b[col.dataIndex!];
          return valA.toString().localeCompare(valB.toString());
        }
        : undefined,
    };
  });

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Checkbox
          checked={selected.length === users.length && users.length > 0}
          indeterminate={selected.length > 0 && selected.length < users.length}
          onChange={e =>
            setSelected(e.target.checked ? users.map(u => u.id) : [])
          }
        >

          {t("selectAll")}
        </Checkbox>

        <Popconfirm
          title={t("deleteWarning")}
          onConfirm={handleDeleteSelected}
          okText={t("yes")}
          cancelText={t("no")}
        >
          <Button
            danger
            style={{ marginLeft: 10 }}
            disabled={selected.length === 0}
          >

            {t("deleteAll")}
          </Button>
        </Popconfirm>
      </div>


      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        pagination={{ pageSize: 2 }}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelected(keys as string[])
        }}
      />
    </>
  );
}
