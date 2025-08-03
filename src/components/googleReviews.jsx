'use client';

import React, { useState } from "react";
import { Card, Button, Rate, Row, Col, Typography, Avatar } from "antd";
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

  const displayedReviews = reviewsData.slice(0, page * reviewsPerPage);

  return (
    <div style={{ margin: "0 auto", padding: 20 }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 40 }}>
        WHY THOUSANDS TRUST ACTIVE FITNESS STORE?
      </Title>

      <Card
        style={{ marginBottom: 40 }}
        bodyStyle={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div style={{ fontWeight: "bold", fontSize: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <GoogleOutlined style={{ fontSize: 24, color: "#4285F4" }} />
          Google Reviews
          <span style={{ color: "#4285F4", fontSize: 28, marginLeft: 10 }}>4.4</span>
          <Rate disabled defaultValue={5} style={{ color: "#fadb14", fontSize: 18 }} />
          <span style={{ color: "#888", fontSize: 16 }}>(1,174)</span>
        </div>
        <Button type="primary" href="#" target="_blank">
          Review us on Google
        </Button>
      </Card>

      <Row gutter={[20, 20]}>
        {displayedReviews.map(({ name, date, rating, text }, idx) => (
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
              <Rate disabled defaultValue={rating} style={{ color: "#fadb14", fontSize: 14, marginBottom: 10 }} />
              <Text>{text}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      {page * reviewsPerPage < reviewsData.length && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}
    </div>
  );
}
