import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

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

// Track page visit
app.post("/make-server-e359eb76/track/visit", async (c) => {
  try {
    const body = await c.req.json();
    const { page, referrer, userAgent } = body;

    const timestamp = new Date().toISOString();
    const key = `visit:${timestamp}:${crypto.randomUUID()}`;

    await kv.set(key, {
      page: page || '/',
      referrer: referrer || 'direct',
      userAgent: userAgent || 'unknown',
      timestamp,
      type: 'visit'
    });

    console.log(`Page visit tracked: ${key}`);
    return c.json({ success: true });
  } catch (error) {
    console.error(`Error tracking visit: ${error}`);
    return c.json({ error: "Failed to track visit" }, 500);
  }
});

// Get site visit statistics
app.get("/make-server-e359eb76/stats/visits", async (c) => {
  try {
    const visits = await kv.getByPrefix("visit:");

    if (visits.length === 0) {
      return c.json({
        totalVisits: 0,
        todayVisits: 0,
        thisWeekVisits: 0,
        thisMonthVisits: 0,
        pageViews: {},
        topReferrers: {}
      });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let todayVisits = 0;
    let thisWeekVisits = 0;
    let thisMonthVisits = 0;
    const pageViews: Record<string, number> = {};
    const referrers: Record<string, number> = {};

    visits.forEach((visit) => {
      const visitDate = new Date(visit.timestamp);

      // Count visits by time period
      if (visitDate >= today) todayVisits++;
      if (visitDate >= weekAgo) thisWeekVisits++;
      if (visitDate >= monthAgo) thisMonthVisits++;

      // Count page views
      const page = visit.page || '/';
      pageViews[page] = (pageViews[page] || 0) + 1;

      // Count referrers
      const referrer = visit.referrer || 'direct';
      referrers[referrer] = (referrers[referrer] || 0) + 1;
    });

    // Sort and get top referrers
    const sortedReferrers = Object.entries(referrers)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    console.log(`Returning stats for ${visits.length} total visits`);
    return c.json({
      totalVisits: visits.length,
      todayVisits,
      thisWeekVisits,
      thisMonthVisits,
      pageViews,
      topReferrers: sortedReferrers
    });
  } catch (error) {
    console.error(`Error getting visit stats: ${error}`);
    return c.json({ error: "Failed to get visit statistics" }, 500);
  }
});

// Export all visits as CSV
app.get("/make-server-e359eb76/export/visits", async (c) => {
  try {
    const visits = await kv.getByPrefix("visit:");

    if (visits.length === 0) {
      return c.text("No visits found", 404);
    }

    // Create CSV header
    let csv = "Timestamp,Page,Referrer,UserAgent\n";

    // Add each visit as a row
    visits.forEach((visit) => {
      const { timestamp, page, referrer, userAgent } = visit;
      const escapedPage = `"${(page || '/').replace(/"/g, '""')}"`;
      const escapedReferrer = `"${(referrer || 'direct').replace(/"/g, '""')}"`;
      const escapedUserAgent = `"${(userAgent || 'unknown').replace(/"/g, '""')}"`;
      csv += `${timestamp},${escapedPage},${escapedReferrer},${escapedUserAgent}\n`;
    });

    console.log(`Exported ${visits.length} visits`);
    return c.text(csv, 200, {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=site-visits.csv"
    });
  } catch (error) {
    console.error(`Error exporting visits: ${error}`);
    return c.json({ error: "Failed to export visits" }, 500);
  }
});

Deno.serve(app.fetch);
