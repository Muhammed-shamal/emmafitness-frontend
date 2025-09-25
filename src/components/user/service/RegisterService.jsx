'use client'

import { Button, Form, Input, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchApi from "../../../utility/api/fetchApi";
import moment from "moment/moment";
import PostAPI from "../../../utility/api/postApi";

function RegisterService({ close }) {

    const [result, setResult] = useState({
        loading: false, err: false, msg: ""
    });
    const [orders, setOrders] = useState([])

    const userDetails = useSelector(state => state.user)


    useEffect(() => {
        fetchApi({ URI: `orders?filters[user][id][$eq]=${userDetails?.userId}&filters[createdAt][$between]=${moment().subtract(1, 'year').toISOString()}&filters[createdAt][$between]=${moment().toISOString()}`, API_TOKEN: userDetails?.token })
            .then((res) => {
                setOrders(res?.data?.map(state => (
                    {
                        label: `Order Id: ${state?.id} - Price: ${state?.attributes?.total_amount} (Dated: ${moment(state?.attributes?.createdAt).format("DD-MM-YYYY")})`,
                        value: state?.id
                    }
                )))
            })
            .catch(e => console.error(e))
    }, [])

    const [form] = Form.useForm();

    async function formHandle(e) {

        try {
            const data = {

                user: userDetails.userId,
                Subject: e.Subject,
                Description: e.Description,
                order: e.order,

            };

            setResult({ ...result, loading: true });

            await PostAPI({ URI: 'service-requests', Data: data, token: userDetails.token }).catch(e => console.error(e))
            setResult({ err: false, msg: "Successfully saved", loading: false });
            close && close()
            form.resetFields()
        } catch (err) {
            setResult({ err: true, msg: "Unable to save your request", loading: false });
        }
    }

    return (
        <div className="flex flex-col justify-center">
            <h2 className="font-semibold text-lg">Request for Service</h2>
            <Form
                form={form}
                name="requestForm"
                onFinish={formHandle}
                autoComplete="off"
                className="space-y-1"
            >

                <Form.Item
                    name="Subject"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your subject!',
                        },
                    ]}
                >
                    <label  >
                        Subject
                        <Input rows={4} placeholder="Enter subject" />
                    </label>
                </Form.Item>

                <Form.Item
                    name="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your description!',
                        },
                    ]}
                >
                    <label  >
                        Description
                        <Input.TextArea rows={4} placeholder="Enter Description" />
                    </label>
                </Form.Item>

                <label  >
                    Order
                    <Form.Item
                        name="order"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your order!',

                            },
                        ]}
                    >
                        {/* Emirates */}
                        <Select options={orders} placeholder="Select the order" className="h-10" />


                    </Form.Item>
                </label>


                <Form.Item>
                    <p className={`${result.err ? "text-red-500" : "text-green-500"} text-center`}>{result.msg}</p>

                    <Button type="primary" className="bg-blue-500 w-full " htmlType="submit" loading={result.loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterService