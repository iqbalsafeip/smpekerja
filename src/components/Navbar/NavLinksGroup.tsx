"use client";

import {
  Box,
  Collapse,
  Group,
  LoadingOverlay,
  ThemeIcon,
  UnstyledButton,
  useDirection,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./NavLinksGroup.module.css";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  onClick?: any
}

export function NavLinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  onClick
}: LinksGroupProps) {
  const pathname = usePathname();
  const { dir } = useDirection();
  const route = useRouter();
  const [isLoading, setLoading] = useState(false)

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => {
    return (
      <Link
        href={link.link}
        key={link.label}
        className={`${classes.link} ${link.link === pathname && classes.activeLink}`}
      >
        {link.label}
      </Link>
    );
  });

  const handleClick = () => {
    setLoading(true)
    route.replace("/");
  }

  return (
    <>{
      isLoading && <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 3 , opacity: 0.2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
    }
      {link ? (
        <Link
          href={link}
          onClick={()=> onClick(handleClick)}
          className={`${classes.control} ${link === pathname && classes.activeControl}`}
        >
          <Group gap={0} justify="space-between">
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size="1.1rem" />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          </Group>
        </Link>
      ) : (
        <UnstyledButton
          onClick={() => {
            if (hasLinks) {
              setOpened((o) => !o);
              return;
            }
          }}
          className={classes.control}
        >
          <Group gap={0} justify="space-between">
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size="1.1rem" />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size="1rem"
                stroke={1.5}
                style={{
                  transform: opened
                    ? `rotate(${dir === "rtl" ? -90 : 90}deg)`
                    : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
