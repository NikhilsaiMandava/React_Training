import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Plus, ListFilter, ArrowDown, MoreVertical, Delete } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateVoyage from './CreateVoyage/CreateVoyage';
import { Progress } from '@/components/ui/progress';
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
import Pagination from '../Common/Pagination/Pagination.tsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteCard from './DeleteBox/DeleteCard.tsx';
import EditVoyage from './EditVoyage/EditVoyage.tsx';
import './Voyages.css';
import ViewVoyage from './ViewVoyage/ViewVoyage.tsx';

const statusProgressMap: Record<string, number> = {
    "Loading": 40,
    "sailing": 60,
    "Planning": 0,
    "Discharging": 80,
    "Completed": 100,
};
export const data: voyage[] = [
    {
        customer: 'SEAN',
        voyage: "Brooke",
        voyageStatus: "Completed",
        loadingPortCountry: "India",
        loadingPort: "VZG",
        loadingTerminal: "B2",
        loadingStevedoring: "123BX",
        dischargePortCountry: "USA",
        dischargePort: "TEXAS",
        dischargePortTerminal: "S1",
        dischargeStevedoring: "123456n",
        receiver: "Benz",
        shipper: "Tata",
        calculatedETA: "June 4,2024 1:21 AM",
        vessel: "Steel",
        name: "Conf",
        image: "",
        imo: "23456789",
        mmsi: "MNS123",
        vesselFlagState: "",
        portOfRegistry: "VZG",
        owners: "BBTL",
        grt: "BZ",
        nrt: "BIK",
        breadth: "22.9",
        depth: "80",
        speed: "40",
        numberOfCranes: "",
        cranesMounted: "",
        craneSWL: "",
        statementsOfFacts: ""
    }
]
export type voyage = {
    customer: string,
    voyage: string,
    voyageStatus: "Planning" | "Loading" | "Sailing" | "Discharging" | "Completed",
    loadingPortCountry: string,
    loadingPort: string,
    loadingTerminal: string,
    loadingStevedoring: string,
    dischargePortCountry: string,
    dischargePort: string,
    dischargePortTerminal: string,
    dischargeStevedoring: string,
    receiver: string,
    shipper: string,
    calculatedETA: string,
    vessel: string,
    name: string,
    image: string,
    imo: string,
    mmsi: string,
    vesselFlagState: string,
    portOfRegistry: string,
    owners: string,
    grt: string,
    nrt: string,
    breadth: string,
    depth: string,
    speed: string,
    numberOfCranes: string,
    cranesMounted: string,
    craneSWL: string,
    statementsOfFacts: string
}
const renderCellContent = (key: string, value: any) => {
    switch (key) {
        case 'voyageStatus':
            const progress = statusProgressMap[value] ?? 0;
            return (
                <div className="status-cell">
                    <div style={{ fontSize: '9px', color: 'rgba(102, 112, 133, 1)' }}>{value}</div>
                    <Progress value={progress} style={{ border: '0.7px solid rgba(234, 236, 240, 1)', width: '10vw', height: '1.5vh' }} />
                </div>
            );
        case 'calculatedETA':
            const utcDate = moment.utc(value, 'MMM DD,YYYY HH:mm A');
            const cstDate = utcDate.tz('America/Chicago');
            const formattedDate = cstDate.format('MMM DD,YYYY hh:mm A');
            return <div className='status-updated'>{formattedDate}</div>;
        default:
            return <div className="status-updated">{value}</div>;
    }
};
const columnDefs: Array<{ key: keyof voyage, label: string, renderCell?: ({ row }: { row: { getValue: (key: keyof voyage) => string } }) => JSX.Element }> = [
    { key: 'voyage', label: 'Voyage' },
    { key: 'customer', label: 'Vessel Name' },
    {
        key: 'voyageStatus',
        label: 'CARGO STATUS',
        renderCell: ({ row }) => renderCellContent('voyageStatus', row.getValue('voyageStatus'))
    },
    { key: 'loadingPortCountry', label: 'Loading Country' },
    { key: 'loadingPort', label: 'Loading Port' },
    { key: 'dischargePortCountry', label: 'Discharge Country' },
    { key: 'dischargePort', label: 'Discharge Port' },
    { key: 'receiver', label: 'Receiver' },
    { key: 'shipper', label: 'Shipper' },
    {
        key: 'calculatedETA',
        label: 'ETA',
        renderCell: ({ row }) => renderCellContent('calculatedETA', row.getValue('calculatedETA'))
    },
    { key: 'vessel', label: 'Vessel' },
    { key: 'name', label: 'Name' },
    { key: 'image', label: 'Image' },
    { key: 'mmsi', label: 'MMSI' },
    { key: 'vesselFlagState', label: 'Vessel Flag State' },
    { key: 'portOfRegistry', label: 'Port Of Registry' },
    { key: 'owners', label: 'Owner(s)' },
    { key: 'grt', label: 'G.R.T' },
    { key: 'nrt', label: 'N.R.T' },
    { key: 'breadth', label: 'Breadth' },
    { key: 'depth', label: 'Depth' },
    { key: 'speed', label: 'Speed' },
    { key: 'numberOfCranes', label: 'Number Of Cranes' },
    { key: 'cranesMounted', label: 'Cranes Mounted' },
    { key: 'craneSWL', label: 'Crane SWL' },
    { key: 'statementsOfFacts', label: 'Statements Of Facts' }
];
function Voyages() {
    const [showCreateVoyage, setShowCreateVoyage] = React.useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [showDeleteCreateVoyage, setshowDeleteCreateVoyage] = React.useState(false);
    const [showEditVoyage, setshowEditVoyage] = React.useState(false);
    const [voyage, setVoyage] = React.useState<voyage | null>(null);
    const [isViewing, setIsViewing] = React.useState(false);
    const handleViewClick = (voyage: voyage) => {
        setVoyage(voyage);
        setIsViewing(true);
    }
    const handleCloseView = () => {
        setIsViewing(false);
        setVoyage(null);
    };
    const handleshowEditVoyage = (voyage: voyage) => {
        setVoyage(voyage);
        setshowEditVoyage(true);
    }
    const CloseshowEditVoyage = () => {
        setshowEditVoyage(false);
    }
    const handleShowCreateVoyage = () => {
        setShowCreateVoyage(true);
    }
    const CloseShowCreateVoyage = () => {
        setShowCreateVoyage(false);
    }
    const handleshowDeleteCreateVoyage = (voyage: voyage) => {
        setVoyage(voyage);
        setshowDeleteCreateVoyage(true);
    }
    const CloseshowDeleteCreateVoyage = () => {
        setshowDeleteCreateVoyage(false);
    }
    const columns: ColumnDef<voyage>[] = [
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
                        padding: '0%'
                    }}
                >
                    {label}
                    <ArrowDown style={{ width: 'fit-Content', height: '2.5vh' }} />
                </Button>
            ),
            cell: renderCell
                ? renderCell
                : ({ row }: { row: any }) => <div className="voyages_capitalize">{row.getValue(key)}</div>,
        })),
        {
            id: 'moreVertical',
            header: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='voyages_vertical_DropDown'>
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
                    <DropdownMenuTrigger asChild className='voyages_vertical_DropDown'>
                        <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => row.toggleSelected(true)}>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ width: '5vw', height: 'fit-content', padding: '1%', color: 'rgba(9, 9, 11, 1)' }}>
                        <DropdownMenuItem className='voyages_dropdown_item' onClick={() => handleshowEditVoyage(row.original)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='voyages_dropdown_item' onClick={() => handleViewClick(row.original)}>View</DropdownMenuItem>
                        <DropdownMenuItem className='voyages_dropdown_item'>Make a Copy</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='voyages_dropdown_item' onClick={() => handleshowDeleteCreateVoyage(row.original)}>Delete
                            <DropdownMenuShortcut style={{ color: 'rgba(9, 9, 11, 1)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <span>⌘</span>
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
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        receiver: false,
        shipper: false,
        calculatedETA: false,
        vessel: false,
        name: false,
        image: false,
        imo: false,
        mmsi: false,
        vesselFlagState: false,
        portOfRegistry: false,
        owners: false,
        grt: false,
        nrt: false,
        breadth: false,
        depth: false,
        speed: false,
        numberOfCranes: false,
        cranesMounted: false,
        craneSWL: false,
        statementsOfFacts: false
    });
    const [rowSelection, setRowSelection] = React.useState({});
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
        <div>
            {isViewing && voyage ?
                (
                    <ViewVoyage onClose={handleCloseView} voyage={voyage}/>
                ) :
                (
                    <div className="voyage_main_div">
                        <div className="voyage_searchbar_div">
                            <div>
                                <span style={{ color: 'rgba(16, 24, 40, 1)', fontWeight: '600' }}>
                                    Voyage List
                                </span>
                            </div>
                            <div className="voyage_search_icon_input_div">
                                <Search className="voyage_search_icon" />
                                <Input className="voyage_search_input" placeholder="Search..." />
                                <Button variant='outline' style={{
                                    border: '0.7px solid rgba(208, 213, 221, 1)',
                                    borderRadius: '6px',
                                    color: 'rgba(52, 64, 84, 1)',
                                    fontSize: '10px',
                                    fontWeight: 'normal',
                                    marginRight: '2%',
                                    padding: '1.5% 1.5%'
                                }}
                                >
                                    <ListFilter style={{
                                        marginRight: '5%',
                                        width: '1vw',
                                        height: '5vh',
                                    }}
                                    />
                                    Filters
                                </Button>
                                <Button onClick={handleShowCreateVoyage} style={{
                                    border: '0.7px solid rgba(16, 24, 40, 1)',
                                    background: 'rgba(16, 24, 40, 1)',
                                    borderRadius: '6px',
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontSize: '10px',
                                    padding: '1.5% 1.5%',
                                    fontWeight: 'normal',
                                }}
                                >
                                    <Plus style={{
                                        marginRight: '5px',
                                        width: '1vw',
                                        height: '5vh'
                                    }}
                                    />
                                    Create Voyage
                                </Button>
                            </div>
                            {showCreateVoyage && <CreateVoyage onClose={CloseShowCreateVoyage} />}
                        </div>
                        <div className='voyages_table_div'>
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id} className='voyages_table_header'>
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
                                                    <TableCell key={cell.id} className='voyages_table_row'>
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
                        <div style={{ backgroundColor: 'rgba(252, 252, 253, 1)' }}>
                            <Pagination table={table} />
                        </div>
                        {showDeleteCreateVoyage && <DeleteCard onClose={CloseshowDeleteCreateVoyage} voyage={voyage} />}
                        {showEditVoyage && <EditVoyage onClose={CloseshowEditVoyage} voyage={voyage} />}
                    </div>
                )
            }
        </div>
    )
}

export default Voyages;