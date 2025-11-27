"use client";
import { Space, Button, Form, Input, Radio, Select, Row, Col, DatePicker } from "antd";
import { User } from "../../type/User";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../store/userSlice";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

const countryCodes = [
    { label: "Thailand (+66)", value: "+66" },
    { label: "USA (+1)", value: "+1" },
    { label: "Japan (+81)", value: "+81" },
    { label: "China (+86)", value: "+86" },
    { label: "UK (+44)", value: "+44" },
];



export default function FormUser({ editData, onFinishEdit }: any) {
    const [form] = Form.useForm();
    const [code, setCode] = useState("+66");
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const ref1 = useRef<any>(null);
    const ref2 = useRef<any>(null);
    const ref3 = useRef<any>(null);
    const ref4 = useRef<any>(null);
    const ref5 = useRef<any>(null);
    console.log(editData)
    useEffect(() => {
        if (!editData) {
            form.resetFields();
            return;
        }


        if (editData) {
            console.log(form)
            form.setFieldsValue({
                title: editData.title,
                firstname: editData.firstname,
                lastname: editData.lastname,
                // Birthdate ต้องแปลงเป็น dayjs
                birthdate: editData.birthdate ? dayjs(editData.birthdate) : null,
                nationality: editData.nationality,
                citizenId1: editData.citizenId1,
                citizenId2: editData.citizenId2,
                citizenId3: editData.citizenId3,
                citizenId4: editData.citizenId4,
                citizenId5: editData.citizenId5,
                gender: editData.gender,
                phone: editData.phone,
                passportNo: editData.passportNo,
                exSalary: editData.exSalary,
            });
            // form.setFieldsValue({
            //     ...editData,

            // });
        } else {
            // form.resetFields();
        }
    }, [editData]);



    console.log(editData)
    const submit = (values: User) => {
        console.log(values)
        if (editData) {
            dispatch(updateUser({ ...values, id: editData.id }));
            onFinishEdit();
        } else {
            dispatch(addUser({ ...values, id: uuid() }));
        }
        form.resetFields();
    };

    const autoFocusNext = (e: any, max: number, nextRef: any) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length >= max && nextRef?.current) {
            console.log("ok")
            nextRef.current.focus();
            nextRef.current.input.focus();
        }
    };

    const handleReset = () => {
        form.resetFields();
        onFinishEdit();
    };



    return (
        <Form key={editData ? editData.id : "new"} form={form} onFinish={submit} suppressHydrationWarning={true} >

            <Row gutter={16}>

                <Col span={4}>
                    <Form.Item label={t("title")} name="title" rules={[{ required: true, message: t("require_title") }]}>
                        <Select placeholder={t("title")}>
                            <Select.Option value="Mr.">{t("title_mr")}</Select.Option>
                            <Select.Option value="Mrs.">{t("title_mrs")}</Select.Option>
                            <Select.Option value="Ms.">{t("title_ms")}</Select.Option>
                            {/* เพิ่มตัวเลือกอื่น ๆ เช่น Prof. ถ้าต้องการ */}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Form.Item label={t("firstname")} name="firstname" rules={[{ required: true, message: t("require_firstname") }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Form.Item label={t("lastname")} name="lastname" rules={[{ required: true, message: t("require_lastname") }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item label={t("birthdate")} name="birthdate" rules={[{ required: true, message: t("require_birthdate") }]}>
                        <DatePicker
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YY"
                            locale={t('dayjs_locale') === 'th' ? require('dayjs/locale/th') : undefined}
                        />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={t("nationality")} name="nationality" rules={[{ required: true, message: t("require_nationality") }]}>
                        <Select options={[
                            { value: "Thai", label: t("nationality_thai") },
                            { value: "American", label: t("nationality_american") },
                        ]} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label={t("citizen_id")} style={{ marginBottom: 0 }}>
                <Space.Compact>

                    <Form.Item
                        name="citizenId1"
                        noStyle
                        rules={[{ required: true, message: t("require_citizenId") },
                        { pattern: /^\d+$/, message: t("only_numbers") },]}
                    >
                        <Input
                            ref={ref1}
                            onChange={(e) => autoFocusNext(e, 1, ref2)}
                            style={{ width: '6%', textAlign: 'center' }}
                            maxLength={1}
                        />
                    </Form.Item>

                    <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>

                    <Form.Item
                        name="citizenId2"
                        noStyle
                        rules={[{ required: true, message: t("require_citizenId") },
                        { pattern: /^\d+$/, message: t("only_numbers") },]}
                    >
                        <Input
                            ref={ref2}
                            onChange={(e) => autoFocusNext(e, 4, ref3)}
                            style={{ width: '18%', textAlign: 'center' }}
                            maxLength={4}
                        />
                    </Form.Item>


                    <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>

                    <Form.Item
                        name="citizenId3"
                        noStyle
                        rules={[{ required: true, message: t("require_citizenId") },
                        { pattern: /^\d+$/, message: t("only_numbers") },]}
                    >
                        <Input
                            ref={ref3}
                            onChange={(e) => autoFocusNext(e, 5, ref4)}
                            style={{ width: '25%', textAlign: 'center' }}
                            maxLength={5}
                        />
                    </Form.Item>


                    <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>
                    <Form.Item
                        name="citizenId4"
                        noStyle
                        rules={[{ required: true, message: t("require_citizenId") },
                        { pattern: /^\d+$/, message: t("only_numbers") },]}
                    >
                        <Input
                            ref={ref4}
                            onChange={(e) => autoFocusNext(e, 2, ref5)}
                            style={{ width: '15%', textAlign: 'center' }}
                            maxLength={2}
                        />
                    </Form.Item>


                    <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>
                    <Form.Item
                        name="citizenId5"
                        noStyle
                        rules={[{ required: true, message: t("require_citizenId") },
                        { pattern: /^\d+$/, message: t("only_numbers") },]}
                    >
                        <Input
                            ref={ref5}
                            style={{ width: '6%', textAlign: 'center' }}
                            maxLength={1}
                        />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>






            <Form.Item label={t("gender")} style={{ marginTop: 16 }} name="gender" rules={[{ required: true, message: t("require_gender") }]}>
                <Radio.Group>
                    <Radio value="Male">{t("gender_male")}</Radio>
                    <Radio value="Female">{t("gender_female")}</Radio>
                    <Radio value="Unisex">{t("gender_unisex")}</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label={t("phone_number")}
                required
            >
                <Space.Compact style={{ width: "100%" }}>
                    {/* Select สำหรับ country code */}
                    <Form.Item
                        name="countryCode" // เก็บค่า country code
                        noStyle
                        initialValue={code} // ค่าเริ่มต้น
                    >
                        <Select
                            style={{ width: 150 }}
                            onChange={(v) => setCode(v)} // อัปเดต state ถ้าต้องการ
                            options={countryCodes}
                        />
                    </Form.Item>

                    {/* Input เบอร์โทร */}
                    <Form.Item
                        name="phone" // เก็บค่า phone
                        noStyle
                        rules={[
                            { required: true, message: t("require_phone") },
                            { pattern: /^\d{1,9}$/, message: t("only_numbers_max9") },
                        ]}
                    >
                        <Input
                            placeholder={t("placeholder_phone")}
                            maxLength={9}
                        />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>

            <Form.Item
                label={t("passport_no")}
                required
            >
                <Form.Item
                    name="passportNo"
                    rules={[
                        { required: false, message: "" },
                        { pattern: /^\d+$/, message: t("only_numbers") }
                        
                    ]}
                >
                    <Input placeholder={t("placeholder_passport")} />
                </Form.Item>



            </Form.Item>


            <Form.Item
                 label={t("expected_salary")}
                required
            >
                <Form.Item
                    name="exSalary"
                      rules={[{ required: true, message: t("require_salary") },{ pattern: /^\d+$/, message: t("only_numbers") }]}
                >
                    <Input placeholder={t("placeholder_salary")} />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="reset" onClick={handleReset}>{t("reset")}</Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                        {t("submit")}
                    </Button>
                </Form.Item>

            </Form.Item>

        </Form>
    );
}