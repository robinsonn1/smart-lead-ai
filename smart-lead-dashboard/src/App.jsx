import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeLead = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Backend connection failed" });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Smart Lead AI 🚀</h1>

      <textarea
        rows="5"
        style={{ width: "100%", marginTop: 10 }}
        placeholder="Enter lead message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={analyzeLead}
        style={{ marginTop: 10, padding: 10 }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}