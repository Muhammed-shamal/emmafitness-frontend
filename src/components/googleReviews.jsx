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
    <div style={{ margin: "0 auto", padding: "20px 16px", maxWidth: 1280 }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 40, fontSize: "clamp(18px, 2.5vw, 24px)" }}>
        WHY THOUSANDS TRUST EMMA FITNESS?
      </Title>

      {/* Google Review Summary */}
      <Card
        style={{ marginBottom: 40 }}
        bodyStyle={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          padding: 16,
        }}
      >
        {/* Left: Rating Info */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "clamp(16px, 2vw, 18px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
            flex: "1 1 240px",
          }}
        >
          <GoogleOutlined style={{ fontSize: 24, color: "#4285F4" }} />
          <span>Google Reviews</span>
          <span style={{ color: "#4285F4", fontSize: 26 }}>4.4</span>
          <Rate
            disabled
            defaultValue={5}
            style={{
              color: "#fadb14",
              fontSize: "clamp(14px, 1.5vw, 16px)"
            }}
          />
          <span style={{ color: "#888", fontSize: 14 }}>(1,174)</span>
        </div>

        {/* Right: Button */}
        <div
          style={{
            flex: "0 0 auto",
            width: "100%",
            textAlign: "center",
            minWidth: 200,
            maxWidth: 220,
            margin: "0 auto",
          }}
        >
          <Button
            type="primary"
            href="https://www.google.com/maps/place/Emma+Fitness+Gym+Equipments+Commercial+and+Home/@25.2844663,55.4440232,17z"
            target="_blank"
            style={{ width: "100%" }}
          >
            Review us on Google
          </Button>
        </div>
      </Card>

      {/* Reviews Grid */}
      <Row gutter={[16, 16]}>
        {isLoading
          ? Array.from({ length: reviewsPerPage }).map((_, idx) => (
            <Col xs={24} sm={12} lg={8} key={`skeleton-${idx}`}>
              <Card style={{ height: "100%" }}>
                <Skeleton avatar paragraph={{ rows: 3 }} active />
              </Card>
            </Col>
          ))
          : displayedReviews.map(({ name, date, rating, text }, idx) => (
            <Col xs={24} sm={12} lg={8} key={idx}>
              <Card style={{ height: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 12,
                    gap: 12,
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "#1890ff",
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(name)}
                  </Avatar>
                  <div>
                    <Text strong style={{ display: "block" }}>{name}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {date}
                    </Text>
                  </div>
                </div>
                <Rate
                  disabled
                  defaultValue={rating}
                  style={{
                    color: "#fadb14",
                    fontSize: 14,
                    marginBottom: 12
                  }}
                />
                <Text style={{ wordBreak: "break-word" }}>{text}</Text>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Load More Button */}
      {!isLoading && page * reviewsPerPage < reviewsData.length && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}
    </div>
  );
}
