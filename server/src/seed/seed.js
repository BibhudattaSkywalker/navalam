import { CAUSE_STATUS, POST_STATUS, ROLES } from "../config/constants.js";
import { env } from "../config/env.js";
import { logger } from "../core/logger.js";
import { hashPassword } from "../core/security.js";
import { Cause } from "../modules/causes/cause.model.js";
import { Post } from "../modules/posts/post.model.js";
import { getSettings } from "../modules/settings/settings.service.js";
import { User } from "../modules/users/user.model.js";
import { sampleCauses, samplePosts } from "./data.js";

const DAY = 24 * 60 * 60 * 1000;

async function seedAdmin() {
  if (await User.estimatedDocumentCount() > 0) return false;
  await User.create({
    email: env.admin.email,
    name: "Nalvalam Admin",
    role: ROLES.SUPER_ADMIN,
    passwordHash: hashPassword(env.admin.password),
  });
  return true;
}

async function seedPosts() {
  if (await Post.estimatedDocumentCount() > 0) return 0;
  const now = Date.now();
  const posts = samplePosts.map((post, index) => ({
    ...post,
    content: `${post.excerpt}\n\nNalvalam Foundation organizes this work with local volunteers and partners. Gifts and time from the community keep the program going after a single visit.`,
    author: "Nalvalam Foundation",
    status: POST_STATUS.PUBLISHED,
    publishedAt: new Date(now - index * DAY),
    seoTitle: post.title,
    seoDescription: post.excerpt,
  }));
  await Post.insertMany(posts);
  return posts.length;
}

async function seedCauses() {
  if (await Cause.estimatedDocumentCount() > 0) return 0;
  const causes = sampleCauses.map((cause) => ({
    ...cause,
    description: `${cause.summary}\n\nThe goal covers supplies, local coordination, and follow-up with the families in the program. Progress updates as confirmed gifts are recorded.`,
    gallery: [],
    status: CAUSE_STATUS.ACTIVE,
  }));
  await Cause.insertMany(causes);
  return causes.length;
}

/** Idempotent: every step only fills in what is missing, so it is safe on every boot. */
export async function seedDatabase() {
  const [admin, posts, causes] = [await seedAdmin(), await seedPosts(), await seedCauses()];
  await getSettings();
  if (admin) logger.info(`Created the first admin account (${env.admin.email})`);
  if (posts || causes) logger.info(`Seeded ${posts} posts and ${causes} causes`);
}
