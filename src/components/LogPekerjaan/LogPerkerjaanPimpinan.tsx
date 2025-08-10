"use client";

import { Flex, Grid, GridCol, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getLogs } from "@/services/user";
import { TableLogPekerjaan } from "../Table/TableLogPekerjaan";


export function LogPekerjaanPimpinan() {
    const [isLoading, setLoading] = useState(true)
    const today = formatDateComparable(Date.now());
    const [data, setData] = useState([]);

    const getUser = async () => {
        setLoading(true)
        const log = await supabase.from('log_harian').select("*");

        console.log("ini log ", log);

        if (log.error === null) {
            setData(e => log.data)
        }

        setLoading(false)
    }


    useEffect(() => {
        getUser()





    }, [])




    return (

        <TableLogPekerjaan data={data} isLoading={isLoading} />


    );
}
