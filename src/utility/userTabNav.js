import { HeartOutlined, HistoryOutlined, HomeOutlined, RetweetOutlined, UserSwitchOutlined } from "@ant-design/icons";

export  const userNavTab = [
    {url: '/user/order', label: "Order History", icon: <HistoryOutlined />},
    {url: '/user/address', label: "Address", icon: <HomeOutlined  />},
    {url: '/user/service', label: "Service Requests", icon: <RetweetOutlined  />},
    {url: '/user/wishlist', label: "Wishlist", icon: <HeartOutlined />},
    {url: '/user/profile', label: "Profile", icon: <UserSwitchOutlined  />},
  ]