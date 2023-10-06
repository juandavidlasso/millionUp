import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material';

interface Props {}

const Componente: React.FC<Props> = ({}) => {
    const router = useRouter();

    return (
        <Box
            width="100%"
            height="100vh"
            textAlign="center"
            padding={10}
            sx={{ background: '#E5E7E9' }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Image
                        src="/error.png"
                        alt="Error"
                        width={250}
                        height={250}
                        className="mx-auto mb-10"
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" component="h3">
                    No se encuentra una crypto currency con ese ID
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={() => router.push('/currency')}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 5, pt: 2, pb: 2, pl: 4, pr: 4 }}
                >
                    Regresar
                </Button>
            </Grid>
        </Box>
    );
};

export default Componente;
