const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { FieldValue, getFirestore } = require("firebase-admin/firestore");

const PROJECT_ID = "workside-4b103";
const COLLECTION = "workside_leads";
const MAX_BODY_BYTES = 12 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const attemptsByAddress = new Map();
const PROJECT_TYPES = new Set([
  "web-application",
  "mobile-app",
  "ai-automation",
  "business-intelligence",
  "saas-product",
  "seo-growth",
  "other",
]);

function response(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function initializeFirestore() {
  let app = getApps()[0];
  if (!app) {
    if (process.env.FIRESTORE_EMULATOR_HOST) {
      app = initializeApp({ projectId: PROJECT_ID });
    } else {
      const serviceAccountValue = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      if (!serviceAccountValue) {
        const error = new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not configured");
        error.code = "CONFIG_MISSING";
        throw error;
      }

      let serviceAccount;
      try {
        serviceAccount = JSON.parse(serviceAccountValue);
      } catch {
        const error = new Error("Firebase Admin credential is not valid JSON");
        error.code = "CONFIG_INVALID";
        throw error;
      }
      if (serviceAccount.project_id !== PROJECT_ID) {
        const error = new Error("Firebase Admin credential does not match the approved project");
        error.code = "CONFIG_INVALID";
        throw error;
      }

      app = initializeApp({
        credential: cert(serviceAccount),
        projectId: PROJECT_ID,
      });
    }
  }
  return getFirestore(app);
}

function allowedOrigin(origin) {
  if (!origin) return true;
  const accepted = new Set([
    "https://worksidesoftware.com",
    "https://www.worksidesoftware.com",
  ]);
  if (process.env.NODE_ENV !== "production") {
    accepted.add("http://localhost:3000");
    accepted.add("http://127.0.0.1:3000");
  }
  return accepted.has(origin);
}

function getClientAddress(headers = {}) {
  const normalized = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])
  );
  const forwarded = normalized["x-nf-client-connection-ip"] || normalized["x-forwarded-for"] || "unknown";
  return String(forwarded).split(",")[0].trim().slice(0, 100) || "unknown";
}

function checkRateLimit(address, now = Date.now()) {
  const recent = (attemptsByAddress.get(address) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    attemptsByAddress.set(address, recent);
    return false;
  }
  recent.push(now);
  attemptsByAddress.set(address, recent);
  if (attemptsByAddress.size > 10000) {
    for (const [key, timestamps] of attemptsByAddress) {
      if (!timestamps.some((time) => now - time < RATE_WINDOW_MS)) attemptsByAddress.delete(key);
    }
  }
  return true;
}

function boundedString(value, maxLength, { required = false, pattern } = {}) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if ((!normalized && required) || normalized.length > maxLength) return null;
  if (pattern && normalized && !pattern.test(normalized)) return null;
  return normalized;
}

function parseAttribution(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const attribution = {};
  const pagePath = boundedString(value.pagePath, 200, { pattern: /^\/(?!\/)[\w./-]*$/ });
  if (pagePath) attribution.pagePath = pagePath;
  for (const key of ["utmSource", "utmMedium", "utmCampaign"]) {
    const item = boundedString(value[key], 100);
    if (item) attribution[key] = item;
  }
  attribution.source = "website_contact_form";
  return attribution;
}

function parseBody(event) {
  if (!event.body || typeof event.body !== "string") return { error: "A JSON request body is required." };
  let raw;
  try {
    raw = event.isBase64Encoded ? Buffer.from(event.body, "base64") : Buffer.from(event.body, "utf8");
  } catch {
    return { error: "The request body could not be read." };
  }
  if (raw.byteLength > MAX_BODY_BYTES) return { error: "The request is too large." };
  try {
    const value = JSON.parse(raw.toString("utf8"));
    if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "A JSON object is required." };
    return { value };
  } catch {
    return { error: "The request body must be valid JSON." };
  }
}

