import { DataAbsensi } from "@/components/Absensi/DataAbsensi";
import { LogPekerjaan } from "@/components/LogPekerjaan/LogPekerjaan";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PaginationTable } from "@/components/Table/PaginationTable";
import { SimpleTable } from "@/components/Table/SimpleTable";
import { TableLogPekerjaan } from "@/components/Table/TableLogPekerjaan";

export default function Absensi() {
    

  return (
    <PageContainer title="Absensi Pekerja">
      <DataAbsensi />
    </PageContainer>
  );
}
