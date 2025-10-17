// app/subdomain/[subdomain]/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData } from '@/lib/subdomains';
import { protocol, rootDomain } from '@/lib/utils';
import SubdomainContent from '../components/sub-domain-page';
import HeroCarousel from '../components/landing-page/HeroCarousel';
import Header from '../components/landing-page/Header';
import Services from '../components/landing-page/Services';
import Events from '../components/landing-page/Events';
import ContactSection from '../components/landing-page/ContactSection';
import WisdomSection from '../components/landing-page/WisdomSection';
import { Ministries } from '../components/landing-page/Ministries';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain
    };
  }

  return {
    title: `${subdomainData.name} - ${subdomain}.${rootDomain}`,
    description: `Welcome to ${subdomainData.name} on ${subdomain}.${rootDomain}`
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }
    // <SubdomainContent subdomain={subdomain} initialData={subdomainData} />;
  // Pass the initial data and subdomain to the client component
  return (
    <div className="">
      <Header />
      <HeroCarousel />
      <Services />
      <Events />
      <Ministries />
      <WisdomSection />
      <ContactSection />
    </div>
  )
}