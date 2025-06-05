import { Button } from "antd";
import { useState } from "react";
import deleteApi from "../../utility/api/deleteApi";
import { useSelector } from "react-redux";

function DeleteAddress({ addressId, close }) {
    const [result, setResult] = useState({
        loading: false, err: false, msg: ""
    });

    const user = useSelector(state=>state.user)

    async function formHandle() {
        try {
            const result = await deleteApi({ URI: `addresses/${addressId}`, token: user.token});
            setResult({ err: false, msg: "Successfully deleted", loading: false });
            close && close()
        } catch (error) {
            setResult({ err: true, msg: "Unable to delete address", loading: false });
            console.error('Error while deleting address:', error);
        }
    };



    return (
        <div className="flex flex-col justify-center text-center">
            <p className="py-5">Are you sure to delete this address?</p>
            <p className={`${result.err ? "text-red-500" : "text-green-500"} text-center`}>{result.msg}</p>
            <div className="text-center">
            <Button onClick={formHandle} type="primary" className="bg-red-500 w-1/4" loading={result.loading}>
                Delete
            </Button>
            </div>   
        </div>
    );
}

export default DeleteAddress;
