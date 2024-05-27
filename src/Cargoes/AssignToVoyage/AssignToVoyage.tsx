import * as React from 'react';
import Pagination from '../../Common/Pagination.tsx';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { ArrowDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import './AssignToVoyage.css';

interface AssignToVoyageProps {
    onClose:()=>void;
}

export const data : voyage[] =[
    {
        voyage : 'ABC123',
        vessel : 'CBE456',
        from : 'Bharat',
        to : 'Gulf Copper'
    },
    {
        voyage : 'MNO908',
        vessel : 'SBY123',
        from : 'Bharat',
        to : 'Bay Ltd CCTX'
    }
]

export type voyage ={
    voyage : string,
    vessel : string,
    from : string,
    to : string
}

const columnDefs: Array<{ key: keyof voyage, label: string, renderCell?: ({ row }: { row: { getValue: (key: keyof voyage) => string } }) => JSX.Element }> = [
    {key : 'voyage',label:'VOYAGE#'},
    {key : 'vessel',label : 'VESSEL'},
    {key : 'from',label : 'FROM'},
    {key : 'to',label : 'TO'}
]


const AssignToVoyage:React.FC<AssignToVoyageProps> =({onClose}) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [rowSelection, setRowSelection] = React.useState({});
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
    ]
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });
    return (
        <div className="assign_voyage_main_div">
            <Card style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'rgba(255, 255, 255, 1)', 
                outline: 'none',
                width:'800px',
                maxWidth:'90vw',
                zIndex:1000,
                }}
            >
                <CardHeader style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        backgroundColor: 'rgba(44, 57, 92, 1)', 
                        color: 'white',
                        padding: '20px', 
                    }}
                >
                    <CardTitle style={{fontSize : '15px'}}>Assign to Voyage</CardTitle>
                    <XIcon onClick={onClose} style={{margin:'0px'}}/>
                </CardHeader>
                <CardContent style={{width:'100%',maxHeight:'500px',overflowY:'auto',padding:'0px'}}>
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
                    <Pagination table={table}/>
                    <hr />
                </CardContent>
                <div style={{display:'flex',alignItems:'center',justifyContent:'end',marginTop:'20px',paddingRight:'20px',paddingBottom:'20px'}}>
                    <Button style={{
                        backgroundColor:'rgba(255, 255, 255, 1)',
                        color:'black',
                        outline:'1px solid rgba(226, 232, 240, 1)',
                        marginRight:'10px'
                        }}
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button style={{
                        backgroundColor:'rgba(44, 57, 92, 1)'
                        }}>
                        Assign
                    </Button>
                </div>
            </Card>
            <div className="assign_voyage_bg_div" onClick={onClose}></div>
        </div>
    )
}

export default AssignToVoyage;