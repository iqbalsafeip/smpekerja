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

const progressLabel = [
    "Belum Memiliki Kontak",
    "Kontak Dimiliki",
    "Sudah Dihubungi",
    "Sedang Bersurat",
    "Meminta Sosialisasi",
    "Sudah Sosialisasi",
    "Selesai di daftarkan",
    "Tidak ada Respon"
]

export function TablePotensi({ data, isLoading }: any) {
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
                accessorKey: "nama_kelompok",
                header: "Nama Kelompok/ Perorangan",
            },
            {
                accessorKey: "no_hp",
                header: "Nomor HP",
            },
            {
                accessorKey: "alamat",
                header: "Alamat",
            },
            {
                accessorKey: "bidang_usaha",
                header: "Keperluan/Kendala",
            },
            {
                accessorKey: "kategori",
                header: "Kategori",
            },
            {
                accessorKey: "waktu",
                header: "Waktu",
            },
            {
                accessorKey: "progress",
                header: "Progress",
                Cell: ({ renderedCellValue, row, cell }) => (
                    <Badge color="blue">{progressLabel[renderedCellValue]}</Badge>
                )

            },
            {
                accessorKey: "keterangan",
                header: "Keterangan",
            },
        ],
        [],
    );

    const handleDetail = (row: any) => {
        setSelected(e => row)
        open()
    }



    return (
        <Paper radius="md"  >
            <MantineReactTable columns={columns} data={data} />

        </Paper>
    );
}
