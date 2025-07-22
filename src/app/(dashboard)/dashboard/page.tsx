"use client"

import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useMounted } from "@/hooks/useMounted";


export default function Dashboard() {
  const isMounted = useMounted()

  if (isMounted) {
    return (
      <PageContainer title="Dashboard">
        <DashboardContent />
      </PageContainer>
    )

  }

  return null
}
