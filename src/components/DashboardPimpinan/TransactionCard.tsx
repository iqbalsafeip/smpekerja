"use client";

import { useCustomTable } from "@/hooks/use-custom-table";
import { Button, Card, Title } from "@mantine/core";
import { type MRT_ColumnDef, MRT_Table } from "mantine-react-table";
import classes from "./Dashboard.module.css";
import { useState } from "react";

type Block = {
  epoch: number;
  previous_hash: string;
  producer: string;
  hash: string;
  parent_number: number;
  number: number;
  data_size: number;
  number_of_transactions: number;
  successful_transactions: number;
  vote_transactions: number;
  total_tx_fees: number;
  number_of_rewards: number;
  total_reward_amount: number;
  total_compute_units_consumed: number;
  total_compute_units_limit: number;
  block_time: number;
};


export function TransactionCard({ data }: any) {
  const columns: MRT_ColumnDef<Block>[] = [
    {
      accessorKey: "uraian_pekerjaan",
      header: "Uraian Pekerjaan",
    },
    {
      accessorKey: "lokasi",
      header: "Lokasi",
      Cell: ({ renderedCellValue, row }) => (
        <Button>Lihat Lokasi</Button>
      )
    },
  ];



  const table = useCustomTable({
    columns,
    data: data ?? [],
    rowCount: data?.length ?? 0,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        
      },
    },
  
   
   
  });

  return (
    <Card radius="md">
      <Card.Section className={classes.section}>
        <Title order={5}>Log Pekerjaan Hari ini</Title>
      </Card.Section>
      <Card.Section className={classes.section}>
        <MRT_Table table={table} />
      </Card.Section>
    </Card>
  );
}
