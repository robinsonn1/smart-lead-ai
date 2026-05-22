import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeLead = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);

      setResult({
        error: "Could not connect to backend",
      });
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          🚀 Smart Lead AI Dashboard
        </h1>

        <p style={{ marginBottom: "20px", color: "#555" }}>
          Analyze customer messages using AI lead qualification.
        </p>

        <textarea
          rows="6"
          placeholder="Enter customer message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={analyzeLead}
          disabled={loading}
          style={{
            backgroundColor: "#111827",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Lead"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h2>Analysis Result</h2>

            {result.error ? (
              <p style={{ color: "red" }}>{result.error}</p>
            ) : (
              <div>
                <p>
                  <strong>Intent:</strong> {result.intent}
                </p>

                <p>
                  <strong>Budget:</strong> {result.budget}
                </p>

                <p>
                  <strong>Urgency:</strong> {result.urgency}
                </p>

                <p>
                  <strong>Location:</strong> {result.location}
                </p>

                <p>
                  <strong>Lead Score:</strong> {result.score}/10
                </p>

                <p>
                  <strong>Recommended Action:</strong>{" "}
                  {result.recommended_action}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}