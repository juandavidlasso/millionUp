import { useState, useCallback, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Theme, ThemeProvider, CssBaseline } from '@mui/material';
import { ligthTheme, darkTheme } from '@themes/index';
import '../styles/globals.css';
import { ThemeProps } from '@interfaces/themes/index';
import { LoadingProvider } from 'src/context/LoadingProvider';

const App = ({ Component, pageProps }: AppProps) => {
    const [theme, setTheme] = useState<Theme>(ligthTheme);

    const toogleTheme = useCallback((theme: ThemeProps) => {
        setTheme(theme === 'light' ? ligthTheme : darkTheme);
    }, []);

    useEffect(() => {
        const theme = sessionStorage.getItem('theme') || 'light';
        setTheme(theme === 'light' ? ligthTheme : darkTheme);
    }, [theme]);

    return (
        <LoadingProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} toogleTheme={toogleTheme} />
            </ThemeProvider>
        </LoadingProvider>
    );
};

export default App;
