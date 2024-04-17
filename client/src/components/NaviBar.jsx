import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDisconnect } from '@thirdweb-dev/react';
import { useStateContext } from '../context';
import { CreateButton } from './';
import { logo, menu } from '../icons';
import { navlinks } from '../constants';

const NaviBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const disconnect = useDisconnect();

  return (
    <div className="flex md:flex-row flex-col justify-end mb-[35px] gap-2">
        <button onClick={() => disconnect()} className="font-Roboto w-[100px] h-[80px] rounded-[10px] bg-red-600 text-[14px] text-white font-bold">
            Disconnect Wallet
        </button>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CreateButton 
          btnType="button"
          title={address ? 'Create a new campaign' : 'Connect Wallet'}
          styles={address ? 'bg-[#1e90ff]' : 'bg-[#1e90ff]'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect()
          }}
        />


      </div>

      {/* Small screen navigation */}
        <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>

          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-Roboto font-semibold text-[14px] ${isActive === link.name ? 'text-[#ffffff]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
            <CreateButton 
              btnType="button"
              title={address ? 'Create a new campaign' : 'Connect Wallet'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#1e90ff]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
            </div>
          </div>
        </div>
    </div>
  )
}

export default NaviBar