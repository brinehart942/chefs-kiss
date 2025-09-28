"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChefHat, LogIn, UserPlus } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500 p-3 rounded-full">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Chef's Kiss
          </h1>
          <p className="text-gray-600 mt-2">
            Choose how you'd like to get started
          </p>
        </div>

        <div className="space-y-4">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <LogIn className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle className="text-xl">Sign In</CardTitle>
              <CardDescription>
                Already have an account? Sign in to continue your culinary
                journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/sign-in" className="block">
                <Button className="w-full" size="lg">
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <UserPlus className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                New to Chef's Kiss? Create your account and start discovering
                amazing recipes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/sign-up" className="block">
                <Button className="w-full" size="lg" variant="outline">
                  Create Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-500 font-medium text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
