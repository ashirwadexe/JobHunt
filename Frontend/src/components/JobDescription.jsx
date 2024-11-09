import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constants";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";

function JobDescription() {

  const isApplied = false;
  const params = useParams();
  const jobId = params.id;
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchSingleJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
            console.log(res);
            if(res.data.success) {
                dispatch(setSingleJob(res.data.job));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleJobs();
}, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar/>
      <div className="max-w-5xl mx-auto my-10 bg-white p-10 border border-gray-300 rounded-lg shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl">{singleJob?.company?.name}</h1>
            <div className='flex items-center gap-2 mt-4'>
              <Badge className="font-bold text-green-500" variant="ghost">{singleJob?.position} Position</Badge>
              <Badge className="font-bold text-red-500" variant="ghost">{singleJob?.jobType}</Badge>
              <Badge className="font-bold text-[#7209B7]" variant="ghost">{singleJob?.salary} LPA</Badge>
            </div>
          </div>
          <Button 
            disabled={isApplied} 
            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#F83002] hover:bg-[#c23111]'}`}>
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>
        <h1 className="font-medium text-1xl border-b-2 border-b-gray-300 py-4">Job Description</h1>
        <div>
          <h1 className="font-bold my-1">Role: <span className="text-gray-800 font-normal pl-4">{singleJob?.title}</span></h1>
          <h1 className="font-bold my-1">Loaction: <span className="text-gray-800 font-normal pl-4">{singleJob?.location}</span></h1>
          <h1 className="font-bold my-1">Description: <span className="text-gray-800 font-normal pl-4">{singleJob?.description}</span></h1>
          <h1 className="font-bold my-1">Experience: <span className="text-gray-800 font-normal pl-4">{singleJob?.experience} Years</span></h1>
          <h1 className="font-bold my-1">Salary: <span className="text-gray-800 font-normal pl-4">{singleJob?.salary} LPA</span></h1>
          <h1 className="font-bold my-1">Total Applicants: <span className="text-gray-800 font-normal pl-4">{singleJob?.applications?.length}</span></h1>
          <h1 className="font-bold my-1">Posted Date: <span className="text-gray-800 font-normal pl-4">{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default JobDescription;
