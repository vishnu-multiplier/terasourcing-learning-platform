
import { useNavigate } from "react-router-dom";

const CertifiedMembers = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "8px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const handleGetCertified = () => {
    navigate("/batches");           // make sure your Batches route = "/batches"
  };

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 600 }}>Certified Members</h2>

        <button onClick={handleGetCertified} style={buttonStyle}>
          <span style={{ fontSize: "16px" }}>🎓</span>
          Get Certified
        </button>
      </div>

      {/* Empty-state card */}
      <div
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        <span style={{ fontSize: "42px", marginBottom: "16px" }}>📖</span>
        <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>
          No certified members
        </p>
        <p style={{ maxWidth: "320px" }}>
          No certified members found. Please check again later or get certified
          yourself.
        </p>
      </div>
    </div>
  );
};

export default CertifiedMembers;
