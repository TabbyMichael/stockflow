import { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard/content";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  return (
    <>
      <DashboardContent />
    </>
  );
}