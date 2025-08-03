'use client'
import { Alert, Button, Form, Input, Radio, Select } from "antd";
import { useState, useEffect } from "react";
import updateAPI from "../../utility/api/updateAPI";
import fetchApi from "../../utility/api/fetchApi";
import { useSelector } from "react-redux";

function EditAddress({ Data, close }) {
    const [result, setResult] = useState({ loading: false, err: false, msg: '' });
    const [emirates, setEmirates] = useState([]);
    const [emiratesLoading, setEmiratesLoading] = useState(false);
    const [form] = Form.useForm();
    const user = useSelector(state => state?.user);

    // 🔄 Fetch emirates
    useEffect(() => {
        const fetchData = async () => {
            setEmiratesLoading(true);
            const result = await fetchApi({ URI: 'public/emirates/getAll' });
            const mapped = result?.map(state => ({
                label: state?.emirate_name,
                value: state?._id
            })) || [];
            setEmirates(mapped);
            setEmiratesLoading(false);
        };
        fetchData();
    }, []);

    // ⬅️ Set initial form values from `Data` prop
    useEffect(() => {
        if (Data) {
            form.setFieldsValue({
                isOffice: Data?.isOffice,
                userName: Data?.userName,
                street: Data?.street,
                buildingOrOffice: Data?.buildingOrOffice,
                flatNumber: Data?.flatNumber,
                emirate: Data?.emirate,
                contactNo: Data?.contactNo
            });
        }
    }, [Data, form]);

    // 🧠 Submit handler
    const formHandle = async (values) => {
        try {
            setResult({ loading: true, err: false, msg: '' });

            await updateAPI({
                URI: `address/update/${Data?.id}`,
                Data: values,
                token: user?.token,
                isTop: true
            });

            setResult({ err: false, msg: 'Successfully updated', loading: false });
            close?.(); // Close if available
        } catch (err) {
            setResult({ err: true, msg: 'Unable to save address', loading: false });
            console.error('Error while updating address:', err);
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <h2 className="font-semibold text-lg">Edit Address</h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={formHandle}
                autoComplete="off"
            >
                <Form.Item name="isOffice" label="Address Type">
                    <Radio.Group>
                        <Radio.Button value={false}>Home</Radio.Button>
                        <Radio.Button value={true}>Office</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="userName"
                    label="Full Name"
                    rules={[
                        { required: true, message: 'Please input your full name!' },
                        {
                            pattern: /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/,
                            message: 'Please enter your full name (at least first and last name)',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item name="street" label="Street" rules={[
                    {
                        required: true,
                        message: 'Please input street!',
                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item name="buildingOrOffice" label="Building / Office Name" rules={[
                    {
                        required: true,
                        message: 'Please input Building / Office Name!',
                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item name="flatNumber" label="Flat No." rules={[
                    {
                        required: true,
                        message: 'Please input flat number!',
                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="emirate"
                    label="Emirate"
                    rules={[{ required: true, message: 'Please select your emirate!' }]}
                >
                    <Select
                        loading={emiratesLoading}
                        placeholder="Select the emirate"
                        options={emirates}
                    />
                </Form.Item>

                <Form.Item
                    name="contactNo"
                    label="Contact No."
                    rules={[
                        { required: true, message: 'Please input your contact number!' },
                        {
                            pattern: /^05[0-9]{8}$/,
                            message: 'Please enter a valid UAE phone number (e.g. 0501234567)',
                        },
                    ]}
                >
                    <Input maxLength={10} />
                </Form.Item>

                {result.msg && (
                    <Form.Item>
                        <Alert
                            message={result.msg}
                            type={result.err ? 'error' : 'success'}
                            showIcon
                        />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-500 w-full"
                        loading={result.loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditAddress;
