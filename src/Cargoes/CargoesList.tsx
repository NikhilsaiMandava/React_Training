import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Import, Link2, Sheet, Search, ListFilter, DownloadCloud, ArrowDown, MoreVertical, Delete, ChevronDown, ArrowUp } from "lucide-react";
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
    // DropdownMenuLabel,
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
import ArchiveCargoCard from './ArchiveCargoCard/ArchiveCargoCard.tsx';
import AssignToVoyage from './AssignToVoyage/AssignToVoyage.tsx';
import { useOutletContext } from "react-router-dom";
// import axios from 'axios';

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
        cargoStatus: "Delivered",
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
                    <div style={{ fontSize: '9px', color: 'rgba(102, 112, 133, 1)' }}>{value}</div>
                    <Progress value={progress} style={{ border: '0.7px solid rgba(234, 236, 240, 1)', width: '10vw', height: '1.5vh' }} />
                </div>
            );
        case 'statusUpdated':
            const utcDate = moment.utc(value, 'MMM DD,YYYY HH:mm A');
            const cstDate = utcDate.tz('America/Chicago');
            const formattedDate = cstDate.format('MMM DD,YYYY hh:mm A');
            return <div className='status-updated'>{formattedDate}</div>;
        default:
            return <div className="status-updated">{value}</div>;
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
    { key: 'customer', label: 'CUSTOMER' },
    { key: 'voyage', label: 'VOYAGE' },
    { key: 'cargoId', label: 'CARGO ID' },
    { key: 'barcode', label: 'BARCODE' },
    { key: 'guppyId', label: 'GUPPY ID' },
    { key: 'remoraId', label: 'REMORA ID' },
    { key: 'length', label: 'LENGTH' },
    { key: 'height', label: 'HEIGHT' },
    { key: 'weightMetricTons', label: 'WEIGHT (MT)' }
];
type SortDirection = 'asc' | 'dsc';
type ContextType = {
    onEditClick: (cargo: cargo) => void;
};
function CargoesList() {
    const { onEditClick } = useOutletContext<ContextType>();
    const [showGenerateReport, setShowGenerateReport] = React.useState(false);
    const [showArchiveCreateCargo, setShowArchiveCreateCargo] = React.useState(false);
    const [showAssignToVoyage, setShowAssignToVoyage] = React.useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [selectedFields, setSelectedFields] = React.useState<string | null>(null);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
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
                        fontWeight: 'bolder',
                        width: '100%',
                        padding:'0%'
                    }}
                >
                    {label}
                    <ArrowDown style={{ width: 'fit-Content', height: '2.5vh' }} />
                </Button>
            ),
            cell: renderCell
                ? renderCell
                : ({ row }: { row: any }) => <div className="cargoeslist_capitalize">{row.getValue(key)}</div>,
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
                    <DropdownMenuContent align="end" style={{ overflowY: 'auto', maxHeight: '60vh' }}>
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
            cell: ({ row }: { row: any }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='vertical_DropDown'>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ width: '5vw', height: 'fit-content', padding: '1%', color: 'rgba(9, 9, 11, 1)' }}>
                        <DropdownMenuItem className='dropdown_item' onClick={() => onEditClick(row.original)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='dropdown_item'>View</DropdownMenuItem>
                        <DropdownMenuItem className='dropdown_item'>Make a Copy</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='dropdown_item'>Delete
                            <DropdownMenuShortcut style={{ color: 'rgba(9, 9, 11, 1)', display: 'flex', flexDirection: 'row' }}>⌘
                                <Delete style={{
                                    width: 'fit-Content',
                                    height: '2.5vh',
                                    color: 'rgba(9, 9, 11, 1)'
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
    const sortAllColumns = (direction: SortDirection) => {
        const sortDirection = direction === 'asc' ? 'asc' : 'desc';
        const newSorting = columns
            .filter(column => (column as any).accessorKey)
            .map(column => ({
                id: (column as any).accessorKey,
                desc: sortDirection === 'desc'
            }));
        setSorting(newSorting);
    };
    const handleFieldCheck = (field: string) => {
        setSelectedFields((prevField) => (prevField === field ? null : field));
    };
    const handleClearFilters = () => {
        setSelectedFields('');
    };
    const handleShowGenerateReport = () => {
        setShowGenerateReport(true);
    }
    const CloseShowGenerateReport = () => {
        setShowGenerateReport(false);
    }
    const handleShowArchiveCreateCargo = () => {
        setShowArchiveCreateCargo(true);
    }
    const CloseShowArchiveCreateCargo = () => {
        setShowArchiveCreateCargo(false);
    }
    const handleShowAssignToVoyage = () => {
        setShowAssignToVoyage(true);
    }
    const CloseShowAssignToVoyage = () => {
        setShowAssignToVoyage(false);
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
    const [rowSelection, setRowSelection] = React.useState({});
    const isAnyRowSelected = Object.keys(rowSelection).length > 0;
    const selectedRows = Object.keys(rowSelection).length;
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

    return (
        <div className="cargoeslist_main_div">
            <div className="cargoeslist_sub_div">
                <Button onClick={handleShowGenerateReport} style={{
                    background: 'none',
                    color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)' : 'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '0.25%',
                    width: 'fit-Content',
                    fontWeight: isAnyRowSelected ? 'bold' : 'normal'
                }}
                >
                    <Sheet style={{ color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)' : 'rgba(181, 187, 198, 1)' }} />
                    Generate Report
                </Button>
                <Separator orientation="vertical" style={{
                    height: '5vh',
                    backgroundColor: 'rgba(234, 236, 240, 1)',
                    marginTop: '0.5%'
                }}
                />
                <Button onClick={handleShowAssignToVoyage} style={{
                    background: 'none',
                    color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)' : 'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '0.25%',
                    width: 'fit-Content',
                    fontWeight: isAnyRowSelected ? 'bold' : 'normal'
                }}
                >
                    <Link2 style={{ color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)' : 'rgba(181, 187, 198, 1)', transform: 'rotate(135deg)' }} />
                    Assign to Voyage
                </Button>
                <Separator orientation="vertical" style={{
                    height: '5vh',
                    backgroundColor: 'rgba(234, 236, 240, 1)',
                    marginTop: '0.5%'
                }}
                />
                <Button onClick={handleShowArchiveCreateCargo} style={{
                    background: 'none',
                    color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)' : 'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '0.25%',
                    width: 'fit-Content',
                    fontWeight: isAnyRowSelected ? 'bold' : 'normal'
                }}
                >
                    <Import style={{ color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)' : 'rgba(181, 187, 198, 1)' }} /><pre> </pre>
                    Archive
                </Button>
                <div className="search-input-container">
                    <Search className="search-icon" />
                    <Input className="search-input" placeholder="Search..." />
                </div><pre> </pre>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='carges_list_filter_dropdown'>
                        <Button style={{
                            border: '0.7px solid rgba(226, 232, 240, 1)',
                            background: 'rgba(255, 255, 255, 1)',
                            borderRadius: '6px',
                            color: 'rgba(52, 64, 84, 1)',
                            fontSize: '10px',
                            padding: '1% 1.5%',
                            fontWeight: 'normal'
                        }}
                        >
                            <ListFilter style={{
                                marginRight: '1%',
                                width: '1vw',
                                height: '4vh',
                            }}
                            />
                            Filters
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ overflowY: 'auto', maxWidth: '10vw' }}>
                        <DropdownMenuItem className='dropdown-menu-item'
                            onClick={() => sortAllColumns('asc')}
                        >
                            <ArrowUp style={{ width: 'fit-Content', height: '2.5vh' }} />
                            ASC
                        </DropdownMenuItem>
                        <DropdownMenuItem className='dropdown-menu-item'
                            onClick={() => sortAllColumns('dsc')}
                        >
                            <ArrowDown style={{ width: 'fit-Content', height: '2.5vh' }} />
                            DSC
                        </DropdownMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='carges_list_filter_dropdown_selection'>
                                <Button variant='outline' style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1% 1%',
                                    border: 'none',
                                }}
                                >
                                    <span style={{ fontSize: '10px', color: 'rgba(15, 23, 42, 1)' }}>
                                        {selectedFields ? selectedFields : 'Select any field'}
                                    </span>
                                    <ChevronDown style={{ color: '1px solid rgba(77, 77, 77, 1)', width: 'fit-Content', height: '2.5vh' }} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent style={{ width: 'fit-Content', height: '50vh', overflowY: 'auto' }}>
                                {table.getAllColumns().filter((column) => column.id !== 'select').map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={selectedFields === column.id}
                                            onCheckedChange={() =>
                                                handleFieldCheck(column.id)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className='carges_list_filter_dropdown_input' style={{
                            borderTop: '0.6px solid rgba(228, 228, 231, 1)',
                            borderBottom: '0.6px solid rgba(228, 228, 231, 1)',
                            padding: '0%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        >
                            <Search />
                            <Input className='dropdown_search_input_filter' />
                        </div>
                        <Button variant='outline' onClick={handleClearFilters} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            border: 'none',
                            width: '100%',
                            padding: '1% 2%'
                        }}
                        >
                            Clear Filters
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
                <pre> </pre>
                <Button style={{
                    border: '0.7px solid rgba(226, 232, 240, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: '1% 1.5%',
                    fontSize: '10px',
                    color: 'rgba(52, 64, 84, 1)',
                    borderRadius: '6%',
                    fontWeight: 'normal'
                }}
                >
                    <Import style={{
                        marginRight: '0.5%',
                        width: '1vw',
                        height: '5vh'
                    }}
                    />
                    Import
                </Button>
                <pre> </pre>
                <Button style={{
                    border: '0.7px solid rgba(226, 232, 240, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: '1% 1.5%',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: 'rgba(52, 64, 84, 1)',
                    fontWeight: 'normal'
                }}
                >
                    <DownloadCloud style={{
                        marginRight: '0.5%',
                        width: '1vw',
                        height: '5vh'
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
                        ) :
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
            <div style={{ backgroundColor: 'rgba(252, 252, 253, 1)', width: '100%' }}>
                <Pagination table={table} />
            </div>
            {showGenerateReport && <GenerateReport onClose={CloseShowGenerateReport} />}
            {showArchiveCreateCargo && <ArchiveCargoCard selectedRows={selectedRows} onClose={CloseShowArchiveCreateCargo} />}
            {showAssignToVoyage && <AssignToVoyage onClose={CloseShowAssignToVoyage} />}
        </div>
    )
}

export default CargoesList;