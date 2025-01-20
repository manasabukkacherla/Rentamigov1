import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function OTPVerificationForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    propertyName: "",
    locality: "",
    city: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setShowPhoneVerification(true);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const formattedNumber = `+91${formData.contactNumber.replace(/\D/g, "")}`;

      const response = await fetch("http://localhost:8000/api/verify/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formattedNumber,
          channel: "sms",
          locale: "en",
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

  const verifyOTP = async () => {
    setIsLoading(true);
    try {
      const formattedNumber = `+91${formData.contactNumber.replace(/\D/g, "")}`;

      const response = await fetch("http://localhost:8000/api/verify/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formattedNumber,
          code: otp,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      setVerificationStatus("success");
      setIsVerified(true);
      toast({
        title: "Success",
        description: "Phone number verified successfully!",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerificationStatus("error");
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
    const formattedNumber = `+91${formData.contactNumber.replace(/\D/g, "")}`;

    try {
      const response = await fetch(
        "http://localhost:8000/api/owner-intrst-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobileNo: formattedNumber,
            propertyName: formData.propertyName,
            locality: formData.locality,
            city: formData.city,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit form");

      toast({
        title: "Success!",
        description: "Your details have been successfully submitted.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      const emailPayload = {
        content:
          "We have received your request to list your property. Our team will get in touch with you shortly.",
        subject: "Property Listing Request Received",
      };

      await Promise.all([
        fetch("http://localhost:8000/api/email/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...emailPayload,
            toEmailAddress: formData.email,
          }),
        }),
        fetch("http://localhost:8000/api/email/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...emailPayload,
            toEmailAddress: "vikranth@rentamigo.in",
            content: `New Property Owner Interest:
              Name: ${formData.name}
              Email: ${formData.email}
              Contact: ${formattedNumber}
              Property: ${formData.propertyName}
              Location: ${formData.locality}, ${formData.city}`,
          }),
        }),
      ]);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    setIsSubmitting(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 mt-16">
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Property Owner Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property Name</Label>
                <Input
                  id="propertyName"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locality">Locality</Label>
                <Input
                  id="locality"
                  name="locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
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
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  disabled={otpSent && isVerified}
                  className="flex-1"
                />
                {!isVerified && (
                  <Button
                    type="button"
                    onClick={handleVerify}
                    disabled={isLoading || otpSent}
                    className="w-[120px]"
                  >
                    {isLoading ? (
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                    ) : (
                      "Verify"
                    )}
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
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={verifyOTP}
                    disabled={isLoading}
                    className="w-[120px]"
                  >
                    {isLoading ? (
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </div>
              </div>
            )}

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
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
