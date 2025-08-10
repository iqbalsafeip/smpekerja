"use client";

import { Flex, Grid, GridCol, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getLogs, getTamu } from "@/services/user";
import { TableLogPekerjaan } from "../Table/TableLogPekerjaan";
import { TableTamu } from "../Table/TableTamu";


export function TamuDatang() {
    const [isLoading, setLoading] = useState(true)
    const today = formatDateComparable(Date.now());
    const [data, setData] = useState([]);

    const getUser = async () => {
        setLoading(true)
        const res = await supabase.auth.getUser()
        const log = await getLogs(res.data.user?.id)
        const tamu = await getTamu();

        console.log("ini log ", log);

        if (tamu.error === null) {
            setData(e => tamu.data)
        }

        setLoading(false)
    }


    useEffect(() => {
        getUser()





    }, [])




    return (

        <TableTamu isLoading={isLoading} data={data}  />


    );
}
