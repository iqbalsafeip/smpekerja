"use client";

import { Flex, Grid, GridCol, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getLogs, getPotensi } from "@/services/user";
import { TableLogPekerjaan } from "../Table/TableLogPekerjaan";
import { TablePotensi } from "../Table/TablePotensi";


export function Potensi() {
    const [isLoading, setLoading] = useState(true)
    const today = formatDateComparable(Date.now());
    const [data, setData] = useState([]);

    const getUser = async () => {
        setLoading(true)
        const potensi = await getPotensi()


        if (potensi.error === null) {
            setData(e => potensi.data)
        }

        setLoading(false)
    }


    useEffect(() => {
        getUser()





    }, [])




    return (

        <TablePotensi data={data} isLoading={isLoading} />


    );
}
