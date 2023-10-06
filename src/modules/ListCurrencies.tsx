import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProps } from '@interfaces/themes/index';
import AdminLayout from '@layouts/AdminLayout';
import { CryptoProps } from '@interfaces/api';
import { LoadingContext } from '@context/LoadingContext';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'string', width: 100 },
    { field: 'symbol', headerName: 'Simbolo', type: 'string', width: 200 },
    { field: 'name', headerName: 'Nombre', type: 'string', width: 250 },
    { field: 'rank', headerName: 'Rango', type: 'number', width: 200 },
    { field: 'price_usd', headerName: 'Precio USD', type: 'string', width: 250 },
    {
        field: 'details',
        headerName: 'Acciones',
        width: 200,
        renderCell: (params) => {
            return (
                <Link
                    href={`/currency/${params.row.id}`}
                    target="_self"
                    rel="noreferer"
                    className="hover:text-[#7B241C] hover:font-bold underline"
                >
                    Ver Detalle
                </Link>
            );
        }
    }
];

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
    data: CryptoProps[];
}

const ListCurrencyView: React.FC<Props> = ({ toogleTheme, data }) => {
    const { closeLoading } = useContext(LoadingContext);

    useEffect(() => {
        closeLoading();
    }, []);

    return (
        <>
            <AdminLayout
                toogleTheme={toogleTheme}
                title="Currencies"
                pageDescription="Listado de cryptos"
            >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h2"
                                component="h2"
                                color="text.primary"
                                textAlign="center"
                                marginBottom={3}
                            >
                                Listado de Crypto Currencies
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{ height: 400, width: '100%', marginBottom: 20 }}>
                                <DataGrid
                                    data-testid="tableData"
                                    disableVirtualization
                                    sx={{
                                        '& .MuiDataGrid-columnHeaderTitleContainerContent': {
                                            width: '100%'
                                        },
                                        '& .MuiDataGrid-columnHeaderTitle': {
                                            width: '100%'
                                        },
                                        '& .MuiDataGrid-cell': {
                                            justifyContent: 'center'
                                        }
                                    }}
                                    rows={data}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 }
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 20, 50]}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </AdminLayout>
        </>
    );
};

export default ListCurrencyView;
