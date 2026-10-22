export const ROLES = Object.freeze({
  SUPER_ADMIN: "super_admin",
  CONTENT_MANAGER: "content_manager",
});

export const POST_STATUS = Object.freeze({
  DRAFT: "draft",
  PUBLISHED: "published",
  SCHEDULED: "scheduled",
});

export const CAUSE_STATUS = Object.freeze({
  ACTIVE: "active",
  PAUSED: "paused",
  COMPLETED: "completed",
  ARCHIVED: "archived",
});

export const LEAD_STATUS = Object.freeze({
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  CLOSED: "closed",
});

export const DONATION_STATUS = Object.freeze({
  PENDING: "pending",
  SUCCESSFUL: "successful",
  FAILED: "failed",
  REFUNDED: "refunded",
});

export const DONATION_TYPE = Object.freeze({
  ONE_TIME: "one-time",
  MONTHLY: "monthly",
});

export const SESSION = Object.freeze({
  COOKIE: "nvf_session",
  TTL_MS: 7 * 24 * 60 * 60 * 1000,
});

export const LIMITS = Object.freeze({
  BODY: "1mb",
  MIN_PASSWORD: 8,
  MAX_DONATION: 10_000_000,
  MAX_GALLERY_IMAGES: 8,
  UPLOAD_BYTES: 5 * 1024 * 1024,
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
});

export const IMAGE_EXTENSIONS = Object.freeze([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export const values = (map) => Object.values(map);
