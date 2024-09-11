"use client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ReactNode, useState, useTransition } from "react";

type TabDataType = {
    id: string;
    content: ReactNode;
};
const TabData: TabDataType[] = [
    {
        id: "Programming",
        content: (
            <div>

            </div>
        ),

    },
    {
        id: "Web development",
        content: (
            <></>
        ),
    },
    {
        id: "Mobile development",
        content: (
            <></>
        ),
    },
];

const categories = ["Programming,Web development,Mobile development"]
const PopularCourses = () => {
    const [tab, setTab] = useState("Programming");
    const [isPending, startTransition] = useTransition();
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);

    const handleTabChange = (id: string) => {
        startTransition(() => {
            setTab(id);
        });
    };
    return (
        <section className=" bg-sky-900 mt-4 pt-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white ">
                Choose from popular courses</h1>

            <div className="flex flex-col sm:col-span-8 sm:ml-8 lg:ml-0 h-full mt-4 text-left">

                <div className="md:flex flex-row mt-8 hidden">
                    <TabButton
                        active={tab === "Programming"}
                        selectTab={() => handleTabChange("Programming")}
                    >
                        Programming
                    </TabButton>
                    <TabButton
                        active={tab === "Web development"}
                        selectTab={() => handleTabChange("Web development")}
                    >
                        Web development
                    </TabButton>
                    <TabButton
                        active={tab === "Mobile development"}
                        selectTab={() => handleTabChange("Mobile development")}
                    >
                        Mobile development
                    </TabButton>
                </div>
                <div className="mt-8">
                    {TabData.find((data) => data.id === tab)?.content}
                </div>
                <div className="md:hidden">
                    <div className="flex justify-between items-center ">
                        {startIndex > 0 && (
                            <ChevronLeft
                                className="w-8 h-8"
                                onClick={() => {
                                    setStartIndex((prv) => --prv);
                                    setEndIndex((prv) => --prv);
                                }}
                            />
                        )}
                        <div className="max-w-[300px]  flex items-start overflow-hidden">
                            {categories.slice(startIndex, endIndex).map((skill) => (
                                <TabButton
                                    key={skill}
                                    active={tab === skill}
                                    selectTab={() => handleTabChange(skill)}
                                    child={true}
                                >
                                    {skill}
                                </TabButton>
                            ))}
                        </div>
                        {endIndex < categories.length && (
                            <ChevronRight
                                className="w-8 h-8"
                                onClick={() => {
                                    setStartIndex((prv) => ++prv);
                                    setEndIndex((prv) => ++prv);
                                }}
                            />
                        )}
                    </div>
                    <div className="mt-8">
                        {TabData.find((data) => data.id === tab)?.content}
                    </div>
                </div>

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
        : `text-${child ? "secondary" : "primary"}-500`;

    const variants = {
        default: { width: 0 },
        active: {
            width: "calc(100% - 0.75rem)",
        },
    };
    return (
        <button onClick={selectTab}>
            <p
                className={`mr-1 hover:text-white rounded-full py-2 px-4 ${buttonClass}`}
            >
                {children}
            </p>
            <motion.div
                variants={variants}
                animate={active ? "active" : "default"}
                className="h-1 bg-primary-500 mt-2 mr-3"
            ></motion.div>
        </button>
    );
}