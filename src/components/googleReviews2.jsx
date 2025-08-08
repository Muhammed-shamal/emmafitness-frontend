// 'use client'

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { GoogleOutlined } from "@ant-design/icons";
// import { Card, Button, Rate, Avatar, Typography, Row, Col } from "antd";
// const { Title, Text } = Typography;

// const reviewsData = [
//   { name: "DOMENO AS", date: "2 days ago", rating: 5, text: "I would like to personally thank Ms. Marina for solving my order delivery issues." },
//   { name: "Dinesh Ghale", date: "3 days ago", rating: 5, text: "I am very happy to which I am expecting on time delivery and high quality..." },
//   { name: "Omar Al Mutawa", date: "6 days ago", rating: 5, text: "Excellent work." },
//   { name: "hajar waheed", date: "6 days ago", rating: 5, text: "Best tights." },
//   { name: "elizabeth sonnen", date: "7 days ago", rating: 5, text: "Absolutely outstanding experience. Riyaz was excellent, providing..." },
//   { name: "sajeed syed", date: "8 days ago", rating: 5, text: "Good service, value for money equipment Having a great time with it." },
//   { name: "Rick L", date: "13 days ago", rating: 5, text: "Very professional and fast delivery and assembly. The equipment is top-notch." },
//   { name: "Sultan", date: "16 days ago", rating: 5, text: "Good customer service and fast delivery. Recommended." },
//   { name: "Omar Dawas", date: "17 days ago", rating: 5, text: "10 out of 10, what an exceptional service!" },
//   { name: "Mahmood Polo", date: "17 days ago", rating: 5, text: "Excellent." },
// ];

// const reviewsPerPage = 6;

// // Animation variants
// const cardVariants = {
//   offscreen: {
//     y: 50,
//     opacity: 0
//   },
//   onscreen: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       bounce: 0.4,
//       duration: 0.8
//     }
//   }
// };

// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// function getInitials(name) {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// export default function Reviews() {
//   const [page, setPage] = useState(1);
//   const displayedReviews = reviewsData.slice(0, page * reviewsPerPage);

//   return (
//     <motion.div 
//       initial="offscreen"
//       whileInView="onscreen"
//       viewport={{ once: true, margin: "-100px" }}
//       style={{ 
//         maxWidth: 1200, 
//         margin: "0 auto", 
//         padding: "40px 20px",
//         background: "linear-gradient(to bottom, #f9f9f9 0%, #ffffff 100%)"
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Title 
//           level={2} 
//           style={{ 
//             textAlign: "center", 
//             marginBottom: 40,
//             fontWeight: 600,
//             color: "#2c3e50",
//             position: "relative",
//             paddingBottom: 20
//           }}
//         >
//           WHY THOUSANDS TRUST ACTIVE FITNESS STORE?
//           <motion.div 
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: 80,
//               height: 4,
//               background: "#1890ff",
//               borderRadius: 2
//             }}
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           />
//         </Title>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         <Card
//           style={{ 
//             marginBottom: 60,
//             borderRadius: 12,
//             boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
//             border: "none"
//           }}
//           bodyStyle={{ 
//             display: "flex", 
//             justifyContent: "space-between", 
//             alignItems: "center",
//             padding: "20px 30px"
//           }}
//         >
//           <div style={{ 
//             fontWeight: 600, 
//             fontSize: 20, 
//             display: "flex", 
//             alignItems: "center", 
//             gap: 12,
//             color: "#2c3e50"
//           }}>
//             <GoogleOutlined style={{ fontSize: 28, color: "#4285F4" }} />
//             Google Reviews
//             <span style={{ 
//               color: "#4285F4", 
//               fontSize: 28, 
//               marginLeft: 10,
//               fontWeight: 700 
//             }}>4.4</span>
//             <Rate 
//               disabled 
//               defaultValue={5} 
//               style={{ 
//                 color: "#fadb14", 
//                 fontSize: 20,
//                 marginLeft: 8
//               }} 
//             />
//             <span style={{ 
//               color: "#7f8c8d", 
//               fontSize: 16,
//               marginLeft: 8
//             }}>(1,174 reviews)</span>
//           </div>
//           <Button 
//             type="primary" 
//             href="https://www.google.com/maps/place/Emma+Fitness+Gym+Equipments+Commercial+and+Home/@25.2844663,55.4440232,17z/data=!4m8!3m7!1s0x3ef5f58681ae533f:0x791a34995fa3d39e!8m2!3d25.2844663!4d55.4440232!9m1!1b1!16s%2Fg%2F11s4clhkf5?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D" 
//             target="_blank"
//             style={{
//               height: 48,
//               padding: "0 24px",
//               fontSize: 16,
//               fontWeight: 500,
//               borderRadius: 8,
//               boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)"
//             }}
//           >
//             Review us on Google
//           </Button>
//         </Card>
//       </motion.div>

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//       >
//         <Row gutter={[24, 24]}>
//           {displayedReviews.map(({ name, date, rating, text }, idx) => (
//             <Col xs={24} sm={12} lg={8} key={idx}>
//               <motion.div variants={cardVariants}>
//                 <Card
//                   hoverable
//                   style={{
//                     borderRadius: 12,
//                     overflow: "hidden",
//                     border: "none",
//                     boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
//                     height: "100%",
//                     transition: "transform 0.3s, box-shadow 0.3s"
//                   }}
//                   bodyStyle={{ padding: 24 }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
//                     <Avatar 
//                       style={{ 
//                         backgroundColor: "#1890ff", 
//                         marginRight: 12,
//                         width: 42,
//                         height: 42,
//                         fontSize: 16,
//                         fontWeight: 600
//                       }}
//                     >
//                       {getInitials(name)}
//                     </Avatar>
//                     <div style={{ flexGrow: 1 }}>
//                       <Text strong style={{ fontSize: 16, color: "#2c3e50" }}>{name}</Text>
//                       <Text type="secondary" style={{ display: "block", fontSize: 13 }}>
//                         {date}
//                       </Text>
//                     </div>
//                   </div>
//                   <Rate 
//                     disabled 
//                     defaultValue={rating} 
//                     style={{ 
//                       color: "#fadb14", 
//                       fontSize: 16, 
//                       marginBottom: 16 
//                     }} 
//                   />
//                   <Text style={{ 
//                     color: "#34495e", 
//                     lineHeight: 1.6,
//                     fontSize: 15
//                   }}>
//                     {text}
//                   </Text>
//                 </Card>
//               </motion.div>
//             </Col>
//           ))}
//         </Row>
//       </motion.div>

//       {page * reviewsPerPage < reviewsData.length && (
//         <motion.div 
//           style={{ textAlign: "center", marginTop: 60 }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <Button 
//             onClick={() => setPage(page + 1)}
//             type="primary"
//             ghost
//             style={{
//               height: 48,
//               padding: "0 32px",
//               fontSize: 16,
//               fontWeight: 500,
//               borderRadius: 8,
//               borderWidth: 2
//             }}
//           >
//             Load More Reviews
//           </Button>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }