import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { getInvoices } from "../api/InvoiceAPI";

export default function DashboardPage() {
    const [rows, setRows] = useState([] as any[]);

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
        console.log('start populateInvoiceData');
        getInvoices(handleAfterGetInvoices,
            {});
    }

    const handleAfterGetInvoices = (response: any) => {
        console.log('handleAfterGetInvoices response', response);
        if (response) {
            console.log('response', response);
            setRows(response.data)
        }
    }

    useEffect(() => {
        populateInvoiceData();
    }, []);

    return (
        <>
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