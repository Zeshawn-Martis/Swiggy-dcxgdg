import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function TopRest() {
  const [data, setData] = useState([]);
  const [slide, setSlide] = useState(0); 

  const fetchTopRestaurant = async () => {
    const response = await fetch('/restaurantChains.json');
    const apiData = await response.json();
    setData(apiData);
  };

  useEffect(() => {
    fetchTopRestaurant();
  }, []);

  const nextSlide = () => {
    if (slide >= data.length - 4) return; 
    setSlide(slide + 1);
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setSlide(slide - 1);
  };

  return (
    <div className='max-w-[1200px] mx-auto'>
      <div className='flex my-5 items-center justify-between'>
        <div className='text-[25px] font-bold'>Top restaurant chains in Mumbai</div>
        <div className='flex'>
          <div
            className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2'
            onClick={prevSlide}
          >
            <FaArrowLeft />
          </div>
          <div
            className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2'
            onClick={nextSlide}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-5 duration-500 ease-in-out"
          style={{ transform: `translateX(-${slide * 300}px)` }} 
        >
          {data.map((d, i) => (
            <div key={i} className="w-[273px] shrink-0">
              <Card width="w-full" {...d} />
            </div>
          ))}
        </div>
      </div>

      <hr className='my-4 border-[1px]' />
    </div>
  );
}
