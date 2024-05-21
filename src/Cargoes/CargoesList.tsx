import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Import, Link, Sheet,Search,ListFilter,DownloadCloud,ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import './CargoesList.css';

export const data:cargo[] =[
    {
        customer : "VG",
        packingListId : "123789",
        cargoType: "SG145",
        cargoSubType : "STLR LOWBED",
        cargoStatus : "Load Ready",
        projectName : "Sample Project 1",
        projectNumber : "1234567",
        voyage : "129028",
        cargoId : "896753429",
        barcode : "11223344",
        guppyId : "903322",
        remoraId : "909378",
        length : "22.00",
        height : "15.00",
        weightMetricTons : "SGRE"
    },
    {
        customer : "Nikhil",
        packingListId : "1234567",
        cargoType: "SG1453",
        cargoSubType : "STLR BED",
        cargoStatus : "Onboard",
        projectName : "Sample Project 1",
        projectNumber : "1234567",
        voyage : "129028",
        cargoId : "896753429",
        barcode : "11223344",
        guppyId : "903322",
        remoraId : "909378",
        length : "22.00",
        height : "15.00",
        weightMetricTons : "SGRE"
    }
]

type CargoStatus = keyof typeof statusProgressMap;

const statusProgressMap = {
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
    customer : string,
    packingListId : string,
    cargoType: string,
    cargoSubType : string,
    cargoStatus : "Load Ready"|"Onboard"|"Discharged"|"Loaded Out"|"Origin"|"Distribution In"|"Distribution Out"|"Delivered",
    projectName : string,
    projectNumber : string,
    voyage : string,
    cargoId : string,
    barcode : string,
    guppyId : string,
    remoraId : string,
    length : string,
    height : string,
    weightMetricTons : string
}

export const columns:ColumnDef<cargo>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "packingListId",
        header: ({column}) => {
            return (
                <Button variant="ghost" 
                    onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}
                    style={{
                        color:'rgba(102, 112, 133, 1)',
                        fontSize:'10px',
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    PL ID
                    <ArrowDown style={{width:'15px',height:'15px'}}/>
                </Button>
            )
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("packingListId")}</div>
        ),
    },
    {
        accessorKey: "cargoType",
        header: ({column}) => {
            return (
                <Button variant="ghost" 
                    onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}
                    style={{
                        color:'rgba(102, 112, 133, 1)',
                        fontSize:'10px',
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    TYPE
                    <ArrowDown style={{width:'15px',height:'15px'}}/>
                </Button>
            )
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("cargoType")}</div>
        ),
    },
    {
        accessorKey: "cargoSubType",
        header: ({column}) => {
            return (
                <Button variant="ghost" 
                    onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}
                    style={{
                        color:'rgba(102, 112, 133, 1)',
                        fontSize:'10px',
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    SUB TYPE
                    <ArrowDown style={{width:'15px',height:'15px'}}/>
                </Button>
            )
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("cargoSubType")}</div>
        ),
    },
    {
        accessorKey: "cargoStatus",
        header: ({column}) => {
            return (
                <Button variant="ghost" 
                    onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}
                    style={{
                        color:'rgba(102, 112, 133, 1)',
                        fontSize:'10px',
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    CARGO STATUS
                    <ArrowDown style={{width:'15px',height:'15px'}}/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue<string>("cargoStatus");
            const progress = statusProgressMap[status as CargoStatus] ?? 0;
            return (
                <div className="status-cell">
                    <div style={{fontSize:'8px',color:'rgba(102, 112, 133, 1)'}}>{status}</div>
                    <Progress value={progress} style={{border:'0.7px solid rgba(234, 236, 240, 1)',width:'154px',height:'9px'}}/>
                </div>
            );
        }
    },
]

function CargoesList() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
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
    })
    return (
        <div className="cargoeslist_main_div">
            <div className="cargoeslist_sub_div">
                <Button style={{
                    background:'none',
                    color:'rgba(52, 64, 84, 1)',
                    fontSize:'10px',
                    padding:'0px',
                    width:'115px'
                    }}>
                    <Sheet />Generate Report
                </Button>
                <Separator orientation="vertical" style={{
                    height:'30px',
                    backgroundColor:'rgba(234, 236, 240, 1)',
                    marginTop:'5px'
                    }}
                />
                <Button style={{
                    background:'none',
                    color:'rgba(52, 64, 84, 1)',
                    fontSize:'10px',
                    padding:'0px',
                    width:'115px'
                    }}
                >
                    <Link style={{color:'rgba(181, 187, 198, 1)'}} />
                    Assign to Voyage
                </Button>
                <Separator orientation="vertical" style={{
                    height:'30px',
                    backgroundColor:'rgba(234, 236, 240, 1)',
                    marginTop:'5px'
                    }}
                />
                <Button style={{
                    background:'none',
                    color:'rgba(52, 64, 84, 1)',
                    fontSize:'10px',
                    padding:'0px',
                    width:'80px'
                    }}
                >
                    <Import style={{color:'rgba(181, 187, 198, 1)'}}/><pre> </pre>
                    Archive
                </Button>
                <div className="search-input-container">
                    <Search className="search-icon" />
                    <Input className="search-input" placeholder="Search..." />
                </div><pre> </pre>
                <Button style={{
                    border:'0.7px solid rgba(226, 232, 240, 1)',
                    background:'rgba(255, 255, 255, 1)',
                    borderRadius:'6px',
                    color:'rgba(52, 64, 84, 1)',
                    fontSize:'10px',
                    padding:'7.68px, 12.28px, 7.68px, 12.28px'
                    }}
                >
                    <ListFilter style={{
                        marginRight:'5px',
                        width:'11px',
                        height:'11px'
                        }}
                    />
                    Filters
                </Button><pre> </pre>
                <Button style={{
                    border:'0.7px solid rgba(226, 232, 240, 1)',
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    padding:'7.68px, 12.28px, 7.68px, 12.28px',
                    fontSize:'10px',
                    color:'rgba(52, 64, 84, 1)',
                    borderRadius:'6px'
                    }}
                >
                    <Import style={{
                        marginRight:'5px',
                        width:'15px',
                        height:'15px'
                        }}
                    />
                    Import
                </Button><pre> </pre>
                <Button style={{
                    border:'0.7px solid rgba(226, 232, 240, 1)',
                    backgroundColor:'rgba(255, 255, 255, 1)',
                    padding:'7.68px, 12.28px, 7.68px, 12.28px',
                    borderRadius:'6px',
                    fontSize:'10px',
                    color:'rgba(52, 64, 84, 1)'
                    }}
                >
                    <DownloadCloud style={{
                        marginRight:'5px',
                        width:'15px',
                        height:'15px'
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
                                    <TableHead key={header.id}>
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
                                <TableCell key={cell.id}>
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
        </div>
    )
}

export default CargoesList;