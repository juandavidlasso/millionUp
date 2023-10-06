import { GetStaticPaths, GetStaticProps } from 'next';
import CurrencyView from '@modules/Currency';
import cryptoApi from '@api/cryptoApi';
import { CryptoProps, CryptoResponse } from '@interfaces/api';
import { ThemeProps } from '@interfaces/themes';

interface Props {
    crypto: CryptoProps[];
    toogleTheme: (theme: ThemeProps) => void;
}

const CurrencyPage: React.FC<Props> = ({ crypto, toogleTheme }) => {
    return <CurrencyView toogleTheme={toogleTheme} crypto={crypto} />;
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await cryptoApi.get<CryptoResponse>('/tickers');

    const cryptoIds: string[] = data.data.map((crypto: CryptoProps) => crypto.id);

    return {
        paths: cryptoIds.map((idCrypto) => ({
            params: {
                id: idCrypto
            }
        })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id = '' } = ctx.params as { id: string };

    const crypto = await cryptoApi.get<CryptoProps[]>(`/ticker/?id=${Number(id)}`);

    if (crypto.data.length === 0) {
        return {
            redirect: {
                destination: '/currency',
                permanent: false
            }
        };
    }

    return {
        props: {
            crypto: crypto.data
        },
        revalidate: 86400
    };
};

export default CurrencyPage;
