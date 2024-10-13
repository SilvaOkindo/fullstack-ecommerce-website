import { Label } from "@radix-ui/react-label";
import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  setImageLoadingState,
  imageLoadingState
}) => {
  const inputRef = useRef();

  const handleImageFileChange = (event) => {
    console.log(event.target.files)
    const selectedFile = event.target.files?.[0]
    if(selectedFile) setImageFile(selectedFile)
  };

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }


  const handleDragOver = (event) => {
    event.preventDefault

  }

  const handleRemoveFile = () => {
    setImageFile(null)
    if(inputRef.current) {
      inputRef.current = ''
    }
  }

  const uploadImageToCludinary = async () => {
    setImageLoadingState(true)
    const data = new FormData()
    data.append("my_file", imageFile)
    const response =  await axios.post("http://localhost:3000/api/v1/admin/upload-image", data)

    console.log(response)

    if(response?.data?.success) {
      setUploadImageUrl(response.data.result.url)
      setImageLoadingState(false)

    }

  }

  useEffect(() =>{
    if(imageFile !== null) uploadImageToCludinary()
  }, [imageFile])


  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload image</Label>

      <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4 mt-4">
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <Label htmlFor="image-upload" className="flex flex-col items-center gap-3 cursor-pointer">
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) :

        (imageLoadingState ? <Skeleton className="h-10 bg-gray-100"/> : 
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileIcon className="w-8 h-8 text-primary mr-2"/>
          </div>
          <p className="text-sm font-medium">{imageFile.name}</p>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveFile}>
            <XIcon className="w-4 h-4"/>
            <span className="sr-only">Remove image</span>
          </Button>
          </div>)}
      </div>
    </div>
  );
};

export default ProductImageUpload;
