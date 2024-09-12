"use client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ReactNode, useState, useTransition } from "react";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import CategoryTabData from "./category-tab-data";




function PopularCourses({
categories
}:{
    categories:Category[]
}) {
    const [tab, setTab] = useState(categories[0].name);
    const [isPending, startTransition] = useTransition();
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);

    const handleTabChange = (id: string) => {
        startTransition(() => {
            setTab(id);
        });
    };

    return (
        <section className=" bg-sky-900 mt-4 pt-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white ">
                Choose from popular courses</h1>

            <div className="md:flex flex-col mt-10 hidden">
                <div  className="flex items-center gap-x-4 w-full">
                    {startIndex > 0 && (
                        <ChevronLeft
                            className="w-8 h-8 text-white cursor-pointer"
                            onClick={() => {
                                setStartIndex((prv) => --prv);
                                setEndIndex((prv) => --prv);
                            }}
                        />
                    )}
                    <div className="md:flex flex-row min-w-[900px] max-w-[1200px] overflow-hidden">
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
export default PopularCourses;

function TabButton({
    active,
    selectTab,
    children,
    child,
}: {
    active: boolean;
    selectTab: () => void;
    children: ReactNode;
    child?: boolean;
}) {
    const buttonClass = active
        ? "text-white "
        : `text-sky-500`;

    const variants = {
        default: { width: 0 },
        active: {
            width: "calc(100% - 0.75rem)",
        },
    };
    return (
        <Button onClick={selectTab} className="mr-3"
        variant={`${active ? "default": "outline"}`}
        >
            <p
                className={`mr-1 hover:text-emerald-500 rounded-full ${buttonClass}`}
            >
                {children}
            </p>
            <motion.div
                variants={variants}
                animate={active ? "active" : "default"}
                className="h-1 bg-primary-500 mt-2 mr-3"
            ></motion.div>
        </Button>
    );
}