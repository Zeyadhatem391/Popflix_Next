"use client";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Zod schema كامل مع كل الحقول
export const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstname: z.string().min(3, "First name must be at least 3 characters"),
  lastname: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\+[\d\s-]{10,}$/, "Phone format invalid"),
  gender: z.enum(["male", "female"]),
  // birthday: z.date().optional(),
});

type ProfileData = z.infer<typeof profileSchema>;

const AddProfile = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: session?.user?.name || "",
      firstname: "",
      lastname: "",
      email: session?.user?.email || "",
      phone: "",
      gender: "male",
      // birthday: "15-11-2005",
    },
  });

  const { handleSubmit, control, register, reset } = form;

  const onSubmit = async (data: ProfileData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_SING}/api/profile/info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        console.error("API Error:", error);
        throw new Error("Failed to add profile");
      }

      const result = await res.json();
      console.log("Profile added successfully", result);

      setOpen(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 hover:bg-white/10 transition text-left"
      >
        Add Profile
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-black text-white rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Add Profile</h2>
              <button
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                className="p-2 rounded-md hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  placeholder="Enter username"
                  className="bg-black border-gray-700 text-white placeholder-gray-400"
                  {...register("username")}
                />
              </div>

              {/* First & Last */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    placeholder="First name"
                    className="bg-black border-gray-700 text-white placeholder-gray-400"
                    {...register("firstname")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last name"
                    className="bg-black border-gray-700 text-white placeholder-gray-400"
                    {...register("lastname")}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  className="bg-black border-gray-700 text-white placeholder-gray-400"
                  {...register("email")}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  placeholder="Phone number"
                  className="bg-black border-gray-700 text-white placeholder-gray-400"
                  {...register("phone")}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label>Gender</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-6"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="male"
                          id="male"
                          className="w-5 h-5 border border-gray-500 rounded-full 
                          data-[state=checked]:bg-blue-600 
                          data-[state=checked]:border-blue-600 
                          transition-all"
                        />
                        <Label htmlFor="male">Male</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="female"
                          id="female"
                          className="w-5 h-5 border border-gray-500 rounded-full 
                          data-[state=checked]:bg-pink-600 
                          data-[state=checked]:border-pink-600 
                          transition-all"
                        />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {/* Birthday */}
              {/* <div className="space-y-2">
                <Label>Birthday</Label>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-black border-gray-700 text-white"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-black border-gray-700 text-white">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div> */}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  className="bg-gray-800 hover:bg-gray-700"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-amber-600 hover:bg-amber-700"
                  type="submit"
                >
                  Add Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProfile;
