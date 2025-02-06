import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        // 400 = user already exists apod.
        const errorData = await res.json();
        alert(errorData.message || "Something went wrong.");
        return;
      }

      // Úspěšná registrace
      alert("Registration successful! You can now sign in.");

      // Přesměrovat na přihlášení
      router.push("/auth/signin");
    } catch (error) {
      console.error(error);
      alert("Failed to register user.");
    }
  }

  return (
    <div style={{ maxWidth: 300, margin: "20px auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="user@example.com"
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Register
        </button>
      </form>
    </div>
  );
}
