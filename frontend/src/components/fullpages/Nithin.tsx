import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";

interface PropertyRegistrationFormProps {
  propertyId: string;
}

export default function PropertyRegistrationForm({ propertyId }: PropertyRegistrationFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    propertyId: propertyId,
    propertyName: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch property name based on propertyId
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`https://api.rentamigo.in/api/property/${propertyId}`);
        if (!response.ok) throw new Error("Property not found");
        
        const data = await response.json();
        setFormData((prev) => ({ ...prev, propertyName: data.propertyName }));
      } catch (error) {
        console.error("Error fetching property details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch property details.",
        });
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle OTP sending
  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.rentamigo.in/api/property/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.rentamigo.in/api/property/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.rentamigo.in/api/property/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isVerified: true }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast({
        title: "Success!",
        description: "Your details have been successfully submitted.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      setFormData({ name: "", email: "", contactNumber: "", propertyId, propertyName: formData.propertyName });
      setOtpSent(false);
      setIsVerified(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 mt-16">
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Property Enquiry Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label>Property ID</Label>
                <Input value={propertyId} disabled />
              </div>
              <div className="space-y-2">
                <Label>Property Name</Label>
                <Input value={formData.propertyName} disabled />
              </div>

              {!isVerified && (
                <Button type="button" onClick={handleSendOtp} disabled={isLoading || otpSent} className="w-full">
                  {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : "Send OTP"}
                </Button>
              )}

              {otpSent && !isVerified && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                  <Button type="button" onClick={handleVerifyOtp} disabled={isLoading} className="w-full">
                    {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : "Verify OTP"}
                  </Button>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <LoaderIcon className="h-4 w-4 animate-spin mr-2" /> : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
