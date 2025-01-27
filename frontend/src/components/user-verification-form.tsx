import React, { useState } from "react";
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
import { LoaderIcon } from "lucide-react";

export default function UserVerificationForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "", // Updated to "mobileNo" for consistency
    propertyName: "",
    locality: "",
    city: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.rentamigo.in/api/owner-interest/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: formData.mobileNo }),
      });

      if (!response.ok) throw new Error("Failed to send OTP");

      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your phone number.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.rentamigo.in/api/owner-interest/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: formData.mobileNo, otp }),
      });

      if (!response.ok) throw new Error("Invalid OTP");

      setIsVerified(true);
      toast({
        title: "Success",
        description: "Phone number verified successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP. Please try again.",
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

    try {
      const response = await fetch("https://api.rentamigo.in/api/owner-interest/owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isVerified: true }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast({
        title: "Success!",
        description: "Your details have been successfully submitted.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobileNo: "",
        propertyName: "",
        locality: "",
        city: "",
      });
      setOtp("");
      setOtpSent(false);
      setIsVerified(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 mt-16">
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Property Owner Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  disabled={otpSent && isVerified}
                  required
                />
                {!isVerified && (
                  <Button onClick={sendOtp} disabled={isLoading || otpSent}>
                    {isLoading ? <LoaderIcon className="animate-spin" /> : "Send OTP"}
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
                  <Button onClick={verifyOtp} disabled={isLoading}>
                    {isLoading ? <LoaderIcon className="animate-spin" /> : "Verify OTP"}
                  </Button>
                </div>
              </div>
            )}
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
            <Button type="submit" disabled={!isVerified}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
