'use client'
import { Button, Form, Input, Radio, Select } from "antd";
import { useState, useEffect } from "react";
import PostAPI from "../../utility/api/postApi";
import fetchApi from "../../utility/api/fetchApi";
import { useSelector, useDispatch } from "react-redux";

function CreateAddress({ close }) {
    const [result, setResult] = useState({
        loading: false, err: false, msg: ""
    });
    const [state, setState] = useState([]);
    const [emiratesLoading, setEmiratesLoading] = useState(false);
    const userDetails = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        setEmiratesLoading(true);
        const fetchData = async () => {
            const result = await fetchApi({ URI: 'public/emirates/getAll' });
            setState(result?.map(state => (
                {
                    emirateName: state?.emirate_name,
                    id: state?._id
                }
            )));
        };

        fetchData();
        setEmiratesLoading(false);
    }, []);


    const [form] = Form.useForm();

    async function formHandle(e) {
        try {
            const data = {
                userId: userDetails.userId,
                buildingOrOffice: e.buildingOrOffice,
                contactNo: e.contactNo,
                flatNumber: e.flatNumber,
                userName: e.userName,
                street: e.street,
                isOffice: e.isOffice,
                emirate: e.emirate

            };

            setResult({ ...result, loading: true });
            console.log("user details", userDetails)

            await PostAPI({ URI: 'address/create', Data: data, isTop: true, API_TOKEN: userDetails.token });
            dispatch(showToast({ type: 'success', message: 'Successfully saved new address' }));
            close && close(false)
            form.resetFields()
        } catch (err) {
            console.log("err in add ", err)
            setResult({ err: true, msg: "Unable to save address", loading: false });
        }
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select required style={{ width: 70, height: "2.25rem" }}>
                <Select.Option value="971">+971</Select.Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className="flex flex-col justify-center">
            <h2 className="font-semibold text-lg">New Address</h2>
            <Form
                form={form}
                name="addressForm"
                onFinish={formHandle}
                autoComplete="off"
                className="space-y-1"
            >
                <Form.Item name="isOffice" className="font-semibold">
                    <Radio.Group required>
                        <Radio.Button value={false}>Home</Radio.Button>
                        <Radio.Button value={true}>Office</Radio.Button>
                    </Radio.Group>
                </Form.Item>


                <Form.Item
                    name="userName"
                    rules={[
                        { required: true, message: 'Please input your full name!' },
                        {
                            pattern: /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/,
                            message: 'Please enter your full name (at least first and last name)',
                        },
                    ]}
                >
                    <label  >
                        Full Name
                        <Input placeholder="Full Name" />
                    </label>
                </Form.Item>

                <Form.Item
                    name="street"
                    rules={[
                        {
                            required: true,
                            message: 'Please input street!',
                        },
                    ]}
                >
                    <label  >
                        Street
                        <Input placeholder="Street name" />
                    </label>
                </Form.Item>

                <Form.Item
                    name="buildingOrOffice"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Building / Office Name!',
                        },
                    ]}
                >
                    <label  >
                        Building / Office Name
                        <Input placeholder="building name" />
                    </label>
                </Form.Item>

                <Form.Item
                    name="flatNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Flat No!',
                        },
                    ]}
                >
                    <label  >
                        Flat No.
                        <Input placeholder="Flat No." />
                    </label>
                </Form.Item>
                Emirates
                <Form.Item
                    name="emirate"
                    rules={[
                        {
                            required: true,
                            message: 'Please select your emirate!',

                        },
                    ]}
                    hidden={emiratesLoading}
                >
                    {/* Emirates */}
                    <Select placeholder="Select the emirate" className="h-10">

                        {state?.map((item, idx) => (
                            <Select.Option key={idx} value={item?.id}>
                                {item?.emirateName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="contactNo"
                    rules={[
                        { required: true, message: 'Please input your contact number!' },
                        {
                            pattern: /^05[0-9]{8}$/,
                            message: 'Please enter a valid UAE phone number (e.g. 0501234567)',
                        },
                    ]}
                >
                    <label  >
                        Contact No.
                        <Input type="number" placeholder="Eg: 050 123 45678" />
                    </label>
                </Form.Item>

                <Form.Item>
                    <p className={`${result.err ? "text-red-500" : "text-green-500"} text-center`}>{result.msg}</p>

                    <Button type="primary" className="bg-blue-500 w-full " htmlType="submit" loading={result.loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateAddress;
