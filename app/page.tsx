"use client";

import { useState } from "react";
import LandingSection from "@/components/landing-section";
import FormSection from "@/components/form-section";
import ResultsSection from "@/components/results-section";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<
    "landing" | "form" | "results"
  >("landing");
  const [formData, setFormData] = useState({});
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setCurrentStep("form");
  };

  const handleFormSubmit = async (data: any) => {
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

  const buildSearchQuery = (data: any) => {
    return `Find scholarships for ${data.gender} students in ${data.location} studying ${data.fieldOfStudy} with ${data.academicPerformance} academic performance. 
    Family background: income ${data.familyIncome}, occupation ${data.familyOccupation}, caste ${data.caste}, religion ${data.religion}. Looking for scholarships in ${data.institutionType} institutions. Additional details: Age ${data.age}, GPA ${data.gpa}, Disability status: ${data.disability}`;
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
      {/* <Toaster /> */}
    </main>
  );
}
