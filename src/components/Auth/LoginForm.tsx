"use client";

import { supabase } from "@/services/supabase";
import {
  Alert,
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  Notification,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState({
    isError: false,
    title: "",
    desc: ""
  })

  const [isLoading, setLoading] = useState(false)

  const doLogin = async () => {
    setLoading(true)
    if (form.email === "" && form.password === "") {
      setError({
        isError: true,
        title: "Form tidak lengkap",
        desc: "Lengkapi Form sebagaimana Mestinya"
      })
      setLoading(false)
      return false

    }


    setError({
      isError: false,
      title: "",
      desc: ""
    })
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    
    setLoading(false)
    if(error === null){
      router.replace("/")
    }
  }

  

  return (
    <Card withBorder shadow="md" p={30} mt={30} radius="md">
      {
        error.isError && <Alert variant="light" color="red" title={error.title} icon={<IconInfoCircle />} mb={10}>
          {error.desc}
        </Alert>
      }


      <TextInput label="Email" placeholder="test@example.com" required onChange={(ev) => setForm((e) => ({ ...e, email: ev.target.value }))} />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
        onChange={(ev) => setForm((e) => ({ ...e, password: ev.target.value }))}
      />
      {/* <Group mt="md" justify="space-between">
        <Checkbox label="Remember me" />
        <Anchor size="sm" href="#">
          Forgot Password？
        </Anchor>
      </Group> */}
      <Button fullWidth mt="xl" onClick={doLogin} loading={isLoading} loaderProps={{ type: 'dots' }} >
        Sign In
      </Button>


    </Card>
  );
}
