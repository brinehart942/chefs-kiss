"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
  SubmitHandler,
  Path,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";

import React from "react";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "../ImageUpload";

import { toast } from "@/hooks/use-toast";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit = async (data: T) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "Signed in successfully"
          : "Signed up successfully",
      });

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2-xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields to gain access"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full max-w-none"
        >
          {Object.keys(defaultValues).map((field) => {
            console.log("Rendering field:", field, "for type:", type);
            return (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <ImageUpload onFileChange={field.onChange} />
                      ) : (
                        <Input
                          required
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          {...field}
                          className="form-input"
                        />
                      )}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
