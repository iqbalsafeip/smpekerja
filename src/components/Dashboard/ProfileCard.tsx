"use client";

import { getCurrentLocation } from "@/services/user";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Drawer,
  DrawerHeader,
  Flex,
  Group,
  List,
  LoadingOverlay,
  Menu,
  Modal,
  Paper,
  Skeleton,
  Space,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconActivity, IconAlbum, IconCircleCheck, IconCircleDashed, IconDots, IconEaseOut, IconEye, IconFileZip, IconInputCheck, IconOutbound, IconStepOut, IconTrash } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";


import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'



const sectionStyle = {
  padding: "var(--mantine-spacing-md)",
  borderTop:
    "1px solid lightdark(var(--mantine-colors-gray-3), var(--mantine-colors-dark-4))",
};

export default function ProfileCard({ user, profile, role, isLoading, absen, doAbsen }: any) {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [opened, { close, open }] = useDisclosure(false);
  const [location, setLocation] = useState({});
  const [isLoadingMap, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    console.log("ini absen", absen);
    getCurrentLocation().then(res => {
      setLocation(e => res)
      console.log("ini lokasi", res);
      setLoading(false)
    })
  }, [absen])


  

  

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
              <Menu.Item leftSection={<IconFileZip size={14} />}>
                Action One
              </Menu.Item>
              <Menu.Item leftSection={<IconEye size={14} />}>
                Action Two
              </Menu.Item>
              <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                Action Three
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

      <Card.Section style={sectionStyle}>
        <Group grow>
          <Stack gap={4}>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCircleCheck size={16} />
                </ThemeIcon>
              }
            >
              <List.Item><Text size="sm" fw={700}>Jam Masuk : </Text><Text  >{absen.jam_masuk || "-"}</Text></List.Item>

              <List.Item
                icon={
                  <ThemeIcon color="red" size={24} radius="xl">
                    <IconCircleDashed size={16} />
                  </ThemeIcon>
                }
              >
                <Text size="sm" fw={700} >Jam Pulang : </Text><Text  >{absen.jam_keluar || "-"}</Text>
              </List.Item>
            </List>
          </Stack>

        </Group>
      </Card.Section>

      <Card.Section style={sectionStyle}>
        <Group>
          <Button variant="light" onClick={open} >Detail Absen</Button>
          <Button>Buat Log</Button>
        </Group>
      </Card.Section>
      <Modal opened={opened} onClose={close} title="Detail Absen" fullScreen={isMobile} centered>
        <Paper shadow="lg" withBorder p="md">
          <List
            mb={20}
            spacing="xs"
            size="sm"
            center
            w={"100%"}
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck size={16} />
              </ThemeIcon>
            }
          >
            <List.Item w={"100%"}>
              <Flex justify="space-between" direction={"row"} align={"center"} gap={60} >
                <Stack gap={1} >
                  <Text size="sm" fw={700}>Jam Masuk : </Text><Text  >{absen?.jam_masuk || "-"}</Text>
                </Stack>
                <Button leftSection={<IconInputCheck size={14} />} variant="filled" color="teal" onClick={()=> doAbsen(false)} >
                  Absen Masuk
                </Button>
              </Flex>

            </List.Item>

            <List.Item
              icon={
                <ThemeIcon color="red" size={24} radius="xl">
                  <IconCircleDashed size={16} />
                </ThemeIcon>
              }
              w={"100%"}
            >
              <Flex justify="space-between" direction={"row"} align={"center"} gap={63} >
                <Stack gap={1} >
                  <Text size="sm" fw={700}>Jam Keluar : </Text><Text  >{absen?.jam_keluar || "-"}</Text>
                </Stack>
                <Button leftSection={<IconOutbound size={14} />} variant="filled" color="red" onClick={()=> doAbsen(true)} >
                  Absen Keluar
                </Button>
              </Flex>
            </List.Item>
            {/* <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconAlbum size={16} />
                </ThemeIcon>
              }
            ><Text size="sm" fw={700}>Deskripsi : </Text><Text size="sm" >-</Text></List.Item> */}

          </List>
          <Paper w={"100%"} h={"100%"} style={{ overflow: "hidden" }} >
            {
              !isLoadingMap && <MapContainer center={[location.latitude, location.longitude]} zoom={16} style={{
                height: 432
              }} >
                <TileLayer
                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
                {
                  !isLoading && <Marker position={[absen.lokasi.latitude, absen.lokasi.longitude]}   >
                    <Popup>
                      Lokasi Absen mu
                    </Popup>
                  </Marker>
                }

              </MapContainer>
            }

          </Paper>

        </Paper>

      </Modal>
    </Card >
  );
}