function validate(value) {
  if (typeof value.website === "string" && value.website.trim()) return { spam: true };
  const name = boundedString(value.name, 100, { required: true });
  const email = boundedString(value.email, 254, { required: true });
  const company = boundedString(value.company, 120);
  const phone = boundedString(value.phone, 40, { pattern: /^[+()0-9.\-\s]*$/ });
  const projectType = boundedString(value.projectType, 40, { required: true });
  const message = boundedString(value.message, 4000, { required: true });
  const preferredContactMethod = boundedString(value.preferredContactMethod, 10, { required: true });
  const submissionId = boundedString(value.submissionId, 36, {
    required: true,
    pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  });

  if (!name) return { error: "Enter a name up to 100 characters." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (value.company != null && value.company !== "" && !company) return { error: "Company must be 120 characters or fewer." };
  if (value.phone != null && value.phone !== "" && !phone) return { error: "Enter a valid phone number." };
  if (!PROJECT_TYPES.has(projectType)) return { error: "Choose a project type from the list." };
  if (!message) return { error: "Describe what you would like to build or improve (up to 4,000 characters)." };
  if (!["email", "phone", "either"].includes(preferredContactMethod)) return { error: "Choose a preferred contact method." };
  if (["phone", "either"].includes(preferredContactMethod) && !phone) return { error: "Add a phone number for your preferred contact method." };
  if (!submissionId) return { error: "Refresh the page and try again." };

  return {
    data: {
      name,
      email: email.toLowerCase(),
      ...(company ? { company } : {}),
      ...(phone ? { phone } : {}),
      projectType,
      message,
      preferredContactMethod,
      submissionId,
      attribution: parseAttribution(value.attribution),
    },
  };
}

function emailProviderConfig() {
  const requestedProvider = (process.env.WORKSIDE_EMAIL_PROVIDER || "").trim().toLowerCase();
  const hasResendConfig = Boolean(process.env.RESEND_API_KEY || process.env.RESEND_FROM_EMAIL);
  const hasSendGridConfig = Boolean(process.env.SENDGRID_API_KEY || process.env.SENDGRID_FROM_EMAIL);
  const provider = requestedProvider || (hasResendConfig !== hasSendGridConfig ? (hasResendConfig ? "resend" : "sendgrid") : "");
  if (!new Set(["resend", "sendgrid"]).has(provider)) return null;

  const providerPrefix = provider === "resend" ? "RESEND" : "SENDGRID";
  const apiKey = process.env.WORKSIDE_EMAIL_API_KEY || process.env[`${providerPrefix}_API_KEY`];
  const from = process.env.WORKSIDE_EMAIL_FROM || process.env[`${providerPrefix}_FROM_EMAIL`];
  if (!apiKey || !from || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) return null;
  return { provider, apiKey, from };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function notificationContent(lead, leadId, submittedAt) {
  const projectTypes = {
    "web-application": "Custom web application",
    "mobile-app": "iOS or Android app",
    "ai-automation": "AI or business automation",
    "business-intelligence": "Business intelligence and analytics",
    "saas-product": "SaaS product",
    "seo-growth": "SEO and digital growth",
    other: "Something else",
  };
  const timestamp = submittedAt instanceof Date && Number.isFinite(submittedAt.getTime())
    ? submittedAt.toISOString()
    : new Date().toISOString();
  const fields = [
    ["Contact name", lead.name],
    ["Email", lead.email],
    ...(lead.company ? [["Company", lead.company]] : []),
    ...(lead.phone ? [["Phone", lead.phone]] : []),
    ["Project type", projectTypes[lead.projectType] || lead.projectType],
    ["Project description", lead.message],
    ["Submission timestamp (UTC)", timestamp],
    ["Firestore lead ID", leadId],
  ];
  const text = ["New Workside Software Project Inquiry", "", ...fields.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const rows = fields.map(([label, value]) => (
    `<tr><th align="left" valign="top" style="padding:8px 12px 8px 0;color:#53635a">${escapeHtml(label)}</th>` +
    `<td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
  )).join("");
  const html = `<!doctype html><html><body style="margin:0;background:#f4f6f3;font:15px/1.5 Arial,sans-serif;color:#173128"><main style="max-width:680px;margin:24px auto;padding:28px;background:#fff;border:1px solid #e1e7e1"><p style="margin:0 0 8px;color:#6b7a70;font-size:12px;letter-spacing:.08em;text-transform:uppercase">Workside Software</p><h1 style="margin:0 0 22px;font-size:24px;font-weight:600">New Workside Software Project Inquiry</h1><table style="width:100%;border-collapse:collapse">${rows}</table></main></body></html>`;
  return { text, html };
}

async function sendLeadNotification(lead, leadId, submittedAt) {
  const config = emailProviderConfig();
  if (!config) {
    console.error("[contact-lead] Email notification not sent: provider configuration missing or ambiguous");
    return;
  }

  const content = notificationContent(lead, leadId, submittedAt);
  const subject = "New Workside Software Project Inquiry";
  let url;
  let payload;
  if (config.provider === "resend") {
    url = "https://api.resend.com/emails";
    payload = {
      from: `Workside Software <${config.from}>`,
      to: ["contact@worksidesoftware.com"],
      subject,
      ...content,
    };
  } else {
    url = "https://api.sendgrid.com/v3/mail/send";
    payload = {
      personalizations: [{ to: [{ email: "contact@worksidesoftware.com" }] }],
      from: { email: config.from, name: "Workside Software" },
      subject,
      content: [
        { type: "text/plain", value: content.text },
        { type: "text/html", value: content.html },
      ],
    };
  }

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!result.ok) {
      console.error("[contact-lead] Email notification provider rejected the message", {
        provider: config.provider,
        status: result.status,
      });
    }
  } catch (error) {
    console.error("[contact-lead] Email notification request failed", {
      provider: config.provider,
      reason: error.name === "TimeoutError" ? "timeout" : "network_error",
    });
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return response(405, { error: "Method not allowed." }, { Allow: "POST" });
  }

  const headers = event.headers || {};
  const normalizedHeaders = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])
  );
  const origin = normalizedHeaders.origin;
  if (!allowedOrigin(origin)) return response(403, { error: "This request is not allowed." });
  if (!String(normalizedHeaders["content-type"] || "").toLowerCase().startsWith("application/json")) {
    return response(415, { error: "Send the form as JSON." });
  }

  const parsed = parseBody(event);
  if (parsed.error) return response(400, { error: parsed.error });
  const validated = validate(parsed.value);
  if (validated.spam) return response(202, { ok: true });
  if (validated.error) return response(400, { error: validated.error });

  try {
    const db = initializeFirestore();
    const leadRef = db.collection(COLLECTION).doc(validated.data.submissionId);
    const existing = await leadRef.get();
    if (existing.exists) return response(200, { ok: true, duplicate: true });

    const address = getClientAddress(headers);
    if (!checkRateLimit(address)) {
      return response(429, { error: "Too many inquiries from this connection. Please try again later." }, { "Retry-After": "600" });
    }

    const { submissionId, attribution, ...lead } = validated.data;
    await leadRef.create({
      ...lead,
      attribution,
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    });

    try {
      const savedLead = await leadRef.get();
      const savedData = savedLead.data();
      await sendLeadNotification(lead, leadRef.id, savedData?.createdAt?.toDate?.());
    } catch (error) {
      console.error("[contact-lead] Email notification preparation failed", typeof error.code === "string" || typeof error.code === "number" ? error.code : "unknown");
    }
    return response(201, { ok: true });
  } catch (error) {
    if (error.code === 6 || error.code === "already-exists") return response(200, { ok: true, duplicate: true });
    if (error.code === "CONFIG_MISSING" || error.code === "CONFIG_INVALID") {
      console.error("[contact-lead] Firebase Admin server configuration is missing or invalid", error.code);
      return response(503, { error: "The inquiry form is temporarily unavailable. Please email contact@worksidesoftware.com." });
    }
    console.error("[contact-lead] Firestore write failed", typeof error.code === "string" || typeof error.code === "number" ? error.code : "unknown");
    return response(503, { error: "We could not save your inquiry. Please try again or email contact@worksidesoftware.com." });
  }
};

