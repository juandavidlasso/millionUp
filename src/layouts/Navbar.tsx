import React from 'react';
import Image from 'next/image';
import { Box, AppBar, Toolbar, Typography, Tooltip, Button, Container } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
import { ThemeProps } from '@interfaces/themes';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const Navbar: React.FC<Props> = ({ toogleTheme }) => {
    return (
        <Box>
            <AppBar color="primary" position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1 }}>
                            <Image src="/logo.png" alt="Logo" width={50} height={50} />
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'block' }
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="h3"
                                sx={{ margin: '0 auto' }}
                                color="text.primary"
                                className="font-semibold"
                                onClick={() => sessionStorage.setItem('theme', 'light')}
                            >
                                Million Up
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }} display="flex">
                            <Tooltip title="Día">
                                <Button
                                    onClick={() => {
                                        sessionStorage.setItem('theme', 'light');
                                        toogleTheme('light');
                                    }}
                                >
                                    <LightModeOutlinedIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Noche">
                                <Button
                                    onClick={() => {
                                        sessionStorage.setItem('theme', 'dark');
                                        toogleTheme('dark');
                                    }}
                                >
                                    <NightlightRoundOutlinedIcon />
                                </Button>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Navbar;
