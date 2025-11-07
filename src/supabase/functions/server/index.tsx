import { Hono } from "npm:hono";
import type { Context } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();
const ADMIN_EXPORT_TOKEN = Deno.env.get("EXPORT_ADMIN_TOKEN");

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const verifyAdmin = (c: Context) => {
  if (!ADMIN_EXPORT_TOKEN) {
    console.error("EXPORT_ADMIN_TOKEN environment variable is not configured.");
    return c.json({ error: "Server misconfiguration" }, 500);
  }

  const authHeader = c.req.header("authorization");
  if (!authHeader || authHeader !== `Bearer ${ADMIN_EXPORT_TOKEN}`) {
    console.warn("Unauthorized attempt to access admin export endpoint.");
    return c.json({ error: "Unauthorized" }, 401);
  }

  return null;
};

// Health check endpoint
app.get("/make-server-e359eb76/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit contact form
app.post("/make-server-e359eb76/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const timestamp = new Date().toISOString();
    const key = `contact:${timestamp}:${crypto.randomUUID()}`;

    await kv.set(key, {
      name,
      email,
      message,
      timestamp,
      type: 'contact'
    });

    console.log(`Contact form submission saved: ${key}`);
    return c.json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.error(`Error saving contact form: ${error}`);
    return c.json({ error: "Failed to submit contact form" }, 500);
  }
});

// Submit email signup
app.post("/make-server-e359eb76/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const timestamp = new Date().toISOString();
    const key = `signup:${timestamp}:${crypto.randomUUID()}`;

    await kv.set(key, {
      email,
      timestamp,
      type: 'signup'
    });

    console.log(`Email signup saved: ${key}`);
    return c.json({ success: true, message: "Email signup successful" });
  } catch (error) {
    console.error(`Error saving email signup: ${error}`);
    return c.json({ error: "Failed to save email signup" }, 500);
  }
});

// Get all contact forms as CSV
app.get("/make-server-e359eb76/export/contacts", async (c) => {
  const authResponse = verifyAdmin(c);
  if (authResponse) {
    return authResponse;
  }

  try {
    const contacts = await kv.getByPrefix("contact:");
    
    if (contacts.length === 0) {
      return c.text("No contact submissions found", 404);
    }

    // Create CSV header
    let csv = "Timestamp,Name,Email,Message\n";

    // Add each contact as a row
    contacts.forEach((contact) => {
      const { timestamp, name, email, message } = contact;
      // Escape quotes and wrap fields in quotes
      const escapedName = `"${(name || '').replace(/"/g, '""')}"`;
      const escapedEmail = `"${(email || '').replace(/"/g, '""')}"`;
      const escapedMessage = `"${(message || '').replace(/"/g, '""')}"`;
      csv += `${timestamp},${escapedName},${escapedEmail},${escapedMessage}\n`;
    });

    console.log(`Exported ${contacts.length} contact submissions`);
    return c.text(csv, 200, {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=contact-submissions.csv"
    });
  } catch (error) {
    console.error(`Error exporting contacts: ${error}`);
    return c.json({ error: "Failed to export contacts" }, 500);
  }
});

// Get all email signups as CSV
app.get("/make-server-e359eb76/export/signups", async (c) => {
  const authResponse = verifyAdmin(c);
  if (authResponse) {
    return authResponse;
  }

  try {
    const signups = await kv.getByPrefix("signup:");
    
    if (signups.length === 0) {
      return c.text("No email signups found", 404);
    }

    // Create CSV header
    let csv = "Timestamp,Email\n";

    // Add each signup as a row
    signups.forEach((signup) => {
      const { timestamp, email } = signup;
      const escapedEmail = `"${(email || '').replace(/"/g, '""')}"`;
      csv += `${timestamp},${escapedEmail}\n`;
    });

    console.log(`Exported ${signups.length} email signups`);
    return c.text(csv, 200, {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=email-signups.csv"
    });
  } catch (error) {
    console.error(`Error exporting signups: ${error}`);
    return c.json({ error: "Failed to export signups" }, 500);
  }
});

Deno.serve(app.fetch);
