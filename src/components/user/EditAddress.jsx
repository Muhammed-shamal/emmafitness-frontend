'use client'
import { Button, Form, Input, Radio, Select } from "antd";
import { useState, useEffect } from "react";
import updateAPI from "../../utility/api/updateAPI";
import fetchApi from "../../utility/api/fetchApi";
import { useSelector } from "react-redux";

function EditAddress({ Data , close}) {
    const [result, setResult] = useState({
        loading: false, err: false, msg: ""
    });
    const [state, setState] = useState([])
    const [data, setData] = useState({})
    const user = useSelector(state => state?.user)


    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchApi({ URI: 'states?populate=*' }).catch(e => console.log(e));
            setState(result?.data?.map(state => (
                {
                    emirateName: state?.attributes?.emirate_name,
                    id: state?.id
                }
            )));
            setData({ ...Data })
        };

        fetchData();

    }, []);


    const [form] = Form.useForm();

    async function formHandle(e) {
        try {

            setResult({ ...result, loading: true });

            await updateAPI({ URI: `addresses/${data.id}`, Data: data, token: user?.token });
            setResult({ err: false, msg: "Successfully updated", loading: false });
            close && close()

        } catch (err) {
            setResult({ err: true, msg: "Unable to save address", loading: false });
            console.error('Error while updating address:', err);
        }
    }

    const inputHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <div className="flex flex-col justify-center">
            <h2 className="font-semibold text-lg">Edit Address</h2>
            <Form
                form={form}
                name="addressForm"
                onFinish={formHandle}
                autoComplete="off"
            >
                <Form.Item name="isOffice" >
                    <Radio.Group required onChange={inputHandle}>
                        <Radio.Button checked={!data?.isOffice} value={false}>Home</Radio.Button>
                        <Radio.Button checked={data?.isOffice} value={true}>Office</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="userName" >
                    <label>
                        Full Name
                        <Input name="userName" value={data?.userName} onChange={inputHandle} />
                    </label>
                </Form.Item>

                <Form.Item name="street">
                    <label>
                        Street
                        <Input name="street" value={data?.street} onChange={inputHandle} />
                    </label>
                </Form.Item>

                <Form.Item name="buildingOrOffice" >
                    <label>
                        Building / Office Name
                        <Input name="buildingOrOffice" value={data?.buildingOrOffice} onChange={inputHandle} />
                    </label>
                </Form.Item>

                <Form.Item name="flatNumber" >
                    <label>
                        Flat No.
                        <Input name="flatNumber" value={data?.flatNumber} onChange={inputHandle} />
                    </label>
                </Form.Item>
                Emirates
                <Form.Item name="emirate" >
                    {/* Emirates */}
                    <Select onChange={(e) => inputHandle({ target: { name: 'emirate', value: e } })} value={data.emirate}>
                        {state?.map((item, idx) => (
                            <Select.Option key={idx} value={item?.id}>
                                {item?.emirateName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="contact" >
                    <label>
                        Contact No.
                        <Input type="number" name="emirate" value={data?.contactNo} onChange={inputHandle} />
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

export default EditAddress;
