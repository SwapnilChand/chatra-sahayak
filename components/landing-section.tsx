"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingSectionProps {
  onStart: () => void;
}

export default function LandingSection({ onStart }: LandingSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Chatra Shayak
          </h1>
          <p className="text-xl text-gray-600 md:text-2xl">
            Your AI-powered scholarship finder
          </p>
        </div>

        <p className="text-lg text-gray-700">
          Discover scholarships tailored to your caste and religious background
          across local, government, and state college institutions.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={onStart}
            size="lg"
            className="px-8 py-6 text-lg bg-indigo-600 hover:bg-indigo-700"
          >
            Find Scholarships <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-500">
            Answer a few questions to find scholarships that match your profile
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-indigo-600">
              Personalized Results
            </h3>
            <p className="mt-2 text-gray-600">
              Get scholarship recommendations based on your unique background
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-indigo-600">
              Comprehensive Search
            </h3>
            <p className="mt-2 text-gray-600">
              Access scholarships from various institutions and organizations
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-indigo-600">Save Time</h3>
            <p className="mt-2 text-gray-600">
              Find relevant opportunities without hours of manual searching
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
