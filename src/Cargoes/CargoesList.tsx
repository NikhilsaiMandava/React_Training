import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Import, Link, Sheet, Search, ListFilter, DownloadCloud, ArrowDown, MoreVertical,Delete } from "lucide-react";
import { Input } from "@/components/ui/input";
import moment from 'moment-timezone';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from '../Common/Pagination.tsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import GenerateReport from './GenerateReport/GenerateReport.tsx';
import './CargoesList.css';
import axios from 'axios';

export const data: cargo[] = [
    {
        customer: "VG",
        packingListId: "123789",
        cargoType: "SG145",
        cargoSubType: "STLR LOWBED",
        cargoStatus: "Load Ready",
        projectName: "Sample Project 1",
        projectNumber: "1234567",
        voyage: "129028",
        cargoId: "896753429",
        barcode: "11223344",
        guppyId: "903322",
        remoraId: "909378",
        length: "22.00",
        height: "15.00",
        weightMetricTons: "SGRE",
        statusUpdated: "Jan 26,2024 13:21 PM"
    },
    {
        customer: "Nikhil",
        packingListId: "1234567",
        cargoType: "SG1453",
        cargoSubType: "STLR BED",
        cargoStatus: "Onboard",
        projectName: "Project 1",
        projectNumber: "123BN",
        voyage: "129028",
        cargoId: "896753429",
        barcode: "11223344",
        guppyId: "903322",
        remoraId: "909378",
        length: "22.00",
        height: "15.00",
        weightMetricTons: "SGRE",
        statusUpdated: 'Jan 15,2024 01:21 AM'
    }
]

type CargoStatus = keyof typeof statusProgressMap;

const statusProgressMap: Record<string, number> = {
    "Load Ready": 20,
    "Onboard": 40,
    "Discharged": 60,
    "Loaded Out": 80,
    "Origin": 0,
    "Distribution In": 50,
    "Distribution Out": 70,
    "Delivered": 100,
};

export type cargo = {
    customer: string,
    packingListId: string,
    cargoType: string,
    cargoSubType: string,
    cargoStatus: "Load Ready" | "Onboard" | "Discharged" | "Loaded Out" | "Origin" | "Distribution In" | "Distribution Out" | "Delivered",
    projectName: string,
    projectNumber: string,
    voyage: string,
    cargoId: string,
    barcode: string,
    guppyId: string,
    remoraId: string,
    length: string,
    height: string,
    weightMetricTons: string,
    statusUpdated: string
}

const renderCellContent = (key: string, value: any) => {
    switch (key) {
        case 'cargoStatus':
            const progress = statusProgressMap[value] ?? 0;
            return (
                <div className="status-cell">
                    <div style={{ fontSize: '8px', color: 'rgba(102, 112, 133, 1)' }}>{value}</div>
                    <Progress value={progress} style={{ border: '0.7px solid rgba(234, 236, 240, 1)', width: '154px', height: '9px' }} />
                </div>
            );
        case 'statusUpdated':
            const utcDate = moment.utc(value, 'MMM DD,YYYY HH:mm A');
            const cstDate = utcDate.tz('America/Chicago');
            const formattedDate = cstDate.format('MMM DD,YYYY hh:mm A');
            return <div>{formattedDate}</div>;
        default:
            return <div>{value}</div>;
    }
};

const columnDefs: Array<{ key: keyof cargo, label: string, renderCell?: ({ row }: { row: { getValue: (key: keyof cargo) => string } }) => JSX.Element }> = [
    { key: 'packingListId', label: 'PL ID' },
    { key: 'cargoType', label: 'TYPE' },
    { key: 'cargoSubType', label: 'SUB TYPE' },
    {
        key: 'cargoStatus',
        label: 'CARGO STATUS',
        renderCell: ({ row }) => renderCellContent('cargoStatus', row.getValue('cargoStatus'))
    },
    {
        key: 'statusUpdated',
        label: 'STATUS UPDATED (CST)',
        renderCell: ({ row }) => renderCellContent('statusUpdated', row.getValue('statusUpdated'))
    },
    { key: 'projectName', label: 'PROJECT NAME' },
    { key: 'projectNumber', label: 'PROJECT NUMBER' },
    { key: 'customer',label:'CUSTOMER'},
    { key: 'voyage', label: 'VOYAGE' },
    { key: 'cargoId', label: 'CARGO ID' },
    { key: 'barcode', label: 'BARCODE' },
    { key: 'guppyId', label: 'GUPPY ID' },
    { key: 'remoraId', label: 'REMORA ID' },
    { key: 'length', label: 'LENGTH' },
    { key: 'height', label: 'HEIGHT' },
    { key: 'weightMetricTons', label: 'WEIGHT (MT)' }
];

