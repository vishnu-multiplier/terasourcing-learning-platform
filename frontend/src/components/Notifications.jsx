import React, { useState } from "react";

const Notifications = () => {
  const [selectedTab, setSelectedTab] = useState("unread");

  const tabStyle = (tab) => ({
    padding: "6px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    backgroundColor: selectedTab === tab ? "#f3f4f6" : "#fff",
    fontWeight: selectedTab === tab ? "600" : "400",
    color: "#111827",
    cursor: "pointer",
    marginLeft: tab === "read" ? "8px" : "0",
    outline: "none",
  });

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      {/* Header + Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: 600 }}>Notifications</h2>
        <div>
          <button
            style={tabStyle("unread")}
            onClick={() => setSelectedTab("unread")}
          >
            Unread
          </button>
          <button
            style={tabStyle("read")}
            onClick={() => setSelectedTab("read")}
          >
            Read
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div
        style={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#6b7280",
          fontSize: "16px",
        }}
      >
        Nothing to see here.
      </div>
    </div>
  );
};

export default Notifications;
