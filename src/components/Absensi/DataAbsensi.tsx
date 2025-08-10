"use client";

import { Flex, Grid, GridCol, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getLogs } from "@/services/user";
import { TableLogPekerjaan } from "../Table/TableLogPekerjaan";
import { TableAbsensi } from "../Table/TableAbsensi";


export function DataAbsensi() {
    const [isLoading, setLoading] = useState(true)
    const today = formatDateComparable(Date.now());
    const [data, setData] = useState([]);

    const getUser = async () => {
        setLoading(true)
        const log = await supabase.from('absensi').select("*");

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

        <TableAbsensi data={data} isLoading={isLoading} />


    );
}
