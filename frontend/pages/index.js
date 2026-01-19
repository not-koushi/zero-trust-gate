import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState("");

  async function login() {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "koushi",
        role: "user"
      })
    });

    const data = await res.json();
    setToken(data.access_token);
  }

  async function callProtected() {
    const res = await fetch("http://127.0.0.1:3000/protected", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ZeroTrustGate – Frontend Demo</h1>

      <button onClick={login}>Login (Get Token)</button>

      <p style={{ wordBreak: "break-all" }}>
        <strong>Token:</strong> {token || "Not logged in"}
      </p>

      <button onClick={callProtected} disabled={!token}>
        Call Protected API
      </button>

      <pre>{result}</pre>
    </main>
  );
}