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
import './GenerateReport.css';

interface GenerateReportProps {
    onClose: () => void;
}

const formSchema = z.object({
    operationType:z.string(),
    voyage : z.string(),
    projectNumber : z.string(),
    train : z.string(),
    truck : z.string(),
    barge : z.string()
})
type FormData = z.infer<typeof formSchema>;

const GenerateReport:React.FC<GenerateReportProps> = ({ onClose }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            operationType:'',
            voyage : '',
            projectNumber : '',
            train : '',
            truck : '',
            barge : ''
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="generate_report_main_div">
            <Card style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'rgba(255, 255, 255, 1)', 
                outline: 'none',
                width:'700px',
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
                        padding: '10px' 
                    }}
                >
                    <CardTitle style={{fontSize : '15px'}}>Generate Report</CardTitle>
                    <XIcon onClick={onClose} style={{margin:'0px'}}/>
                </CardHeader>
                <CardContent style={{padding:'10px'}}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="operationType"
                                render={({ field }) => (
                                    <FormItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <FormLabel style={{width:'140px'}}>Operation Type</FormLabel>
                                        <Input {...field} className="input"/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="generate_report_bg_div" onClick={onClose}></div>
        </div>
    )
}

export default GenerateReport;