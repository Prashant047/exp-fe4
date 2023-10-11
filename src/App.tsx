import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import image6 from './images/image6.jpg';
import image7 from './images/image7.jpg';

const imageList = [image1, image2, image3, image4, image5, image6, image7]
const nameList = ["Yarkowish", "Tchaikovsky", "Conway", "Gibson", "Munroe", "Dettmer", "Ashton"]

export default function App() {

  const [active, setActive] = useState(-1);
  
  const goNext = () => {
    setActive(prev => (prev+1)%imageList.length)
  }
  
  const goPrev = () => {
    setActive(prev => prev == 0? imageList.length-1: prev-1);
  }

  return (
    <section 
      className="relative z-0 w-full h-screen bg-neutral-950 bg-cover bg-center text-neutral-100"
    >
      <AnimatePresence>
        <motion.div
          className='absolute w-full h-full bg-cover bg-center brightness-50'
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          key={active}
          style={{backgroundImage: `url(${active >= 0? imageList[active]: ''})`}}
        />
      </AnimatePresence>
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col">
          <div className="flex gap-2 justify-between">
            {imageList.map((img, index) => (
              <ImageHoverCard isActive={active === index} image={img} key={index} name={nameList[index]} setActive={() => setActive(index)}/>
            ))}
          </div>
          <div className='mt-10 flex justify-between items-center z-10'>
            <button
              className='transition hover:bg-neutral-200/10 border border-neutral-200 px-9 py-2 rounded-full'
              onClick={() => goPrev()}
            >
              <ArrowLeftIcon/>
            </button>
            <div className='flex flex-col items-center justify-center'>
              <h2 className='text-sm'>Fine Arts</h2>
              <small className='text-xs text-neutral-400'>Illustrative Collection</small>
            </div>
            <button
              className='transition hover:bg-neutral-200/10 border border-neutral-200 px-9 py-2 rounded-full'
              onClick={() => goNext()}
            >
              <ArrowRightIcon/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


function ImageHoverCard({
  isActive,
  image,
  name,
  setActive
}:{
  isActive: boolean,
  image:string,
  name:string,
  setActive: () => void
}){
  
  const containerVairant = {
    selected: {
      y: -30,
      transition: {
        delayChildren: 0.1
      }
    },
    deSelected: {
      y: 0
    }
  }

  const textVariant = {
    selected: {
      opacity: 1,
      y: -25,
    },
    deSelected: {
      opacity: 0,
      y: 0,
    }
  }
  
  const circleVariant = {
    selected: {
      opacity: 1,
      y: '20px'
    },
    deSelected: {
      opacity: 0,
      y: '30px',
    }
  }

  return (
    <motion.div 
      className="relative w-10 h-[370px] rounded-lg"
      // ref={scope}
      variants={containerVairant}
      initial="deSelected"
      animate={isActive? "selected": "deSelected"}
      onMouseOver={() => setActive()}
    >
      <motion.div
        className='absolute flex w-full justify-center whitespace-nowrap top-0 text-xs'
        variants={textVariant}
      >
        { name }
      </motion.div>
      <img 
        className={`${isActive?'border-2 border-neutral-400':''} w-full h-full object-cover object-center rounded-lg`}
        src={image}
      />
      <motion.div 
        className='w-full flex justify-center absolute bottom-0 opacity-0 pointer-events-none'
        variants={circleVariant}
        style={{transform: 'translateY(30px)'}}
      >
        <CircleIcon/>
      </motion.div>
    </motion.div>
  )
}