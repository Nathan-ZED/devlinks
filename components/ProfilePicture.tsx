"use client";
import { FaRegImage } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { useState } from "react";
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

  const handleFileChange = (event:any) => {
      setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
      if (!file) {
          alert('Veuillez sélectionner un fichier.');
          return;
      }

      new Compressor(file, {
          quality: 0.5,
          success: async (result) => {
            const formData = new FormData();
            //@ts-ignore
            formData.append('file', result, result.name);
      
            try {
                const response = await fetch(`http://localhost:8000/upload/${id}`, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error('Échec de l\'upload');
                }
                const data = await response.text();
                setUploadStatus(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors du téléchargement du fichier : ', error);
            }
          },
          error(err) {
              console.error('Une erreur s\'est produite lors de la compression du fichier : ', err);
          },
      });
  };


  return (
    <div className="bg-slate-100 rounded-xl p-3">
      <p className="text-md text-slate-500 mb-3">Profile picture</p>
      <label className="flex relative bg-primary/10 justify-start pt-5 w-[200px] h-[200px] rounded-full gap-y-3 mx-auto text-primary flex-col items-center">
        {
          file ? <Image fill={true} className="rounded-full" src={URL.createObjectURL(file)} alt="Preview" />
          : <FaRegImage className="text-5xl" />
        }
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
