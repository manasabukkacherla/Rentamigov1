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

export default function PropertyRegistrationForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  {
    /*const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.rentamigo.in/api/property/send-otp", {
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
  };*/
  }

  {
    /*const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.rentamigo.in/api/property/verify-otp", {
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
  };*/
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    {/*if (!isVerified) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please verify your phone number before submission.",
      });
      return;
    }*/}

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.rentamigo.in/api/property/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            isVerified: true,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit form");

      toast({
        title: "Success!",
        description: "Your details have been successfully submitted.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setFormData({ name: "", email: "", contactNumber: "" });
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
          <CardTitle>Property Enquiry Form</CardTitle>
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
                  className="hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
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
                  className="hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
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
                    className="flex-1 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                  />
                  {/* {!isVerified && (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading || otpSent}
                      className="w-[120px]"
                    >
                      {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : "Send OTP"}
                    </Button>
                  )}*/}
                </div>
              </div>

              {/*{otpSent && !isVerified && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="flex-1 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
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
              )}*/}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
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
