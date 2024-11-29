import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors';
import { Pencil } from 'lucide-react';
import React from 'react'

function EditPencil({onClick}:{onClick:()=>void}) {
  return (
    <div className={`${bgPrimaryColor} ${textSecondaryColor} rounded-full`}>
    <Pencil
      onClick={onClick}
      className="w-3 h-3 cursor-pointer hover:opacity-75 transition"
    />
    </div>
  )
}

export default EditPencil