import React, { ReactNode } from 'react'
import SettingsNavigation from '../../components/SettingsNavigation'

export default async function ChurchSuperAdminLayout({
    children,
    params }: {
        children: ReactNode;
        params: Promise<{
            id: string;
        }>
    }) {
        const { id } = await params
    return (
        <div>
            <SettingsNavigation churchId={id}/>
            {children}
        </div>
    );
}
