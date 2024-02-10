import React from 'react';
// import { Input, Text, Img } from '../../components'; // Import necessary components

const Github = () => {
  return (
    <>
      <div className="bg-gray-50 flex flex-col font-montserrat items-center justify-start mx-auto pb-[30px] w-full">
        <header className="bg-white-A700 flex md:flex-col flex-row md:gap-5 items-center justify-center md:px-5 shadow-bs w-full">
          <div className="h-7 mb-5 md:ml-[0] ml-[30px] md:mt-0 mt-[15px]" src="images/img_headerlink.svg" alt="headerlink" />
          <div className="flex md:flex-1 flex-col items-center justify-start mb-5 md:ml-[0] ml-[1701px] mr-[30px] md:mt-0 mt-6 w-[4%] md:w-full">
            <div className="flex flex-row gap-[11px] items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start w-[24%]">
                <div className="bg-gray-900 h-[3px] w-3/5"></div>
                <div className="bg-gray-900 h-[3px] mt-0.5 w-full"></div>
                <div className="bg-gray-900 h-[3px] mt-0.5 w-4/5"></div>
              </div>
              <div className="text-[13px] text-gray-900 text-right" size="txtMontserratRegular13">Menu</div>
            </div>
          </div>
        </header>

        {/* ... Other components ... */}

        <div className="mt-16 text-[22px] text-gray-900_01 sm:text-lg md:text-xl" size="txtMontserratRegular22">Select the furnishing available in your property</div>
      </div>
    </>
  );
};

export default Github;
