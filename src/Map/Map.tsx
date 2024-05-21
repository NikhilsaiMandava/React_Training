import * as React from 'react';
import { FilterIcon, Plus,ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import './Map.css';

interface TransportOption {
    label: string;
    value: string;
}

const transportOptions: TransportOption[] = [
    { label: 'Vessels', value: 'vessels' },
    { label: 'Trucks', value: 'trucks' },
    { label: 'Barges', value: 'barges' },
    { label: 'Trains', value: 'trains' },
    { label: 'Remoras', value: 'remoras' },
];

function Map() {
    const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<TransportOption[]>([]);
    const filterOptions = [
        "Transport Type",
        "Remora #",
        "Transport ID",
        "Transport 2nd ID",
        "Voyage",
        "Voyage Status",
        "Loading Port Country",
        "Discharge Port Country",
        "Vessel Name"
    ];

    const handleClearFilters = () => {
        setSelectedOptions([]);
    };

    const handleOptionChange = (option: TransportOption, checked: boolean) => {
        if (checked) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions(selectedOptions.filter((opt) => opt.value !== option.value));
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedItems([...checkedItems, value]);
        } else {
            setCheckedItems(checkedItems.filter(item => item !== value));
        }
    };

    return (
        <div className="map_main_div">
            <div className="map_filter_div">
                <FilterIcon /><pre> </pre>
                {checkedItems.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'nowrap',overflowX:'auto',maxWidth:'100%' }}>
                        {checkedItems.map(item => (
                            <div key={item} style={{ margin: '5px', display: 'flex', alignItems: 'center' }}>
                                {item === "Transport Type" ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger style={{
                                            border: '0.95px solid rgba(203, 213, 225, 1)',
                                            outline: 'none',
                                            borderRadius: '5.68px',
                                            height: '40px',
                                            width: '200px',
                                            color : 'rgba(181, 187, 198, 1)',
                                            display:'flex',
                                            alignItems:'center',
                                            backgroundColor:'rgba(255, 255, 255, 1)',
                                            justifyContent:'space-between',
                                            paddingLeft:'15px',
                                            paddingRight:'10px'
                                            }}
                                        >
                                            Transport Type
                                            <ChevronDown className='ml-2 h-4 w-4'/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuGroup>
                                                {transportOptions.map((option) => (
                                                    <DropdownMenuItem key={option.value} className="flex items-center">
                                                        <Checkbox
                                                            checked={selectedOptions.some((opt) => opt.value === option.value)}
                                                            onCheckedChange={(checked) => handleOptionChange(option, Boolean(checked))}
                                                        />
                                                        <span className="ml-2">{option.label}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuGroup>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={handleClearFilters}>
                                                    Clear filters
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <input type="text" placeholder={item} 
                                        style={{
                                            border: '0.95px solid rgba(203, 213, 225, 1)',
                                            outline: 'none',
                                            borderRadius: '5.68px',
                                            height: '40px',
                                            width: '200px',
                                            paddingLeft:'15px'
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <Menubar style={{ padding: '0px', border: 'none', background: 'none' }}>
                    <MenubarMenu>
                        <MenubarTrigger style={{ background: 'none' }}>
                            <Button><Plus />Filter</Button>
                        </MenubarTrigger>
                        <MenubarContent style={{ display: 'flex', flexDirection: 'column' }}>
                            {filterOptions.map(option => (
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} key={option}>
                                    <input 
                                        type="checkbox" 
                                        value={option} 
                                        onChange={handleCheckboxChange}
                                        checked={checkedItems.includes(option)}
                                    />
                                    <span style={{ marginLeft: '5px' }}>{option}</span>
                                </div>
                            ))}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div>
                <span>Map</span>
            </div>
        </div>
    )
}

export default Map;