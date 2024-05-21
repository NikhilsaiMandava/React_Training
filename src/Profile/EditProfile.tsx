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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react";

interface UserData {
    firstName: string;
    lastName: string;
    email: string,
    login: string,
    password: string,
    role: string,
    profile_pic: string
}

interface EditProfileProps {
    userData: UserData;
    onClose: () => void;
}

const formSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email: z.string(),
    password : z.string(),
    login : z.string(),
})
type FormData = z.infer<typeof formSchema>;

const EditProfile:React.FC<EditProfileProps> = ({userData,onClose}) => {
    console.log("__________________", userData);
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: userData.email,
          password:userData.password,
          firstName : userData.firstName,
          lastName : userData.lastName,
          login : userData.login
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <Card style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',backgroundColor:'rgba(246, 246, 247, 1)',outline:'none',zIndex:'1000'}}>
            <CardHeader style={{display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgba(26, 41, 80, 1)',color:'white'}}>
                <CardTitle>Edit Profile</CardTitle>
                <XIcon onClick={onClose}/>
            </CardHeader>
            <CardContent style={{padding:'10px'}}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'10px'}}>
                    <div>
                        <Avatar style={{width:'100px',height:'100px'}}>
                            <AvatarImage src={userData.profile_pic}/>
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                    </div>
                    <div style={{marginLeft:'20px'}}>
                        <h4 style={{textDecoration:'underline'}}>{userData.firstName}{userData.lastName}</h4>
                        <small>{userData.role}</small>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div style={{display:'flex',flexDirection:'row',}}>
                            <div style={{width : '157px',display:'flex',alignItems:'center'}}>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                    </FormItem>)}
                                />
                            </div>
                            <div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                        <FormItem>
                                            <Input {...field}/>
                                        </FormItem>)}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='lastName'
                                        render={({field}) => (
                                        <FormItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                            <FormLabel style={{width:'100px'}}>Last Name</FormLabel>
                                            <Input {...field} />
                                        </FormItem>)}
                                    />
                                </div>
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <FormLabel style={{width:'157px'}}>Email</FormLabel>
                                <Input {...field} />
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="login"
                            render={({ field }) => (
                            <FormItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <FormLabel style={{width:'157px'}}>Login</FormLabel>
                                <Input {...field} />
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <FormLabel style={{width:'157px'}}>Password</FormLabel>
                                <Input {...field} type="password"/>
                            </FormItem>)}
                        />
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'end',marginTop:'15px'}}>
                            <Button style={{backgroundColor:'rgba(255, 255, 255, 1)',color:'black',outline:'1px solid rgba(226, 232, 240, 1)'}} onClick={onClose}>Cancel</Button>&nbsp;
                            <Button style={{backgroundColor:'rgba(44, 57, 92, 1)'}}>Save Changes</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default EditProfile;