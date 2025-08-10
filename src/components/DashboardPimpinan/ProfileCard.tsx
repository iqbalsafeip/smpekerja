"use client";

import { getCurrentLocation, getCurrentTimeText } from "@/services/user";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Drawer,
  DrawerHeader,
  Flex,
  Group,
  Input,
  List,
  LoadingOverlay,
  Menu,
  Modal,
  Paper,
  Skeleton,
  Space,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconActivity, IconAlbum, IconCircleCheck, IconCircleDashed, IconClock, IconDots, IconEaseOut, IconEye, IconFileZip, IconInputCheck, IconLocation, IconMap, IconOutbound, IconSend, IconStepOut, IconTimeDuration0, IconTrash } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";


import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'



const sectionStyle = {
  padding: "var(--mantine-spacing-md)",
  borderTop:
    "1px solid lightdark(var(--mantine-colors-gray-3), var(--mantine-colors-dark-4))",
};

export default function ProfileCard({ user, profile, role, isLoading, absen, doAbsen, insertLog }: any) {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [opened, { close, open }] = useDisclosure(false);
  const [openedLog, { close: closeLog, open: openLog }] = useDisclosure(false);
  const [location, setLocation] = useState({});
  const [isLoadingMap, setLoading] = useState(true)
  const [currAbsen, setCurrAbsen] = useState({});
  const [form, setForm] = useState("")
  const [laodingLog, setLoadingLog] = useState(false)

  useEffect(() => {
    setLoading(true)
    console.log("ini absen", absen);
    getCurrentLocation().then(res => {
      setLocation(e => res)
      console.log("ini lokasi", res);
      setLoading(false)
    })
    setCurrAbsen(absen);
  }, [absen])

  
  const doLog = async () => {
    setLoadingLog(true);
    await insertLog(form, location, callback)
    setLoadingLog(false);
  }

  const callback = async (val : any) => {
    setForm("");
    closeLog()
  }

  const insertAbsen = async (val : boolean) => {
    setLoading(true);
    await doAbsen(val, callbackMap);
    setLoading(false);
  }

  const callbackMap = async (val:any) => {
    setCurrAbsen(val)
  }





  return (
    <Card radius="md">
      <Card.Section style={sectionStyle}>
        <Group justify="space-between">
          <Avatar radius="xl" />
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEye size={14} />}>
                Ubah Password
              </Menu.Item>
              
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Space h="md" />

        <Flex direction="column">
          {
            isLoading ? <Skeleton height={40} radius="md" width="70%" visible={true} /> : <Title order={5}>{profile?.name}</Title>
          }

          <Space h="xs" />
          <Group justify="space-between"  >

            <Stack gap={4} >
              <Text fz="sm" fw="500">
                Email
              </Text>
              {isLoading ? <Skeleton height={30} radius="md" width={120} visible={true} /> : <Text fz="sm" c="dimmed" fw="500" >
                {user?.email}
              </Text>}

            </Stack>
            <Stack gap={4}  >
              <Text fz="sm" fw="500">
                Jabatan
              </Text>
              {
                isLoading ? <Skeleton height={30} radius="md" width={120} visible={true} /> : <Title order={3}>{role.role}</Title>
              }

            </Stack>
          </Group>
        </Flex>
      </Card.Section>
    </Card >
  );
}
