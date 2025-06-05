'use client'
import { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CreateAddress from '../../../components/user/CreateAddress';
import EditAddress from '../../../components/user/EditAddress';
import DeleteAddress from '../../../components/user/DeleteAddress';
import { useSelector } from 'react-redux';
import fetchApi from '../../../utility/api/fetchApi';

function Page() {
  const [popup, setPopup] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const userDetails = useSelector((state) => state.user);
  const userId = userDetails?.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi({
          URI: `addresses?populate=emirate&filters[user]=${userId}`, API_TOKEN: userDetails?.token
        });
        if (result) {
          setAddressData(
            result?.data?.map((state) => ({
              fullName: state?.attributes?.fullName,
              buildingOrOffice: state?.attributes?.buildingOrOffice,
              street: state?.attributes?.street,
              flatNumber: state?.attributes?.flatNumber,
              isOffice: state?.attributes?.isOffice,
              contactNo: state?.attributes?.contactNo,
              emirate: state?.attributes?.emirate?.data?.id,
              id: state?.id,
            }))
          );
        } else {
          console.error('API request error');
        }
      } catch (error) {
        console.error('Error during API request:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, popup,popupDelete, popupEdit, userDetails?.token]);

  const handleEditClick = (addressId) => {
    setEditAddressId(addressId);
    setPopupEdit(true);
  };

  const handleDeleteClick = (addressId) => {
    setEditAddressId(addressId);
    setPopupDelete(true);
  };

  return (
    <div className="space-y-4">
      {<Modal footer={false} open={popup} onCancel={() => setPopup(false)}>
        <CreateAddress close={()=>setPopup(false)} />
      </Modal>}
      {<Modal footer={false} open={popupDelete} onCancel={() => setPopupDelete(false)}>
        <DeleteAddress close={()=>setPopupDelete(false)} addressId={editAddressId} />
      </Modal>}
      {popupEdit && <Modal footer={false} open={popupEdit} onCancel={() => setPopupEdit(false)}>
        <EditAddress close={()=>setPopupEdit(false)} Data={editAddressId} />
      </Modal>}
      <div className="flex flex-row justify-end">
        <Button onClick={() => setPopup(!popup)} type="primary" className="bg-blue-500">
          Add New
        </Button>
      </div>
      {addressData?.map((item, idx) => (
        <Card key={idx}>
          <div className="flex flex-row justify-between border-b border-gray-200 font-semibold">
            <div>{item?.fullName}</div>
            <div className="text-green-500"> {item?.isOffice ? "Offce" : "Home"}</div>
          </div>
          <div className="flex flex-row gap-4 p-2 relative">
            <div className="mt-4">
              <p>{item?.flatNumber&&`Flat No: ${item?.flatNumber}`}</p>
              <p>{item?.buildingOrOffice && `Building: ${item?.buildingOrOffice}`}</p>
              <p>{item?.street && `Street: ${item?.street}`}</p>
              <p>
                {item?.emirate && `Emirate: ${item?.emirate}`} - United Arab Emirates
              </p>
              <p>Contact : {item?.contact && `Contact No: ${item?.contact}`}</p>
              <div className="text-lg absolute right-0 bottom-0 flex ">
                {/* Pass the address ID to the handleEditClick function */}
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
      ))}
    </div>
  );
}

export default Page;
