'use client'
import { useState, useEffect } from 'react';
import { Button, Card, Empty, Modal, Spin } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CreateAddress from '../../../components/user/CreateAddress';
import EditAddress from '../../../components/user/EditAddress';
import DeleteAddress from '../../../components/user/DeleteAddress';
import { useDispatch, useSelector } from 'react-redux';
import fetchApi from '../../../utility/api/fetchApi';
import { showToast } from '../../../utility/redux/toastSlice';

function Page() {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [addressData, setAddressData] = useState([]);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const userId = userDetails?.userId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchApi({
          URI: `customers/address/getBy/${userId}`,
          API_TOKEN: userDetails?.token,
        });

        console.log("addres rsult",result)

        if (result) {
          const formatted = result.map((state) => ({
            userName: state?.userName,
            buildingOrOffice: state?.buildingOrOffice,
            street: state?.street,
            flatNumber: state?.flatNumber,
            isOffice: state?.isOffice,
            contactNo: state?.contactNo,
            emirate: state?.emirate?._id,
            id: state?._id,
          }));
          setAddressData(formatted);
        }
      } catch (error) {
        dispatch(showToast({ type: "error", message: error.message || "Failed to fetch address" }));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, popup, popupDelete, popupEdit, userDetails?.token, dispatch]);

  const handleEditClick = (item) => {
    setEditAddressId(item);
    setPopupEdit(true);
  };

  const handleDeleteClick = (addressId) => {
    setEditAddressId(addressId);
    setPopupDelete(true);
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Modals */}
      <Modal footer={false} open={popup} onCancel={() => setPopup(false)}>
        <CreateAddress close={() => setPopup(false)} />
      </Modal>

      <Modal footer={false} open={popupDelete} onCancel={() => setPopupDelete(false)}>
        <DeleteAddress close={() => setPopupDelete(false)} addressId={editAddressId} />
      </Modal>

      <Modal footer={false} open={popupEdit} onCancel={() => setPopupEdit(false)}>
        <EditAddress close={() => setPopupEdit(false)} Data={editAddressId} />
      </Modal>

      {/* Add Button */}
      <div className="flex flex-row justify-end">
        <Button onClick={() => setPopup(true)} type="primary" className="bg-blue-500">
          Add New
        </Button>
      </div>

      {/* Spinner while loading */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : addressData?.length === 0 ? (
        <Empty description="Currently no address." />
      ) : (
        addressData.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-row justify-between border-b border-gray-200 font-semibold">
              <div>{item?.userName}</div>
              <div className="text-green-500">{item?.isOffice ? "Office Address" : "Home Address"}</div>
            </div>
            <div className="flex flex-row gap-4 p-2 relative">
              <div className="mt-4">
                {item?.flatNumber && <p>Flat No: {item.flatNumber}</p>}
                {item?.buildingOrOffice && <p>Building: {item.buildingOrOffice}</p>}
                {item?.street && <p>Street: {item.street}</p>}
                {item?.emirate && <p>Emirate: {item.emirate} - United Arab Emirates</p>}
                {item?.contactNo && <p>Contact No: {item.contactNo}</p>}
                <div className="text-lg absolute right-0 bottom-0 flex">
                  <Button onClick={() => handleEditClick(item)} className="border-0">
                    <EditOutlined className="hover:text-secondary hover:cursor-pointer" />
                  </Button>
                  <Button onClick={() => handleDeleteClick(item.id)} className="border-0">
                    <DeleteOutlined className="hover:text-secondary hover:cursor-pointer" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default Page;

