"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { formSchema } from "@/components/form-section";
import { z } from "zod";

type ScholarshipFormData = z.infer<typeof formSchema>;

interface ScholarshipResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

interface ResultsSectionProps {
  scholarships: ScholarshipResult[];
  onBackToForm: () => void;
  formData: ScholarshipFormData;
}

export default function ResultsSection({
  scholarships,
  onBackToForm,
  formData,
}: ResultsSectionProps) {
  return (
    <div className="container max-w-4xl py-12 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Scholarship Results</h2>
        <Button variant="outline" onClick={onBackToForm}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Modify Search
        </Button>
      </div>

      <Alert className="mb-6">
        <InfoIcon className="w-4 h-4" />
        <AlertTitle>Search Summary</AlertTitle>
        <AlertDescription>
          Showing scholarships for {formData.gender || "all"} students in{" "}
          {formData.location || "all locations"} studying{" "}
          {formData.fieldOfStudy || "all fields"} with {formData.caste} caste
          and {formData.religion} religious background.
        </AlertDescription>
      </Alert>

      {scholarships.length > 0 ? (
        <div className="grid gap-6">
          {scholarships.map((scholarship, index) => (
            <ScholarshipCard key={index} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3 rounded-full bg-gray-100">
                <InfoIcon className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-medium">No Scholarships Found</h3>
              <p className="text-gray-500 max-w-md">
                We couldn&apos;t find any scholarships matching your criteria.
                Try adjusting your search parameters for better results.
              </p>
              <Button onClick={onBackToForm} className="mt-4">
                Modify Search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface ScholarshipCardProps {
  scholarship: ScholarshipResult;
}

function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  // Extract domain from URL for display
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{scholarship.title}</CardTitle>
        <CardDescription>
          <a
            href={scholarship.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            {getDomain(scholarship.url)}{" "}
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32">
          <p className="text-gray-700">{scholarship.content}</p>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-gray-50 p-4">
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            {scholarship.score
              ? `Relevance: ${Math.round(scholarship.score * 100)}%`
              : "Scholarship"}
          </Badge>
        </div>
        <Button asChild size="sm">
          <a href={scholarship.url} target="_blank" rel="noopener noreferrer">
            Apply Now <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
