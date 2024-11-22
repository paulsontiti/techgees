import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { bgNeutralColor, bgPrimaryColor, textPrimaryColor } from '@/utils/colors'
import { MessageCircle } from 'lucide-react'
import React from 'react'
import ContactUsForm from '../_components/contact-us-form'

function ContactUsPage() {
  return (
    <div className='flex flex-col items-center justify-center pt-16'>
      <FAQ />
      <ContactUs />
    </div>
  )
}

export default ContactUsPage

const FAQ = () => {

  return <div className='bg-white w-11/12 md:w-2/3 pt-4 flex flex-col items-center justify-center'>
    <div className='flex flex-col items-center justify-center md:w-10/12 xl:w-1/2  mb-8'>
      <h1 className={`${textPrimaryColor} text-xl md:text-2xl font-bold`}>Frequently Asked Questions</h1>
      <p className='text-xs md:text-sm w-9/12 md:w-7/12 xl:w-9/12 mt-2'>Find quick questions & answers about our community and developing skills</p>
    </div>
    <FAQAccordion />
  </div>
}

const FAQAccordion = () => {

  return <div className={`${bgPrimaryColor} flex flex-col items-center justify-center py-4 rounded-b-none rounded-3xl w-full text-white`}>
    <Accordion type="single" collapsible className='w-full md:w-10/12 px-2'>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className='line-clamp-1 w-11/12'>How much is Frontend Development Course</h2>
        </AccordionTrigger>
        <AccordionContent>
          {
            `
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I
           `
          }

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <h2>How much is Frontend Development Course</h2>
        </AccordionTrigger>
        <AccordionContent>
          {
            `
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I
           `
          }

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <h2>How much is Frontend Development Course</h2>
        </AccordionTrigger>
        <AccordionContent>
          {
            `
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I
           `
          }

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-14">
        <AccordionTrigger>
          <h2>How much is Frontend Development Course</h2>
        </AccordionTrigger>
        <AccordionContent>
          {
            `
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I
           `
          }

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          <h2>How much is Frontend Development Course</h2>
        </AccordionTrigger>
        <AccordionContent>
          {
            `
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I
           `
          }

        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Button variant='outline' size="sm" className='rounded-full mt-8'>See more FAQs</Button>
  </div>
}

const ContactUs = () => {

  return (
    <div className='mt-8 w-full  px-4 bg-white flex items-center justify-center py-16'>
      <div className='w-full md:w-11/12 lg:w-10/12 xl:w-9/12 flex flex-col md:flex-row gap-y-4'>
        <div className='w-full md:w-1/3'>
          <h1 className={`${textPrimaryColor} text-xl md:text-2xl font-bold`}>Contact Us</h1>
          <p className='text-xs md:text-sm w-9/12 md:w-7/12 xl:w-9/12 mt-2'>Fill the form with your enquiries or any issue which you have come across with</p>

          <div className='mt-8 flex items-center justify-center w-1/2'>
            <MessageCircle className='w-20 h-20' />
          </div>
        </div>
        <div className={`${bgNeutralColor} w-full md:w-2/3 p-4`}>
          <ContactUsForm />
        </div>
      </div>
    </div>
  )
}