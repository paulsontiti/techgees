import { Category } from '@prisma/client';
import React, { ReactNode } from 'react'
import CategoryTabItem from './category-tab-item';

type TabDataType = {
    name: string;
    content: ReactNode;
};


function CategoryTabData({categories,tab}:{
    categories:Category[],
    tab:string
}) {

    const TabDataContent: TabDataType[] = categories.map((category)=>{

        return {
            name:category.name,
            content:<CategoryTabItem categoryId={category.id}/>
        }
    })
    
  return (
    <div className="mt-8 flex items-center">
    {TabDataContent.find((data) => data.name === tab)?.content}
</div>
  )
}

export default CategoryTabData