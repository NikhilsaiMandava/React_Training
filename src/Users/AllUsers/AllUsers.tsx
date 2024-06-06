import * as React from 'react';
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from '../../Common/Pagination/Pagination.tsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowDown,MoreVertical,Delete } from 'lucide-react';
import './AllUsers.css';

export const data: user[] = [
    {
        company : 'Seaog',
        name : "John Abraham",
        email: "abraham123@gmail.com",
        login : "abraham123@gmail.com",
        userRole : "Administrator",
        jobTitle : "Supervisor",
        customers : "VG"
    },
    {
        company : 'Seaog',
        name : "Qwerty John",
        email: "john123@gmail.com",
        login : "john123@gmail.com",
        userRole : "Inspector",
        jobTitle : "Truck Driver",
        customers : "VG"
    },
    {
        company : 'Seaog',
        name : "John Lamb",
        email: "lamb123@gmail.com",
        login : "lamb123@gmail.com",
        userRole : "Carrier",
        jobTitle : "Surveyor",
        customers : "VG"
    },
    {
        company : 'Seaog',
        name : "Vamsi John",
        email: "vamsi123@gmail.com",
        login : "vamsi@gmail.com",
        userRole : "Report Viewer",
        jobTitle : "Support",
        customers : "VG"
    },
    {
        company : 'Seaog',
        name : "Lincon p",
        email: "lincon123@gmail.com",
        login : "lincon123@gmail.com",
        userRole : "Administrator",
        jobTitle : "Stevedore",
        customers : "VG"
    },
    {
        company : 'Seaog',
        name : "Mandy m",
        email: "mandy123@gmail.com",
        login : "mandy123@gmail.com",
        userRole : "Administrator",
        jobTitle : "HSE Professional",
        customers : "VG"
    }
] 
export type user ={
    company: string,
    name: string,
    email: string,
    login : string,
    userRole : string,
    jobTitle : string,
    customers : string,
}

const columnDefs: Array<{ key: keyof user, label: string, renderCell?: ({ row }: { row: string }) => JSX.Element }> = [
    { key: 'company' , label: 'Company'},
    { key: 'login', label: 'Username'},
    { key: 'name' , label : 'Name'},
    { key: 'jobTitle', label: 'Job Title'},
    { key: 'userRole' , label: 'User Role'},
    { key: 'customers', label: 'Cutomers'}
]
function AllUsers() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    // const [selectedFields, setSelectedFields] = React.useState<string | null>(null);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    // const handleFieldCheck = (field: string) => {
    //     setSelectedFields((prevField) => (prevField === field ? null : field));
    // };
    // const handleClearFilters = () => {
    //     setSelectedFields('');
    // };
    const columns: ColumnDef<user>[] = [
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
        ...columnDefs.map(({ key, label }) => ({
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
                    <ArrowDown style={{ width: '1.5vw', height: '4vh' }} />
                </Button>
            ),
            cell: ({ row }: { row: any }) => <div className="allusers_capitalize">{row.getValue(key)}</div>,
        })),
        {
            id: 'moreVertical',
            header: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='allusers_vertical_DropDown'>
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
                    <DropdownMenuTrigger asChild className='allusers_vertical_DropDown'>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ width: '5vw', height: 'fit-content', padding: '1%', color: 'rgba(9, 9, 11, 1)' }}>
                        <DropdownMenuItem className='allusers_dropdown_item'>Edit</DropdownMenuItem>
                        {/* <DropdownMenuItem className='allusers_dropdown_item'>View</DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='allusers_dropdown_item'>Delete
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
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        company: true,
        name: true,
        email: true,
        login : true,
        userRole : true,
        jobTitle : true,
        customers : true,
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
        <div className='allusers_main_div'>
            <div className='allusers_table_div'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='allusers_table_header'>
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
                                        <TableCell key={cell.id} className='allusers_table_row'>
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
                <Pagination table={table}/>
            </div>
        </div>
    )
}

export default AllUsers;