import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react";
import './CreateCargo.css';

interface CreateCargoProps {
    onClose: () => void;
}

const formSchema = z.object({
    customer: z.string(),
    packingListId: z.string(),
    cargoType: z.string(),
    cargoSubType: z.string(),
    cargoStatus: z.string(),
    projectName: z.string(),
    projectNumber: z.string(),
    voyage: z.string(),
    cargoId: z.string(),
    barcode: z.string(),
    guppyId: z.string(),
    remoraId: z.string(),
    length: z.string(),
    height: z.string(),
    weightMetricTons: z.string()
})
type FormData = z.infer<typeof formSchema>;
type FormFieldName = keyof FormData;
const fields:{ name: FormFieldName; label: string }[] = [
    { name: "customer", label: "Customer" },
    { name: "packingListId", label: "Packing List ID" },
    { name: "cargoType", label: "Cargo Type" },
    { name: "cargoSubType", label: "Cargo Sub Type" },
    { name: "cargoStatus", label: "Cargo Status" },
    { name: "projectName", label: "Project Name" },
    { name: "projectNumber", label: "Project Number" },
    { name: "voyage", label: "Voyage#" },
    { name: "cargoId", label: "Cargo ID" },
    { name: "barcode", label: "Barcode#" },
    { name: "guppyId", label: "Guppy ID" },
    { name: "remoraId", label: "Remora ID" },
    { name: "length", label: "Length(m)" },
    { name: "height", label: "Height" },
    { name: "weightMetricTons", label: "Weight, Metric tons" },
];
const CreateCargo: React.FC<CreateCargoProps> = ({ onClose }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer: '',
            packingListId: '',
            cargoType: '',
            cargoSubType: '',
            cargoStatus: '',
            projectName: '',
            projectNumber: '',
            voyage: '',
            cargoId: '',
            barcode: '',
            guppyId: '',
            remoraId: '',
            length: '',
            height: '',
            weightMetricTons: ''
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <div className="card_main_div">
            <Card style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(246, 246, 247, 1)',
                outline: 'none',
                width: '1100px',
                zIndex: 1000,
                }}
            >
                <CardHeader style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgba(26, 41, 80, 1)',
                    color: 'white',
                    padding: '10px'
                    }}
                >
                    <CardTitle style={{ fontSize: '15px' }}>Create Cargo</CardTitle>
                    <XIcon onClick={onClose} style={{ margin: '0px' }} />
                </CardHeader>
                <CardContent style={{ padding: '10px' }}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div style={{ display: 'flex', flexDirection: 'column', margin: '10px', overflowY: 'auto', height: '290px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {[0, 1, 2].map((column) => (
                                        <div key={column} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                                            {fields.slice(column * 5, column * 5 + 5).map(({ name, label }) => (
                                                <FormField
                                                    key={name}
                                                    control={form.control}
                                                    name={name}
                                                    render={({ field }) => (
                                                        <FormItem style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <FormLabel style={{ width: '200px', padding: '5px' }}>{label}</FormLabel>
                                                            <Input {...field} className="input" />
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', marginTop: '15px', paddingRight: '15px' }}>
                                    <Button style={{ backgroundColor: 'rgba(255, 255, 255, 1)', color: 'black', outline: '1px solid rgba(226, 232, 240, 1)' }} onClick={onClose}>Cancel</Button>&nbsp;
                                    <Button style={{ backgroundColor: 'rgba(44, 57, 92, 1)' }}>Create Cargo</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="card_bg_div" onClick={onClose} />
        </div>
    );
}

export default CreateCargo;
