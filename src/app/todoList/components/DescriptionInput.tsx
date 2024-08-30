"use client"
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'


interface FormTextAreaProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionInput: React.FC<FormTextAreaProps> = ({
    name,
    placeholder,   
    value,
  onChange
}) => {
    
  return (
    <div className="flex flex-col space-y-1.5">                
                  <Textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    style={{resize: 'none'}}
                    rows={4}
                    onChange={onChange}
                  />
                  
                </div>
  )
}

export default DescriptionInput