"use client";
import { FaRegImage } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Compressor from 'compressorjs';
import { prisma } from "@/lib/prisma";
import Image from "next/image";

type Props = {
  id: number;
}


export default function ProfilePicture({id}: Props) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  
  async function checkIfProfilePictureExists(id: number) {
    const response = await fetch(`http://localhost:8000/image/${id}`);
    const result = await response.json();
    return result;
  }

  const handleFileChange = (event:any) => {
      setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file || !id) {
      alert('Please select a file and enter user ID');
      return;
    }

    // Compression de l'image
    new Compressor(file, {
      quality: 0.6, // Qualité de compression entre 0 et 1
      success: async (compressedFile) => {
        const formData = new FormData();
        formData.append('image', compressedFile);

        try {
          await fetch(`http://localhost:8000/upload/${id}`, {
            method: 'POST',
            body: formData,
          });
          alert('Image uploaded successfully');
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image');
        }
      },
      error: (error) => {
        console.error('Error compressing image:', error);
        alert('Failed to compress image');
      },
    });
  };


  return (
    <div className="bg-slate-100 rounded-xl p-3">
      <p className="text-md text-slate-500 mb-3">Profile picture</p>
      <label className="flex relative bg-primary/10 justify-start pt-5 w-[200px] h-[200px] rounded-full gap-y-3 mx-auto text-primary flex-col items-center">
          <img className="rounded-full w-full h-full object-cover absolute top-0 left-0 z-[0] opacity-20" src={`http://localhost:8000/image/${id}`} alt="Preview" />
          <FaRegImage className="text-5xl absolute top-20 left-50" />
        <input
          onChange={handleFileChange}
          className="absolute top-0 left-0 w-full h-full opacity-0"
          type="file"
          accept="image/png, image/jpg"
        />
        <div className="flex gap-x-3 items-center">
          <FaUpload className="text-xl" />
          <span>Upload Image</span>
        </div>
      </label>
      <p className="text-sm leading-[1.2] pt-4 text-slate-400">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
      {
        file && 
            <Button
                type="submit"
                onClick={handleSubmit}
            >
                Send to server
            </Button>
      }
      {uploadStatus && <p>Statut de l'upload : {uploadStatus}</p>}
    </div>
  );
}
