"use client"

import { Footer } from "@/components/Footer/Footer";
import { Features } from "@/components/Landing/FeaturesSection";
import { Header } from "@/components/Landing/Header";
import { HeroSection } from "@/components/Landing/HeroSection";
import { LandingContainer } from "@/components/Landing/LandingContainer";
import { PricingSection } from "@/components/Landing/PricingSection";
import { SocialProofSection } from "@/components/Landing/SocialProofSection";
import { FAQSection } from "@/components/Landing/FAQSection";
import { CTASection } from "@/components/Landing/CTASection";
import { Loader, LoadingOverlay, Stack } from "@mantine/core";
import { Logo } from "@/components/Logo/Logo";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useRouter } from "next/navigation";
import { getRole } from "@/services/user";

export default function Page() {
	const route = useRouter()
	const [role, setRole] = useState("")
	const getUser = async () => {
		
		const res = await supabase.auth.getUser(); 	

		if(res.error === null){
			console.log(res);
			const {data, error} = await getRole(res.data.user.id)
			if(error===null){
				setRole(e=> data.role);
				if(data.role === "PEKERJA"){
					route.replace('/dashboard')
				}
			}

			return true
		}

		route.replace('/login')
		
	}

	useEffect(()=> {
		getUser()
	},[])

	return (
		<LoadingOverlay visible={true} loaderProps={{ children: <Stack justify="center" align="center" >
			<Logo />
			<Loader color="black" />
		</Stack> }} />
	);
}
