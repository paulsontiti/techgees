"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {useState, useTransition } from "react";
import { Category } from "@prisma/client";
import CategoryTabData from "./category-tab-data";
import { TabButton } from "./popular-courses";




function LGPopularCourses({
categories
}:{
    categories:Category[]
}) {
    const [tab, setTab] = useState(categories[0].name);
    const [isPending, startTransition] = useTransition();
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);

    const handleTabChange = (id: string) => {
        startTransition(() => {
            setTab(id);
        });
    };

    return (
        <section className=" bg-sky-900 my-4 py-4 px-2 lg:flex flex-col items-center justify-center hidden xl:hidden">
            <h1 className="text-2xl font-bold text-white ">
                Choose from popular courses</h1>

            <div className="flex flex-col mt-10">
                <div  className="flex items-center justify-center gap-x-1 w-full p-x2">
                    {startIndex > 0 && (
                        <ChevronLeft
                            className="w-8 h-8 text-white cursor-pointer"
                            onClick={() => {
                                setStartIndex((prv) => --prv);
                                setEndIndex((prv) => --prv);
                            }}
                        />
                    )}
                    <div className="flex flex-row  overflow-hidden">
                        {
                            Array.isArray(categories) && !!categories.length && categories.slice(startIndex,endIndex).map((category)=>{

                                return  <TabButton
                                key={category.id}
                                active={tab === category.name}
                                selectTab={() => handleTabChange(category.name)}
                            >
                                {category.name}
                            </TabButton>
                            })
                        }
                       
                      
                    </div>
                    {endIndex < categories.length && (
                            <ChevronRight
                                className="w-8 h-8 text-white cursor-pointer"
                                onClick={() => {
                                    setStartIndex((prv) => ++prv);
                                    setEndIndex((prv) => ++prv);
                                }}
                            />
                        )}
                </div>
             
              <CategoryTabData categories={categories} tab={tab}/>

            </div>

           
        </section>
    );
};
export default LGPopularCourses;

