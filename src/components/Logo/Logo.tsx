import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./Logo.module.css";

interface Props {
  width?: string;
  height?: string;
  size?: string;
}

export const Logo: React.FC<Props> = (props) => {
  return (
    <Flex direction="row" align="center" gap={4}>
      <Link
        href="/"
        style={{ textDecoration: "none" }}
        className={classes.heading}
      >
        <Text fw="bolder" size={props.size ? props.size : 'xl'}>
          SM
          <Text component="span" fw="normal" className={classes.subheading}>
            Pekerja
          </Text>{' '}
          Primafli
        </Text>
      </Link>
    </Flex>
  );
};
