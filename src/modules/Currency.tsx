import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Typography } from '@mui/material';
import AdminLayout from '@layouts/AdminLayout';
import { ThemeProps } from '@interfaces/themes';
import { CryptoProps } from '@interfaces/api';
import CurrencyDetails from './CurrencyDetails';

interface Props {
    crypto: CryptoProps[];
    toogleTheme: (theme: ThemeProps) => void;
}

const CurrencyView: React.FC<Props> = ({ toogleTheme, crypto }) => {
    const router = useRouter();
    return (
        <AdminLayout
            toogleTheme={toogleTheme}
            title="Currency"
            pageDescription="Detalle de la currency"
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h3"
                            component="h3"
                            color="text.primary"
                            textAlign="center"
                            marginBottom={3}
                        >
                            Crypto {crypto[0].name}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <CurrencyDetails crypto={crypto} />
                    </Grid>

                    <Grid item xs={12} textAlign="center">
                        <Button
                            onClick={() => router.push('/currency')}
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 5, pt: 2, pb: 2, pl: 4, pr: 4 }}
                        >
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </AdminLayout>
    );
};

export default CurrencyView;
