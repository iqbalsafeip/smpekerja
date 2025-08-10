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

export function TableAbsensi({ data, isLoading }: any) {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [opened, { close, open }] = useDisclosure(false);
  const [selected, setSelected] = useState({})
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Tanggal Log",
        accessorFn: (val) => formatTanggalIndonesiaFromISO(val.created_at),

      },
      {
        accessorKey: "jam_masuk",
        header: "Jam Masuk",
      },
      {
        accessorKey: "jam_keluar",
        header: "Jam Keluar",
      },
      {
        accessorKey: "lokasi",
        header: "Lokasi",
        Cell: ({ renderedCellValue, row, cell }) => (
          <Button onClick={() => handleDetail(renderedCellValue)} >Lihat Lokasi</Button>
        )
      },
      {
        header: "Pekerja",
        Cell: ({ renderedCellValue, row, cell }) => (
          <Text  >Nia Abania</Text>
        )
      },
    ],
    [],
  );

  const handleDetail = (row: any) => {
    setSelected(e => row)
    open()
  }

  

  return (
    <Paper radius="md" p="md" >
      <MantineReactTable columns={columns} data={data} />
      <Modal opened={opened} onClose={close} title="Lokasi Pekerjaan" fullScreen={isMobile} centered>
        <Paper shadow="lg" withBorder p="md">
          <Paper w={"100%"} h={"100%"} style={{ overflow: "hidden" }} >
            {
              (JSON.stringify(selected) !== "{}") ? <MapContainer center={[selected?.latitude, selected?.longitude]} zoom={16} style={{
                height: 432
              }} >
                <TileLayer
                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
                {
                  (JSON.stringify(selected) !== "{}") && <Marker position={[selected?.latitude, selected?.longitude]}   >
                    <Popup>
                      Lokasi Pekerjaan
                    </Popup>
                  </Marker>
                }

              </MapContainer> : <Skeleton visible={true} height={432} width={"100%"} />
            }

          </Paper>

        </Paper>

      </Modal>
    </Paper>
  );
}
