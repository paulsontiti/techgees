import { textPrimaryColor } from '@/utils/colors'
import React from 'react'
import FaqCard from './(root)/_components/faq-card'

function FAQ() {
  return (
    <section className='flex flex-col items-center justify-center my-16 p-2 md:p-16 bg-white'>
        <h1 className={`text-4xl ${textPrimaryColor} p-4 font-bold`}>
            Frequently Asked Questions</h1>

            <div className='flex flex-col md:flex-row items-center justify-center md:gap-16'>
                <div className='w-full md:w-1/2 xl:w-1/3'>
                  <FaqCard 
                  question='Can I Pay In Installments'
                  answer={`
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis totam aperiam dolor nemo amet, veritatis omnis aspernatur incidunt laudantium recusandae, accusantium odio iusto magni cum excepturi sint, libero sapiente velit.`}
                  />
                   <FaqCard 
                  question='Can I Pay In Installments'
                  answer={`
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis totam aperiam dolor nemo amet, veritatis omnis aspernatur incidunt laudantium recusandae, accusantium odio iusto magni cum excepturi sint, libero sapiente velit.`}
                  />
                   <FaqCard 
                  question='Can I Pay In Installments'
                  answer={`
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis totam aperiam dolor nemo amet, veritatis omnis aspernatur incidunt laudantium recusandae, accusantium odio iusto magni cum excepturi sint, libero sapiente velit.`}
                  />
                </div>
                <div className='w-full md:w-1/2 xl:w-1/3'>
                  <FaqCard 
                  question='Can I Pay In Installments'
                  answer={`
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis totam aperiam dolor nemo amet, veritatis omnis aspernatur incidunt laudantium recusandae, accusantium odio iusto magni cum excepturi sint, libero sapiente velit.`}
                  />
                   <FaqCard 
                  question='Can I Pay In Installments'
                  answer={`
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis totam aperiam dolor nemo amet, veritatis omnis aspernatur incidunt laudantium recusandae, accusantium odio iusto magni cum excepturi sint, libero sapiente velit.`}
                  />
                   <FaqCard 
                  question='Can I Pay In Installments'
                  answer={`
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis totam aperiam dolor nemo amet, veritatis omnis aspernatur incidunt laudantium recusandae, accusantium odio iusto magni cum excepturi sint, libero sapiente velit.`}
                  />
                </div>
            </div>
    </section>
  )
}

export default FAQ