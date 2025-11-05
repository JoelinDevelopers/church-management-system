import React, { ReactNode } from 'react'
import SettingsNavigation from '../../components/SettingsNavigation'
import { getChurchById, getSubdomainData } from '@/lib/subdomains';

export default async function ChurchSuperAdminLayout({
    children,
    params }: {
        children: ReactNode;
        params: Promise<{
            id: string;
        }>
    }) {
        const { id } = await params;
        const church = await getChurchById (id);
    return (
        <div>
            <SettingsNavigation church={church} churchId={id}/>
            {children}
        </div>
    );
}
