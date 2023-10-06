import { GetStaticProps, NextPage } from 'next';
import ListCurrencyView from '@modules/ListCurrencies';
import cryptoApi from '@api/cryptoApi';
import { CryptoProps, CryptoResponse } from '@interfaces/api';
import { ThemeProps } from '@interfaces/themes';

interface HomeProps {
    toogleTheme: (theme: ThemeProps) => void;
    data: CryptoProps[];
}

const Home: NextPage<HomeProps> = ({ toogleTheme, data }) => {
    return (
        <>
            <ListCurrencyView toogleTheme={toogleTheme} data={data} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await cryptoApi.get<CryptoResponse>('/tickers');

    const currencies = data.data.map((currency) => ({
        id: currency.id,
        symbol: currency.symbol,
        name: currency.name,
        rank: currency.rank,
        price_usd: currency.price_usd
    }));

    return {
        props: {
            data: currencies
        }
    };
};

export default Home;
