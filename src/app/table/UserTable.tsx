// "use client";
// import { Table, Button, Checkbox } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { deleteUser, deleteMany } from "../../store/userSlice";
// import { useState } from "react";

// export default function UserTable({ onEdit }: any) {
//   const users = useSelector((s: RootState) => s.users.users);
//   const dispatch = useDispatch();
//   const [selected, setSelected] = useState<string[]>([]);

//   const columns = [
//     { title: "Name", dataIndex: "firstname", render: (_: any, r: any) => r.firstname + " " + r.lastname },
//     { title: "Gender", dataIndex: "gender" },
//     { title: "Phone", dataIndex: "phone" },
//     { title: "Nationality", dataIndex: "nationality" },
//     {
//       title: "Manage",
//       render: (_: any, record: any) => (
//         <>
//           <Button onClick={() => onEdit(record)} type="link">EDIT</Button>
//           <Button danger type="link" onClick={() => dispatch(deleteUser(record.id))}>
//             DELETE
//           </Button>
//         </>
//       )
//     }
//   ];

//   return (
//     <>
     
//       <Table
//         rowKey="id"
//         dataSource={users}
//         columns={columns}
//         pagination={{ pageSize: 5 }}
//         rowSelection={{
//           selectedRowKeys: selected,
//           onChange: (keys) => setSelected(keys as string[])
//         }}
//       />
//     </>
//   );
// }


"use client";
import { Table, Button, Checkbox ,Popconfirm,message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteUser, deleteMany } from "../../store/userSlice";
import { useState } from "react";

export default function UserTable({ onEdit }: any) {
  const users = useSelector((s: RootState) => s.users.users);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const columnConfig = [
    
  { title: "Name", dataIndex: "firstname", renderName: (r: any) => r.firstname + " " + r.lastname, sortable: true },
  { title: "Gender", dataIndex: "gender", sortable: true },
  { title: "Phone", dataIndex: "phone", renderName: (r: any) => `${r.countryCode || ""}${r.phone || ""}`, sortable: true },
  { title: "Nationality", dataIndex: "nationality", sortable: true },
  { title: "Manage", type: "action" }, // action column ไม่ต้อง sort
  ];

const handleDeleteSelected = () => {
    if (selected.length === 0) {
      message.warning("Please select at least one user to delete!");
      return;
    }
    dispatch(deleteMany(selected));
    message.success("Selected users deleted!");
    setSelected([]);
  };

const columns = columnConfig.map(col => {
  if (col.type === "action") {
    return {
      title: col.title,
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => onEdit(record)} type="link">EDIT</Button>
          <Button danger type="link" onClick={() => dispatch(deleteUser(record.id))}>
            DELETE
          </Button>
        </>
      ),
    };
  }

  return {
    title: col.title,
    dataIndex: col.dataIndex,
    render: col.renderName
          ? (_: any, record: any) => col.renderName(record)
      : undefined, // แก้ตรงนี้
    sorter: col.sortable
      ? (a: any, b: any) => {
          const valA = col.renderName ? col.renderName(a) : a[col.dataIndex];
          const valB = col.renderName ? col.renderName(b) : b[col.dataIndex];
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
          Select All
        </Checkbox>

        <Popconfirm
          title="Are you sure to delete all selected users?"
          onConfirm={handleDeleteSelected}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            style={{ marginLeft: 10 }}
            disabled={selected.length === 0}
          >
            Delete All
          </Button>
        </Popconfirm>
      </div>


      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        pagination={{ pageSize: 2}}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelected(keys as string[])
        }}
      />
    </>
  );
}
