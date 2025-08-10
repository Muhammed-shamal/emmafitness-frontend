'use client';

import React, { useEffect, useState } from "react";
import { Card, Button, Rate, Row, Col, Typography, Avatar, Skeleton } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const reviewsData = [
  { name: "DOMENO AS", date: "2 days ago", rating: 5, text: "I would like to personally thank Ms. Marina for solving my order delivery issues." },
  { name: "Dinesh Ghale", date: "3 days ago", rating: 5, text: "I am very happy to which I am expecting on time delivery and high quality..." },
  { name: "Omar Al Mutawa", date: "6 days ago", rating: 5, text: "Excellent work." },
  { name: "hajar waheed", date: "6 days ago", rating: 5, text: "Best tights." },
  { name: "elizabeth sonnen", date: "7 days ago", rating: 5, text: "Absolutely outstanding experience. Riyaz was excellent, providing..." },
  { name: "sajeed syed", date: "8 days ago", rating: 5, text: "Good service, value for money equipment Having a great time with it." },
  { name: "Rick L", date: "13 days ago", rating: 5, text: "Very professional and fast delivery and assembly. The equipment is top-notch." },
  { name: "Sultan", date: "16 days ago", rating: 5, text: "Good customer service and fast delivery. Recommended." },
  { name: "Omar Dawas", date: "17 days ago", rating: 5, text: "10 out of 10, what an exceptional service!" },
  { name: "Mahmood Polo", date: "17 days ago", rating: 5, text: "Excellent." },
];

const reviewsPerPage = 5;

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Reviews() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const displayedReviews = reviewsData.slice(0, page * reviewsPerPage);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 1000); // 1-second loading
    return () => clearTimeout(timeout);
  }, [page]);

  return (
    <div style={{ margin: "0 auto", padding: 20 }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 40 }}>
        WHY THOUSANDS TRUST ACTIVE FITNESS STORE?
      </Title>

      <Card
        style={{ marginBottom: 40 }}
        bodyStyle={{
          display: "flex",
          flexWrap: "wrap", // allow wrapping on small screens
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: 20,
            display: "flex",
            flexWrap: "wrap", // wrap elements inside
            alignItems: "center",
            gap: 12,
            flex: 1, // take up full width if needed
            minWidth: 250, // prevent squishing
          }}
        >
          <GoogleOutlined style={{ fontSize: 24, color: "#4285F4" }} />
          Google Reviews
          <span style={{ color: "#4285F4", fontSize: 28, marginLeft: 10 }}>4.4</span>
          <Rate disabled defaultValue={5} style={{ color: "#fadb14", fontSize: 18 }} />
          <span style={{ color: "#888", fontSize: 16 }}>(1,174)</span>
        </div>
        <div style={{ minWidth: 200, textAlign: "right" }}>
          <Button
            type="primary"
            href="https://www.google.com/maps/place/Emma+Fitness+Gym+Equipments+Commercial+and+Home/@25.2844663,55.4440232,17z/data=!4m8!3m7!1s0x3ef5f58681ae533f:0x791a34995fa3d39e!8m2!3d25.2844663!4d55.4440232!9m1!1b1!16s%2Fg%2F11s4clhkf5?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            style={{ width: "100%", maxWidth: 220 }}
          >
            Review us on Google
          </Button>
        </div>
      </Card>


      <Row gutter={[20, 20]}>
        {isLoading
          ? Array.from({ length: reviewsPerPage }).map((_, idx) => (
            <Col xs={24} sm={12} md={8} key={`skeleton-${idx}`}>
              <Card>
                <Skeleton avatar paragraph={{ rows: 3 }} active />
              </Card>
            </Col>
          ))
          : displayedReviews.map(({ name, date, rating, text }, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                  <Avatar style={{ backgroundColor: "#1890ff", marginRight: 10 }}>
                    {getInitials(name)}
                  </Avatar>
                  <div style={{ flexGrow: 1 }}>
                    <Text strong>{name}</Text> <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {date}
                    </Text>
                  </div>
                </div>
                <Rate
                  disabled
                  defaultValue={rating}
                  style={{ color: "#fadb14", fontSize: 14, marginBottom: 10 }}
                />
                <Text>{text}</Text>
              </Card>
            </Col>
          ))}
      </Row>

      {!isLoading && page * reviewsPerPage < reviewsData.length && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}
    </div>
  );
}
