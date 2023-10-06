import { useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import AdminLayout from '@layouts/AdminLayout';
import { ThemeProps } from '@interfaces/themes';
import { LoadingContext } from '@context/LoadingContext';
import Loading from '@components/Loading';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const Home: NextPage<Props> = ({ toogleTheme }) => {
    const router = useRouter();
    const { isLoading, openLoading } = useContext(LoadingContext);

    return (
        <>
            <Loading isOpen={isLoading} />
            <AdminLayout toogleTheme={toogleTheme} title="Million Up" pageDescription="Million">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="calc(100vh - 200px)"
                    width="calc(100vw - 40px)"
                >
                    <Button
                        variant="contained"
                        className="!p-8"
                        onClick={() => {
                            openLoading();
                            router.push('/currency');
                        }}
                    >
                        Ir al Listado de Crypto Currencies
                    </Button>
                </Box>
            </AdminLayout>
        </>
    );
};

export default Home;
