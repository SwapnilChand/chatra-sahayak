"use client";

import { useState } from "react";
import LandingSection from "@/components/landing-section";
import FormSection from "@/components/form-section";
import ResultsSection from "@/components/results-section";
import { z } from "zod";
import { formSchema } from "@/components/form-section";

type ScholarshipFormData = z.infer<typeof formSchema>;

interface ScholarshipResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<
    "landing" | "form" | "results"
  >("landing");
  const [formData, setFormData] = useState<ScholarshipFormData>({
    age: "",
    gender: "",
    caste: "",
    religion: "",
    familyIncome: "",
    academicPerformance: "",
    location: "",
    gpa: "",
    fieldOfStudy: "",
    institutionType: "",
    familyOccupation: "",
  });
  const [scholarships, setScholarships] = useState<ScholarshipResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setCurrentStep("form");
  };

  const handleFormSubmit = async (data: ScholarshipFormData) => {
    setFormData(data);
    setIsLoading(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: buildSearchQuery(data),
        }),
      });

      const result = await response.json();
      setScholarships(result.results || []);
      setCurrentStep("results");
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildSearchQuery = (data: ScholarshipFormData) => {
    const gender = data.gender || "all";
    const location = data.location || "all locations";
    const fieldOfStudy = data.fieldOfStudy || "all fields";
    const academicPerformance = data.academicPerformance || "any";
    const familyIncome = data.familyIncome || "not specified";
    const familyOccupation = data.familyOccupation || "not specified";
    const caste = data.caste || "not specified";
    const religion = data.religion || "not specified";
    const institutionType = data.institutionType || "any";
    const age = data.age || "any";
    const gpa = data.gpa || "not specified";

    return `Find scholarships for ${gender} students in ${location} studying ${fieldOfStudy} with ${academicPerformance} academic performance. 
    Family background: income ${familyIncome}, occupation ${familyOccupation}, caste ${caste}, religion ${religion}. Looking for scholarships in ${institutionType} institutions. Additional details: Age ${age}, GPA ${gpa}`;
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {currentStep === "landing" && <LandingSection onStart={handleStart} />}
      {currentStep === "form" && (
        <FormSection onSubmit={handleFormSubmit} isLoading={isLoading} />
      )}
      {currentStep === "results" && (
        <ResultsSection
          scholarships={scholarships}
          onBackToForm={handleBackToForm}
          formData={formData}
        />
      )}
    </main>
  );
}
