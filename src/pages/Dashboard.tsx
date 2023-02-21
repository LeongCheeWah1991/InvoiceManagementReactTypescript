import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { getInvoices, uploadInvoices } from "../api/InvoiceAPI";
import FileUploader from '../components/file-upload';
import SpinnerLoader from '../components/spinner-loader';

export default function DashboardPage() {
    const [rows, setRows] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            field: 'invoiceNo',
            headerName: 'Invoice No',
            flex: 1,
            sortable: false,
        },
        {
            field: 'stockCode',
            headerName: 'Stock Code',
            flex: 1,
            sortable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 5,
            sortable: false,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 1,
            sortable: false,
        },
        {
            field: 'invoiceDate',
            headerName: 'Invoice Date',
            flex: 2,
            sortable: false,
        },
        {
            field: 'unitPrice',
            headerName: 'Unit Price',
            flex: 1.5,
            sortable: false,
        },
        {
            field: 'customerId',
            headerName: 'Customer ID',
            flex: 1.5,
            sortable: false,
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 1.5,
            sortable: false,
        }
    ];

    const populateInvoiceData = () => {
        setIsLoading(true);
        console.log('start populateInvoiceData');
        getInvoices(handleAfterGetInvoices,
            {});
    }

    const handleAfterGetInvoices = (response: any) => {
        console.log('handleAfterGetInvoices response', response);
        if (response) {
            console.log('response', response);
            setRows(response.data)
            setIsLoading(false);
        }
    }

    const handleAfterUploadInvoice = (response: any) => {
        console.log('handleAfterUploadInvoice response', response);
        if (response) {
            populateInvoiceData();
        }
    }

    const handleFile = (response: any) => {
        if (response) {
            setIsLoading(true);

            uploadInvoices(handleAfterUploadInvoice,
                {
                    file: response
                });
        }
    }

    useEffect(() => {
        populateInvoiceData();
    }, []);

    return (
        <>
            <SpinnerLoader open={isLoading} />
            <Typography variant="h3">Invoice Management</Typography>
            <Container className='upload-container'>
                <FileUploader handleFile={handleFile} />
            </Container>
            <DataGrid
                columns={columns}
                rows={rows}
                initialState={{
                    pagination: {
                        pageSize: 10,
                    },
                    sorting: {
                        sortModel: [{ field: "invoiceNo", sort: "asc" }],
                    },
                }}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        csvOptions: { disableToolbarButton: true },
                        printOptions: { disableToolbarButton: true },
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                getRowId={(row) => row.invoiceId}
                disableSelectionOnClick
                disableColumnMenu
                disableColumnSelector
                disableColumnFilter
                disableDensitySelector
            ></DataGrid></>
    );
}