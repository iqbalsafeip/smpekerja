import { Anchor, Box, Text, Title } from "@mantine/core";
import classes from "./layout.module.css";
import { Logo } from "@/components/Logo/Logo";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <Box className={classes.wrapper}>
      <Logo size={"30px"} />
      
      <Box w={400} p={"xs"}>{children}</Box>
    </Box>
  );
}
