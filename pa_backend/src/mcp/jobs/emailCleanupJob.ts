import cron from "node-cron";
import EmailModel from "../../models/Email.js";

/**
 * Delete emails older than 24h from DB (excluding important ones)
 */
const deleteOldEmails = async () => {
  const cutoff = new Date(Date.now() - 12 * 60 * 60 * 1000);
  return EmailModel.deleteMany({
    date: { $lt: cutoff },
    important: { $ne: true },
  });
};

export const startEmailCleanupJob = () => {
  // For testing: run every minute
  // Change to "0 0 * * *" for midnight
  cron.schedule("* * * * *", async () => {
    console.log("[CRON] Running auto-delete old emails...");
    try {
      const result = await deleteOldEmails();
      console.log(`[CRON] Deleted ${result.deletedCount} old emails`);
    } catch (err) {
      console.error("[CRON] Error deleting old emails", err);
    }
  });
};
