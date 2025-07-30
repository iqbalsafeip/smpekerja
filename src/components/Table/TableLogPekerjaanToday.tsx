"use client";

import { Badge, Button, Modal, Paper, Rating, Skeleton, Space, Text, Title } from "@mantine/core";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import type { Product } from "@/services/products/types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { formatTanggalIndonesiaFromISO } from "@/services/user";

export function TableLogPekerjaanToday({ data, isLoading, withPekerja = false }: any) {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [opened, { close, open }] = useDisclosure(false);
  const [selected, setSelected] = useState({})
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Jam",
        accessorFn: (val) => formatTanggalIndonesiaFromISO(val.created_at, true),

      },
      {
        accessorKey: "uraian_pekerjaan",
        header: "Uraian Pekerjaan",
      },
      {
        accessorKey: "lokasi",
        header: "Lokasi",
        Cell: ({ renderedCellValue, row }) => (
          <Button onClick={() => handleDetail(renderedCellValue)}  >Lihat Lokasi</Button>
        )
      },
      withPekerja && {
        header: "Pekerja",
        Cell: ({ renderedCellValue, row }) => (
          <Text  >Hari Ilham</Text>
        )
      }
    ],
    [],
  );

  const handleDetail = (row: any) => {
    setSelected(e => row)
    open()
  }

  return (
    <Paper radius="md" p="md" >
      <Title order={5}>Log Pekerjaan Hari ini</Title>
      <Space h="md" />
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
