import { render, screen, within } from '@testing-library/react';
import ListCurrencyView from '@modules/ListCurrencies';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { CryptoProps } from '@interfaces/api';
import { LoadingProvider } from '@context/LoadingProvider';

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

beforeEach(() =>
    render(
        <LoadingProvider>
            <ListCurrencyView toogleTheme={() => {}} data={fakeResponse} />
        </LoadingProvider>
    )
);

describe('Test para el componente del listado de crypto currencies', () => {
    it('Test: Debe existir el título de la página', async () => {
        const title = screen.getByText('Listado de Crypto Currencies');
        expect(title).toBeInTheDocument();
    });

    it('Test: La data debe estar mostrada en una tabla', () => {
        const table = screen.getByTestId('tableData');
        expect(table).toBeVisible();
    });

    it('Test: La tabla debe contener los siguientes encabezados: ID, Simbolo, Nombre, Rango, Precio USD, Acciones', async () => {
        const table = await screen.findByTestId('tableData');

        const tableHeaders = within(table).getAllByRole('columnheader');

        expect(tableHeaders).toHaveLength(6);

        expect(tableHeaders[0]).toHaveTextContent(/id/i);
        expect(tableHeaders[1]).toHaveTextContent(/simbolo/i);
        expect(tableHeaders[2]).toHaveTextContent(/nombre/i);
        expect(tableHeaders[3]).toHaveTextContent(/rango/i);
        expect(tableHeaders[4]).toHaveTextContent(/precio usd/i);
        expect(tableHeaders[5]).toHaveTextContent(/acciones/i);
    });

    it('Test: Cada fila debe contener: ID, Simbolo, Nombre, Rango, Precio USD, Ver Detalle', async () => {
        const table = await screen.findByTestId('tableData');

        const tableCells = within(table).getAllByRole('cell');

        expect(tableCells).toHaveLength(6);

        expect(tableCells[0]).toHaveTextContent(fakeResponse[0].id);
        expect(tableCells[1]).toHaveTextContent(fakeResponse[0].symbol);
        expect(tableCells[2]).toHaveTextContent(fakeResponse[0].name);
        expect(tableCells[3]).toHaveTextContent(fakeResponse[0].rank.toString());
        expect(tableCells[4]).toHaveTextContent(fakeResponse[0].price_usd);

        expect(within(table).getByText('Ver Detalle').closest('a')).toHaveAttribute(
            'href',
            `/currency/${fakeResponse[0].id}`
        );
    });

    it('Test: Resultados por página por defecto es 5', async () => {
        await screen.findByTestId('tableData');

        expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument();

        const listbox = screen.getByRole('combobox');

        expect(listbox).toHaveTextContent('5');
    });

    it('Test: Deben existir los botones de next y previous', async () => {
        await screen.findByTestId('tableData');

        const previousPageBtn = screen.getByRole('button', { name: /previous page/i });

        expect(previousPageBtn).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();

        expect(previousPageBtn).toBeDisabled();
    });
});
