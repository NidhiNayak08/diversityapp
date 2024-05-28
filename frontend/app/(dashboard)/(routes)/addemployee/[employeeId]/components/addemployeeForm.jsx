"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Edit, Trash, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/ui/heading";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, "First name should have at least 2 characters"),
  surname: z.string().min(2, "Last name should have at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  job: z.enum(
    ["Senior Manager", "Manager", "Trainee", "Admins"],
    "Please select a valid job role"
  ),
  dob: z.date({ invalid_type_error: "Please select a valid date" }).nullable(),
  gender: z.enum(
    ["Male", "Female", "Transgender", "Prefer Not to Say"],
    "Please select a valid gender"
  ),
  phone: z.string().min(10, "phone number should have at least 10 digits"),
  disability: z.enum(["Yes", "No"], "Please select a valid option"),
  nationality: z.string().min(2, "Please select a valid nationality"),
});

const AddEmployeeForm = ({ initialdata }) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title =
    initialdata != null ? "Edit Employee Details" : "Add Employee details";
  const description =
    initialdata != null ? "Manage employee details" : "Create new Employee ";
  const buttontext = initialdata != null ? "Edit" : "Submit";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialdata || {
      name: "",
      surname: "",
      email: "",
      job: "",
      dob: null,
      gender: "",
      phone: "",
      disability: "",
      nationality: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (initialdata != null && values) {
        await axios.patch(`/api/addemployee/${params.employeeId}`, values);
      } else {
        await axios.post(`/api/addemployee/`, values);
      }
      router.refresh();
      router.push(`/addemployee`);
      toast.success("Employee Added Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/addemployee/${params.employeeId}`);
      router.refresh();
      router.push(`/addemployee`);
      toast.success("Employee deleted Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />
        {initialdata && (
          <Button variant="destructive" className="flex " onClick={onDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center mt-8 w-[60%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-width-md w-full flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Nidhi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Nayak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger value={field.value}>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Transgender">Transgender</SelectItem>
                        <SelectItem value="Prefer Not to Say">
                          Prefer Not to Say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+91 12345 67890"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nidhi@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Position</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger value={field.value}>
                          <SelectValue placeholder="Select Job Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Senior Manager">
                          Senior Manager
                        </SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Admins">Admins</SelectItem>
                        <SelectItem value="Trainee">Trainee</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="disability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disability Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger value={field.value}>
                          <SelectValue placeholder="Select Disability Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger value={field.value}>
                          <SelectValue placeholder="Select Nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="American">American</SelectItem>
                        <SelectItem value="Australian">Australian</SelectItem>
                        <SelectItem value="Canadian">Canadian</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-28 mt-4 flex  ">
              {initialdata ? (
                <Edit className="h-4 w-4 mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {buttontext}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddEmployeeForm;
