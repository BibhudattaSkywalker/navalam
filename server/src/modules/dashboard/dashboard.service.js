import { CAUSE_STATUS, DONATION_STATUS, LEAD_STATUS, POST_STATUS } from "../../config/constants.js";
import { Cause } from "../causes/cause.model.js";
import { Donation } from "../donations/donation.model.js";
import { Lead } from "../leads/lead.model.js";
import { Post } from "../posts/post.model.js";

const CHART_MONTHS = 6;
const RECENT_ITEMS = 5;

const causeLink = (cause) => (cause?.title ? { title: cause.title, slug: cause.slug } : null);

function chartStart() {
  const start = new Date();
  start.setMonth(start.getMonth() - CHART_MONTHS);
  start.setDate(1);
  return start;
}

/** Everything the admin dashboard needs in one round of parallel queries. */
export async function getDashboard() {
  const successful = { status: DONATION_STATUS.SUCCESSFUL };

  const [
    posts, published, leads, newLeads, causes, giftTotals, activeCauses,
    recentLeads, recentDonations, leadSources, chartDonations, causeProgress,
  ] = await Promise.all([
    Post.countDocuments(),
    Post.countDocuments({ status: POST_STATUS.PUBLISHED }),
    Lead.countDocuments(),
    Lead.countDocuments({ status: LEAD_STATUS.NEW }),
    Cause.countDocuments(),
    Donation.aggregate([{ $match: successful }, { $group: { _id: null, count: { $sum: 1 }, total: { $sum: "$amount" } } }]),
    Cause.countDocuments({ status: CAUSE_STATUS.ACTIVE }),
    Lead.find().sort({ createdAt: -1 }).limit(RECENT_ITEMS),
    Donation.find().sort({ createdAt: -1 }).limit(RECENT_ITEMS).populate("causeId"),
    Lead.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Donation.find({ ...successful, createdAt: { $gte: chartStart() } }, { amount: 1, status: 1, createdAt: 1 }),
    Cause.find({ status: { $ne: CAUSE_STATUS.ARCHIVED } }).sort({ createdAt: 1 }).limit(RECENT_ITEMS),
  ]);

  const { count = 0, total = 0 } = giftTotals[0] ?? {};
  return {
    summary: { posts, published, leads, newLeads, causes, donations: count, raised: total },
    recentLeads,
    activeCauses,
    leadSources: leadSources.map((row) => [row._id, row.count]),
    chartDonations: chartDonations.map(({ amount, status, createdAt }) => ({ amount, status, createdAt })),
    causeProgress,
    recentDonations: recentDonations.map((donation) => ({ ...donation.toJSON(), cause: causeLink(donation.causeId) })),
  };
}