function CargoesList() {
    const columns: ColumnDef<cargo>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }: { row: any }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        ...columnDefs.map(({ key, label, renderCell }) => ({
            accessorKey: key,
            header: ({ column }: { column: any }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    style={{
                        color: 'rgba(102, 112, 133, 1)',
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bolder'
                    }}
                >
                    {label}
                    <ArrowDown style={{ width: '15px', height: '15px' }} />
                </Button>
            ),
            cell: renderCell
                ? renderCell
                : ({ row }: { row: any }) => <div className="capitalize">{row.getValue(key)}</div>,
        })),
        {
            id: 'moreVertical',
            header: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='vertical_DropDown'>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" style={{height:'200px',overflowY:'auto'}}>
                            {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
            ),
            cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='vertical_DropDown'>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ width: '100px', height: 'fit-content', padding: '1px',color:'rgba(9, 9, 11, 1)'}}>
                        <DropdownMenuItem className='dropdown_item'>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='dropdown_item'>View</DropdownMenuItem>
                        <DropdownMenuItem className='dropdown_item'>Make a Copy</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='dropdown_item'>Delete
                            <DropdownMenuShortcut style={{color:'rgba(9, 9, 11, 1)',display:'flex',flexDirection:'row'}}>⌘
                                <Delete style={{
                                    width:'16px',
                                    height:'16px',
                                    color:'rgba(9, 9, 11, 1)'
                                    }}
                                />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableHiding: false,
        }
    ]
    const [showGenerateReport, setShowGenerateReport] = React.useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const handleShowGenerateReport =() => {
        setShowGenerateReport(true);
    }
    const CloseShowGenerateReport = () => {
        setShowGenerateReport(false);
    }
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        customer: false,
        voyage: false,
        cargoId: false,
        barcode: false,
        guppyId: false,
        remoraId: false,
        length: false,
        height: false,
        weightMetricTons: false,
    });
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const dropdownKeys = columnDefs
    .filter(col => !table.getColumn(col.key)?.getIsVisible())
    .map(col => col.key);
    console.log("++++++++++++++++++++++++++++++",dropdownKeys);

    return (
        <div className="cargoeslist_main_div">
            <div className="cargoeslist_sub_div">
                <Button onClick={handleShowGenerateReport} style={{
                    background: 'none',
                    color: showGenerateReport ? 'rgba(52, 64, 84, 1)':'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '0px',
                    width: '115px',
                    fontWeight: showGenerateReport ? 'bold':'normal'
                }}>
                    <Sheet style={{ color: showGenerateReport ? 'rgba(52, 64, 84, 1)':'rgba(181, 187, 198, 1)' }} />Generate Report
                </Button>
                <Separator orientation="vertical" style={{
                    height: '30px',
                    backgroundColor: 'rgba(234, 236, 240, 1)',
                    marginTop: '5px'
                }}
                />
                <Button style={{
                    background: 'none',
                    color: 'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '0px',
                    width: '115px',
                    fontWeight: 'normal'
                }}
                >
                    <Link style={{ color: 'rgba(181, 187, 198, 1)' }} />
                    Assign to Voyage
                </Button>
                <Separator orientation="vertical" style={{
                    height: '30px',
                    backgroundColor: 'rgba(234, 236, 240, 1)',
                    marginTop: '5px'
                }}
                />
                <Button style={{
                    background: 'none',
                    color: 'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '0px',
                    width: '80px',
                    fontWeight: 'normal'
                }}
                >
                    <Import style={{ color: 'rgba(181, 187, 198, 1)' }} /><pre> </pre>
                    Archive
                </Button>
                <div className="search-input-container">
                    <Search className="search-icon" />
                    <Input className="search-input" placeholder="Search..." />
                </div><pre> </pre>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                            <Button style={{
                            border: '0.7px solid rgba(226, 232, 240, 1)',
                            background: 'rgba(255, 255, 255, 1)',
                            borderRadius: '6px',
                            color: 'rgba(52, 64, 84, 1)',
                            fontSize: '10px',
                            padding: '7.68px, 12.28px, 7.68px, 12.28px',
                            fontWeight: 'normal'
                            }}
                        >
                            <ListFilter style={{
                                marginRight: '5px',
                                width: '11px',
                                height: '11px'
                                }}
                            />
                            Filters
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{height:'200px',overflowY:'auto'}}>
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <pre> </pre> 
                <Button style={{
                    border: '0.7px solid rgba(226, 232, 240, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: '7.68px, 12.28px, 7.68px, 12.28px',
                    fontSize: '10px',
                    color: 'rgba(52, 64, 84, 1)',
                    borderRadius: '6px',
                    fontWeight:'normal'
                }}
                >
                    <Import style={{
                        marginRight: '5px',
                        width: '15px',
                        height: '15px'
                    }}
                    />
                    Import
                </Button><pre> </pre>
                <Button style={{
                    border: '0.7px solid rgba(226, 232, 240, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: '7.68px, 12.28px, 7.68px, 12.28px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: 'rgba(52, 64, 84, 1)',
                    fontWeight:'normal'
                }}
                >
                    <DownloadCloud style={{
                        marginRight: '5px',
                        width: '15px',
                        height: '15px'
                    }}
                    />
                    Export PDF
                </Button>
            </div>
            <div className="cargoeslist_table_div">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='table_header'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='table_row'>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ):
                            (
                                <TableRow>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <div style={{backgroundColor:'rgba(252, 252, 253, 1)',width:'100%'}}>
                <Pagination table={table}/>
            </div>
            {showGenerateReport && <GenerateReport onClose={CloseShowGenerateReport}/>}
        </div>
    )
}

export default CargoesList;