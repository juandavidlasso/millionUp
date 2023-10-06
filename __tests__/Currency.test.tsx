import { render, screen } from '@testing-library/react';
import CurrencyView from '@modules/Currency';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { CryptoProps } from '@interfaces/api';

const OK_STATUS = 200;

const fakeResponse: CryptoProps[] = [
    {
        id: '90',
        symbol: 'BTC',
        name: 'Bitcoin',
        nameid: 'bitcoin',
        rank: 1,
        price_usd: '27478.40',
        percent_change_24h: '0.06',
        percent_change_1h: '-0.67',
        percent_change_7d: '0.00',
        price_btc: '1.00',
        market_cap_usd: '535030403557.06',
        volume24: 9684733492.9682,
        volume24a: 7708137118.655226,
        csupply: '19470946.00',
        tsupply: '19470946',
        msupply: '21000000'
    }
];

const server = setupServer(
    rest.get('/tickers', (req, res, ctx) => res(ctx.status(OK_STATUS), ctx.json(fakeResponse)))
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

beforeEach(() => render(<CurrencyView toogleTheme={() => {}} crypto={fakeResponse} />));

describe('Test para el componente de detalle de la crypto currency', () => {
    it('Test: Debe existir el título de la página', async () => {
        const title = screen.getByText(`Crypto ${fakeResponse[0].name}`);
        expect(title).toBeInTheDocument();
    });

    it('Test: La data debe estar mostrada en una tabla', () => {
        const table = screen.getByRole('table');
        expect(table).toBeVisible();
    });

    it(`Test: La tabla debe contener los siguientes encabezados:
		ID,
		Csupply,
		Market_cap_usd,
		Msupply,
		Name,
		Nameid,
		Percent_change_1h,
		Percent_change_24h,
		Percent_change_7d,
		Price_btc,
		Price_usd,
		Rank,
		Symbol,
		Tsupply,
		Volume24,
    	Volume24a`, () => {
        const tableHead = screen.getByRole('table').querySelector('thead')!;
        const headerCells = tableHead.querySelectorAll('th');

        expect(headerCells).toHaveLength(16);

        const headerText = Array.from(headerCells).map((cell) => cell.textContent);

        expect(headerText).toEqual([
            'ID',
            'Csupply',
            'Market_cap_usd',
            'Msupply',
            'Name',
            'Nameid',
            'Percent_change_1h',
            'Percent_change_24h',
            'Percent_change_7d',
            'Price_btc',
            'Price_usd',
            'Rank',
            'Symbol',
            'Tsupply',
            'Volume24',
            'Volume24a'
        ]);
    });

    it(`Test: Cada fila debe contener:
		ID,
		Csupply,
		Market_cap_usd,
		Msupply,
		Name,
		Nameid,
		Percent_change_1h,
		Percent_change_24h,
		Percent_change_7d,
		Price_btc,
		Price_usd,
		Rank,
		Symbol,
		Tsupply,
		Volume24,
    	Volume24a
	`, () => {
        const tableBody = screen.getByRole('table').querySelector('tbody')!;
        const bodyRows = tableBody.querySelectorAll('td');

        expect(bodyRows).toHaveLength(16);

        expect(bodyRows[0]).toHaveTextContent(fakeResponse[0].id);
        expect(bodyRows[1]).toHaveTextContent(fakeResponse[0].csupply);
        expect(bodyRows[2]).toHaveTextContent(fakeResponse[0].market_cap_usd);
        expect(bodyRows[3]).toHaveTextContent(fakeResponse[0].msupply);
        expect(bodyRows[4]).toHaveTextContent(fakeResponse[0].name);
        expect(bodyRows[5]).toHaveTextContent(fakeResponse[0].nameid);
        expect(bodyRows[6]).toHaveTextContent(fakeResponse[0].percent_change_1h);
        expect(bodyRows[7]).toHaveTextContent(fakeResponse[0].percent_change_24h);
        expect(bodyRows[8]).toHaveTextContent(fakeResponse[0].percent_change_7d);
        expect(bodyRows[9]).toHaveTextContent(fakeResponse[0].price_btc);
        expect(bodyRows[10]).toHaveTextContent(fakeResponse[0].price_usd);
        expect(bodyRows[11]).toHaveTextContent(fakeResponse[0].rank.toString());
        expect(bodyRows[12]).toHaveTextContent(fakeResponse[0].symbol);
        expect(bodyRows[13]).toHaveTextContent(fakeResponse[0].tsupply);
        expect(bodyRows[14]).toHaveTextContent(fakeResponse[0].volume24.toString());
        expect(bodyRows[15]).toHaveTextContent(fakeResponse[0].volume24a.toString());
    });

    it('Test: Debe existir el botón de regresar atrás', () => {
        const button = screen.getByText('Regresar');

        expect(button).toBeInTheDocument();
    });
});
