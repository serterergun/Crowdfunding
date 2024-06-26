import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../icons';
import { CreateButton, CampaignForm, Loader } from '../components';
import { checkIfImage } from '../tools';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { startNewCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleCampaignFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await startNewCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide a valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-Roboto font-bold sm:text-[25px] text-[18px] leading-[38px] text-white uppercase">Campaign Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <CampaignForm 
            labelName="Your Name *"
            placeholder="Enter Your Name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleCampaignFormChange('name', e)}
          />
          <CampaignForm 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleCampaignFormChange('title', e)}
          />
        </div>

        <CampaignForm 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleCampaignFormChange('description', e)}
          />



        <div className="flex flex-wrap gap-[40px]">
          <CampaignForm 
            labelName="Target Amount *"
            placeholder="ETH 0.1"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFCampaignFormChange('target', e)}
          />
          <CampaignForm 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleCampaignFormChange('deadline', e)}
          />
        </div>

        <CampaignForm 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleCampaignFormChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CreateButton 
              btnType="submit"
              title="Start new campaign"
              styles="bg-[#1e90ff]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign