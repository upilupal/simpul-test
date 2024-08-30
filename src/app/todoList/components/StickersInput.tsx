import { Label } from '@/components/ui/label';
import React from 'react';
import { Sticker, stickers } from '../stickerList';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StickersInputProps {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  value: Sticker[]; // Updated to accept an array of Sticker objects
  setFieldValue: (field: string, value: Sticker[]) => void; // Updated to accept an array of Sticker objects
}

const StickersInput: React.FC<StickersInputProps> = ({
  name,
  placeholder,
  label,
  type,
  value,
  setFieldValue
}) => {
  const handleSelectChange = (selectedValue: string) => {
    const sticker = stickers.find(sticker => sticker.value === selectedValue);
    if (sticker) {
      // Toggle sticker in the value array
      const newValue = value.find(s => s.value === sticker.value)
        ? value.filter(val => val.value !== sticker.value)
        : [...value, sticker];
        
      setFieldValue(name, newValue); // Update the state in the parent component
    }
  };

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Select onValueChange={handleSelectChange}> {/* Allow multiple selection */}
        <SelectTrigger className="rounded-md border p-2 text-sm text-black/70">
          <SelectValue placeholder={placeholder} /> {/* Display all selected values */}
        </SelectTrigger>
        <SelectContent className='w-[285px]'>
          <SelectGroup>
            {stickers.map((sticker) => (
              <SelectItem key={sticker.value} value={sticker.value} style={{ backgroundColor: sticker.color }} className='w-[270px] m-1 text-gray-700'>
                {sticker.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StickersInput;
