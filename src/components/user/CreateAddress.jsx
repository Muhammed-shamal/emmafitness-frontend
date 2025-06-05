'use client'
import { Button, Form, Input, Radio, Select } from "antd";
import { useState, useEffect } from "react";
import PostAPI from "../../utility/api/postApi";
import fetchApi from "../../utility/api/fetchApi";
import { useSelector } from "react-redux";

function CreateAddress({close}) {
    const [result, setResult] = useState({
        loading: false, err: false, msg: ""
    });
    const [state, setState] = useState([]);

    const userDetails = useSelector(state => state.user)

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchApi({ URI: 'states' }).catch(e=>console.log(e));
            setState(result?.data?.map(state => (
                {
                    emirateName: state?.attributes?.emirate_name,
                    id: state?.id
                }
            )));
        };

        fetchData();
    }, []);


    const [form] = Form.useForm();

    async function formHandle(e) {
        try {
            const data = {
                
                    user: userDetails.userId,
                    buildingOrOffice: e.buildingOrOffice,
                    contactNo: e.contactNo,
                    flatNumber: e.flatNumber,
                    fullName: e.fullName,
                    street: e.street,
                    isOffice: e.isOffice,
                    emirate: e.emirate
                
            };

            setResult({ ...result, loading: true });
    

             await PostAPI({ URI: 'addresses', Data: data, token: userDetails.token });
            setResult({ err: false, msg: "Successfully saved", loading: false });
            close && close(false)
            form.resetFields()
        } catch (err) {
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
                <Form.Item name="isOffice"  className="font-semibold">
                    <Radio.Group required>
                        <Radio.Button value={false}>Home</Radio.Button>
                        <Radio.Button value={true}>Office</Radio.Button>
                    </Radio.Group>
                </Form.Item>


                <Form.Item
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                    ]}
                >
                    <label  >
                        Full Name
                        <Input placeholder="Full Name"/>
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
                        <Input placeholder="building name"/>
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
                        <Input placeholder="Flat No."/>
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
                >
                    {/* Emirates */}
                    <Select placeholder="Select the emirate"   className="h-10">

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
                        {
                            required: true,
                            message: 'Please input contact no.!',
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
