import IconBadge from '@/components/icon-badge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { LayoutDashboard } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/category-form'

async function CourseIdPage({params:{courseId}}:{params:{courseId:string}}) {

  const {userId} = auth()
  if(!userId) return redirect("/dashboard")

    const course = await db.course.findUnique({
      where:{
       id_userId:{
        id:courseId,
        userId
       },
       
      },include:{
        courseCategory:true
      }
    })

    if(!course) return redirect("/dashboard")




      const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.courseCategory.length > 0
      ]

      const totalFields = requiredFields.length
      const completedFields = requiredFields.filter(Boolean).length
      const completionText = `(${completedFields}/${totalFields})`


      const categories = await db.category.findMany({
        orderBy:{
          name:"asc"
        }
      })

      const cC = await db.courseCategory.findMany({
        where:{
          courseId
        },
        include:{
          category:true
        }
      })

      const courseCategories = cC.map(categpry =>  categpry.category)

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>
            Course setup
          </h1>
          <span className='text-sm text-slate-700'>
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16'>
       <div>
       <div className='flex items-center gap-x-2'>
          <IconBadge icon={LayoutDashboard} size="sm"/>
          <h2 className='text-xl'>
            Customize your course
          </h2>
        </div>
        <TitleForm course={course}/>
        <DescriptionForm course={course}/>
        <ImageForm course={course}/>
        <CategoryForm categories={categories} courseCategories={courseCategories}/>
       </div>
      </div>
    </div>
  )
}

export default CourseIdPage