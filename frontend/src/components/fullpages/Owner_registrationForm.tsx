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
    propertyId: propertyId, // ✅ Kept for backend submission
    propertyName: "", // ✅ Kept for backend submission
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch property name based on propertyId
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/properties/propertyds/${propertyId}`);
        if (!response.ok) throw new Error("Property not found");
        
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          propertyName: data.propertyName,
          userId: data.userId, // ✅ Added
          username: data.username, // ✅ Added
          role: data.role, // ✅ Added
        }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:8000/api/property/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isVerified: true,
        }),
      });
  
      if (response.status === 409) {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Duplicate Enquiry",
          description: errorData.message || "You have already submitted an enquiry for this property.",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
        return;
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }
  
      toast({
        title: "Success!",
        description: "Your details have been successfully submitted.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
  
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        contactNumber: "",
      }));
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
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
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ✅ Property ID & Property Name hidden from display but still sent to backend */}
              <input type="hidden" name="propertyId" value={formData.propertyId} />
              <input type="hidden" name="propertyName" value={formData.propertyName} />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <LoaderIcon className="h-4 w-4 animate-spin mr-2" /> : null}
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
  