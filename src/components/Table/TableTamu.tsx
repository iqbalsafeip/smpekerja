"use client";

import { Badge, Button, Flex, List, Modal, Paper, Rating, Skeleton, Space, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useCustomTable } from "@/hooks/use-custom-table";
import type { Product } from "@/services/products/types";
import { formatTanggalIndonesiaFromISO } from "@/services/user";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconCircleCheck, IconInputCheck } from "@tabler/icons-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export function TableTamu({ data, isLoading }: any) {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [opened, { close, open }] = useDisclosure(false);
  const [selected, setSelected] = useState({})
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Tanggal",
        accessorFn: (val) => formatTanggalIndonesiaFromISO(val.created_at),

      },
      {
        accessorKey: "nomor_ktp",
        header: "Nomor KTP",
      },
      {
        accessorKey: "nomor_kpj",
        header: "Nomor KPJ",
      },
      {
        accessorKey: "nama_lengkap",
        header: "Nama Lengkap",
      },
      {
        accessorKey: "keperluan",
        header: "Keperluan/Kendala",
      },
      {
        accessorKey: "nomor_hp",
        header: "Nomor WA/HP",
      },
      {
        accessorKey: "penyelesaian",
        header: "Peneyelesaian",
      },
      {
        accessorKey: "kepuasan_pelayanan",
        header: "Rating Kepuasan Pelayanan",
      },
      {
        accessorKey: "rating_pelayanan_informasi",
        header: "Rating Pelayanan Informasi",
      },
    ],
    [],
  );

  const handleDetail = (row: any) => {
    setSelected(e => row)
    open()
  }

  

  return (
    <Paper   >
      <MantineReactTable columns={columns} data={data} />
     
    </Paper>
  );
}
