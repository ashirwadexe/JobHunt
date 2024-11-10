import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowBigLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

function CompanySetup() {
    const [input, setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    });

    const {singleCompany} = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const changeEventhandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true,
            });
            if(res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies")
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name:singleCompany.name || "",
            description:singleCompany.description || "",
            website:singleCompany.website || "",
            location: singleCompany.location || "",
            file:singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div>
            <Navbar/>
            <div className='max-w-xl mx-auto my-10 bg-white p-10 border border-gray-300 rounded shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 mb-10'>
                        <Button onClick={() => navigate("/admin/companies")} className="flex items-center gap-2 text-white font-semibold bg-[#F83002] hover:bg-[#de3d18]">
                            <ArrowBigLeft/>
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-[#F83002]"><Loader2 className="mr-2 h-4 w-4 animate-spin bg-[#d43511]"/>Please wait</Button> : <Button type="submit" className="w-full my-4 bg-[#F83002] hover:bg-[#d43511]">Update Company Data</Button>
                    } 
                </form>
            </div>
        </div>
    )
}

export default CompanySetup