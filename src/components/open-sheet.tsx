"use client";


import React from "react";
import { useSheetStore } from "../../store/sheet-store";
import { Button } from "./ui/button";


export function OpenSheetButton({label}:{label:string}) {

    const {openSheet} = useSheetStore();

  const onClick = () => {
    openSheet();
  };
  return (
 <Button className="md:hidden my-4" onClick={onClick}>{label}</Button>
  );
}
