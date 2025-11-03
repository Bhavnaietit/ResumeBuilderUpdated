import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/Modal';
import CreateResumeForm from '../Home/CreateResumeForm';
import ResumeSummaryCard from '../../components/cards/ResumeSummaryCard';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (err) {
      console.log("Error fetching resumes", err);
    }
  }
  useEffect(() => {
    fetchAllResumes();
  }, []);
  console.log(allResumes)
  return (
		<DashboardLayout>
			<Modal
				isOpen={openCreateModal}
				onClose={() => {
					setOpenCreateModal(false);
				}}
				hideHeader>
				<div>
					<CreateResumeForm></CreateResumeForm>
				</div>
			</Modal>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
				<div
					className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-300 hover:bg-purple-50/5 cursor-pointer"
					onClick={() => setOpenCreateModal(true)}>
					<div className="w-12 h-12 flex items-center justify-center bg-purple-200/60">
						<LuCirclePlus className="text-purple-500 text-xl"></LuCirclePlus>
					</div>
					<h3 className="font-medium text-gray-800">Add New Resume</h3>
				</div>
        {allResumes && allResumes.map((resume ) => {
        
          return (
            <ResumeSummaryCard
              key={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume?.title}
              lastUpdated={
                resume?.updatedAt
                  ? moment(resume.updatedAt).format("DD/MM/YYYY")
                  : ""
              }
              onSelect={() =>
                navigate(`/resume/${resume?._id}`)
              }
    
            ></ResumeSummaryCard>
          );
				})}
			</div>
		</DashboardLayout>
	);
}

export default Dashboard