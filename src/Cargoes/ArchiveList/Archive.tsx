import * as React from 'react';
import './Archive.css';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet,Link2,Search,ArrowDown,Delete,MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
import Pagination from '../../Common/Pagination.tsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Restore from '../Restore/Restore.tsx';
import { useOutletContext } from 'react-router-dom';

export const data: cargo[] = [
    {
        customer: "SMTP",
        packingListId: "BG123",
        cargoType: "SG1405",
        cargoSubType: "STLR",
        cargoStatus: "Origin",
        projectName: "Sample",
        projectNumber: "907746",
        voyage: "1109",
        cargoId: "873",
        barcode: "BGQO129",
        guppyId: "GID5590",
        remoraId: "909378",
        length: "22.00",
        height: "15.00",
        weightMetricTons: "SGRE",
        statusUpdated: "Jan 26,2024 13:21 PM"
    },
    {
        customer: "ABCSEA",
        packingListId: "MNO789",
        cargoType: "SG14312",
        cargoSubType: "STLR NO",
        cargoStatus: "Distribution Out",
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
                    <Progress value={progress} style={{ border: '0.7px solid rgba(234, 236, 240, 1)', width: '10vw', height: '1.5vh' }} />
                </div>
            );
        case 'statusUpdated':
            const utcDate = moment.utc(value, 'MMM DD,YYYY HH:mm A');
            const cstDate = utcDate.tz('America/Chicago');
            const formattedDate = cstDate.format('MMM DD,YYYY hh:mm A');
            return <div className="status-updated">{formattedDate}</div>;
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
type ContextType = {
    onEditClick: (cargo: cargo) => void;
};
function Archive() {
    const { onEditClick } = useOutletContext<ContextType>();
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
                        width:'100%',
                        padding:'0%'
                    }}
                >
                    {label}
                    <ArrowDown style={{ width: 'fit-Content', height: '2.5vh' }} />
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
                        <DropdownMenuContent align="end" style={{overflowY:'auto',maxHeight:'350px',translate:'transform(-50%,-50%)'}}>
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
            cell: ({row}:{row:any}) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='vertical_DropDown'>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ width: '10vh', height: 'fit-content', padding: '1px',color:'rgba(9, 9, 11, 1)'}}>
                        <DropdownMenuItem className='dropdown_item' onClick={() => onEditClick(row.original)}>Edit</DropdownMenuItem>
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
    const [showRestore, setShowRestore] = React.useState(false);
    const [rowSelection, setRowSelection] = React.useState({});
    const isAnyRowSelected = Object.keys(rowSelection).length > 0;
    const selectedRows = Object.keys(rowSelection).length;
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [selectedFields, setSelectedFields] = React.useState<string | null>(null);
    const handleFieldCheck = (field: string) => {
        setSelectedFields((prevField) => (prevField === field ? null : field));
    };
    const handleShowGenerateReport =() => {
        setShowGenerateReport(true);
    }
    const CloseShowGenerateReport = () => {
        setShowGenerateReport(false);
    }
    const handleShowRestore =() => {
        setShowRestore(true);
    }
    const CloseShowRestore = () => {
        setShowRestore(false);
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
        <div className="archive_list_main_div">
            <div className='archive_list_sub_div'>
                <Button onClick={handleShowGenerateReport} style={{
                    background: 'none',
                    color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)':'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '1%',
                    width: 'fit-Content',
                    fontWeight: isAnyRowSelected ? 'bold':'normal'
                    }}
                >
                    <Sheet style={{ color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)':'rgba(181, 187, 198, 1)',padding:'1%' }} />
                    Generate Report
                </Button>
                <Separator orientation="vertical" style={{
                    height: '5vh',
                    backgroundColor: 'rgba(234, 236, 240, 1)',
                    marginTop: '0.5%'
                    }}
                />
                <Button onClick={handleShowRestore} style={{
                    background: 'none',
                    color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)':'rgba(52, 64, 84, 1)',
                    fontSize: '10px',
                    padding: '1%',
                    width: 'fit-Content',
                    fontWeight: isAnyRowSelected ? 'bold':'normal'
                    }}
                >
                    <Link2 style={{ color: isAnyRowSelected ? 'rgba(52, 64, 84, 1)':'rgba(181, 187, 198, 1)',transform:'rotate(135deg)',padding:'1%'}} />
                    Restore
                </Button>
                <div className="archive-search-input-container">
                    <Search className="archive-search-icon" />
                    <Input className="archive-search-input" placeholder="Search..." />
                </div>
            </div>
            <div className='archive-list-table-div'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='archive_table_header'>
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
                                        <TableCell key={cell.id} className='archive_table_row'>
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
            {showRestore && <Restore onClose={CloseShowRestore} selectedRows={selectedRows}/>}
            <div style={{backgroundColor:'rgba(252, 252, 253, 1)',width:'100%'}}>
                <Pagination table={table}/>
            </div>
        </div>
    )
}

export default Archive;