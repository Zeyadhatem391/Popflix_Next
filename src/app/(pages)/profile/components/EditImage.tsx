"use client";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";

const EditImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const handleButtonClick = () => {
    fileInputRef.current?.click(); 
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = session?.accessToken;
      const res = await fetch(`/api/profile/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const result = await res.json();
      toast.success("Image uploaded successfully!");
      console.log("Upload success:", result);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error uploading image");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="w-fit mt-1 px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition cursor-pointer"
      >
        Edit image
      </button>
    </div>
  );
};

export default EditImage;
