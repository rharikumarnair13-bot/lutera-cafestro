import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/info", (req, res) => {
    res.json({
      name: "Lootera Cafestro",
      tagline: "Premium Dining Experience",
      address: "C13 Tower, Bargarh, Odisha 768028",
      phone: "94371 26324",
      timing: "9:00 AM - 11:00 PM"
    });
  });

  app.post("/api/book", (req, res) => {
    const { name, phone, date, guests } = req.body;
    console.log(`Booking received: ${name}, ${phone}, ${date}, ${guests} guests`);
    // In a real app, you'd save this to a database or send an email
    res.status(201).json({ message: "Booking request received! We will call you shortly to confirm." });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact message from ${name} (${email}): ${message}`);
    res.status(200).json({ message: "Message sent! Thank you for contacting Lootera Cafestro." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
