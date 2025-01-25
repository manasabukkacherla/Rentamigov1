"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";

const availableServices = [
  "E-Asthi Khata Conversion",
  "Khata Transfer",
  "Bescom Transfer",
  "Tax Name Change",
  "Tax Assessment",
  "Property Valuation",
  "Family Tree Approved Copy",
  "RTC Mutation Procurement",
  "GPA Drafting & Registration",
  "Encumbrance Certificate Procurement",
];

export default function ServiceEnquiryForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/service/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/service/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactNumber: formData.contactNumber,
          otp,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      setIsVerified(true);
      toast({
        title: "Success",
        description: "Phone number verified successfully!",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please verify your phone number before submission.",
      });
      return;
    }

    if (selectedServices.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one service.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/api/service/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          isVerified: true,
          selectedServices,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast({
        title: "Success!",
        description: "Your details have been successfully submitted.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      setFormData({ name: "", email: "", contactNumber: "" });
      setSelectedServices([]);
      setOtpSent(false);
      setIsVerified(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 mt-16">
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Service Enquiry Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <div className="flex space-x-2">
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    disabled={otpSent && isVerified}
                    required
                  />
                  {!isVerified && (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading || otpSent}
                    >
                      {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : "Send OTP"}
                    </Button>
                  )}
                </div>
              </div>

              {otpSent && !isVerified && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isLoading}
                    >
                      {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : "Verify OTP"}
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Services</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availableServices.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <Label htmlFor={service}>{service}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !isVerified}
              >
                {isSubmitting ? (
                  <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
