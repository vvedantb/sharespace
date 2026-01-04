import { getPendingReports } from "@/lib/actions/reports";
import { ReportsList } from "./ReportsList";

export default async function ReportsPage() {
  const reports = await getPendingReports();

  const formattedReports = reports.map((report) => ({
    id: report.id,
    reason: report.reason,
    description: report.description,
    createdAt: report.createdAt.toISOString(),
    reporter: report.reporter,
    item: report.item,
    reportedUser: report.reportedUser,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Reports</h1>
      <p className="mt-1 text-sm text-default-500">
        Review and manage user reports
      </p>
      <ReportsList initialReports={formattedReports} />
    </div>
  );
}
