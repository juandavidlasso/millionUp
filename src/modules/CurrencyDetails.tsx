import React from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import { CryptoProps } from '@interfaces/api';

const headers = [
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
];

interface Props {
    crypto: CryptoProps[];
}

const CurrencyDetails: React.FC<Props> = ({ crypto }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((head) => (
                            <TableCell key={head}>{head}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {crypto.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.csupply}</TableCell>
                            <TableCell align="center">{row.market_cap_usd}</TableCell>
                            <TableCell align="center">{row.msupply}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.nameid}</TableCell>
                            <TableCell align="center">{row.percent_change_1h}</TableCell>
                            <TableCell align="center">{row.percent_change_24h}</TableCell>
                            <TableCell align="center">{row.percent_change_7d}</TableCell>
                            <TableCell align="center">{row.price_btc}</TableCell>
                            <TableCell align="center">{row.price_usd}</TableCell>
                            <TableCell align="center">{row.rank}</TableCell>
                            <TableCell align="center">{row.symbol}</TableCell>
                            <TableCell align="center">{row.tsupply}</TableCell>
                            <TableCell align="center">{row.volume24}</TableCell>
                            <TableCell align="center">{row.volume24a}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CurrencyDetails;
