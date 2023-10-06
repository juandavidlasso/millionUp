import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { ThemeProps } from '@interfaces/themes/index';
import Navbar from './Navbar';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
    children: JSX.Element;
    title: string;
    pageDescription: string;
}

const AdminLayout: React.FC<Props> = ({ toogleTheme, children, title, pageDescription }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
            </Head>

            <nav>
                <Navbar toogleTheme={toogleTheme} />
            </nav>

            <main>
                <Box component="main" sx={{ pt: 3, mt: 1, width: '100%', pl: 2, pr: 2 }}>
                    {children}
                </Box>
            </main>
        </>
    );
};

export default AdminLayout;
