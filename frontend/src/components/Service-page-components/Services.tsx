"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Service {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Property Management",
    shortDescription: "Complete end-to-end property management solutions",
    description:
      "Comprehensive property management including tenant screening, rent collection, maintenance, and more.",
  },
  {
    id: 2,
    title: "Tenant Verification",
    shortDescription: "Thorough background checks for tenants",
    description:
      "Detailed verification of potential tenants including background checks, employment verification, and previous rental history.",
  },
  {
    id: 3,
    title: "Rental Agreement",
    shortDescription: "Legal documentation and agreement services",
    description:
      "Professional rental agreement preparation with all necessary legal terms and conditions.",
  },
  {
    id: 4,
    title: "Property Maintenance",
    shortDescription: "Regular upkeep and maintenance services",
    description:
      "Regular maintenance, repairs, and emergency services for your property.",
  },
  {
    id: 5,
    title: "Rent Collection",
    shortDescription: "Hassle-free rent collection service",
    description:
      "Timely rent collection and payment processing with detailed financial reporting.",
  },
  {
    id: 6,
    title: "Property Marketing",
    shortDescription: "Strategic property listing and marketing",
    description:
      "Professional photography, listings, and marketing strategies to attract quality tenants.",
  },
  {
    id: 7,
    title: "Legal Compliance",
    shortDescription: "Property law compliance assistance",
    description:
      "Ensuring your property meets all legal requirements and regulations.",
  },
  {
    id: 8,
    title: "Property Inspection",
    shortDescription: "Detailed property inspection services",
    description:
      "Regular property inspections with detailed reports and documentation.",
  },
  {
    id: 9,
    title: "Utility Management",
    shortDescription: "Complete utility handling services",
    description: "Management of all utility connections, bills, and transfers.",
  },
  {
    id: 10,
    title: "Security Services",
    shortDescription: "Property security solutions",
    description: "24/7 security monitoring and management for your property.",
  },
  {
    id: 11,
    title: "Interior Design",
    shortDescription: "Professional interior designing",
    description: "Expert interior design services to enhance property value.",
  },
  {
    id: 12,
    title: "Property Insurance",
    shortDescription: "Insurance assistance services",
    description: "Guidance and assistance with property insurance matters.",
  },
  {
    id: 13,
    title: "Tax Management",
    shortDescription: "Property tax handling services",
    description: "Management of property taxes and related documentation.",
  },
  {
    id: 14,
    title: "Renovation Services",
    shortDescription: "Property renovation and upgrades",
    description: "Complete renovation and property upgrade services.",
  },
  {
    id: 15,
    title: "Pest Control",
    shortDescription: "Regular pest control services",
    description: "Professional pest control and prevention services.",
  },
  {
    id: 16,
    title: "Garden Maintenance",
    shortDescription: "Landscaping and garden care",
    description: "Professional landscaping and regular garden maintenance.",
  },
  {
    id: 17,
    title: "Documentation",
    shortDescription: "Property documentation services",
    description:
      "Management of all property-related documentation and paperwork.",
  },
  {
    id: 18,
    title: "Tenant Relations",
    shortDescription: "Tenant communication management",
    description:
      "Professional handling of tenant relations and communications.",
  },
];

const serviceCheckboxes = [
  { id: 1, label: "Sale Agreement Drafting & Execution" },
  { id: 2, label: "Sale Deed Execution & Property Registration" },
  { id: 3, label: "E-Aasthi Khata Conversion (A/B to E Khata)" },
  { id: 4, label: "Khata Transfer" },
  { id: 5, label: "BESCOM Name Transfer" },
  { id: 6, label: "Tax Name Change" },
  { id: 7, label: "Tax Assessment" },
  { id: 8, label: "Property Valuation" },
  { id: 9, label: "Drafting of Sale Agreement" },
  { id: 10, label: "Drafting Of Sale Deed" },
  { id: 11, label: "Review Of Sale Agreement" },
  { id: 12, label: "Review Of Sale Deed" },
  { id: 13, label: "Tan Assistance" },
  { id: 14, label: "Family Tree Approved copy" },
  { id: 15, label: "Procurement of RTC(Mutation)" },
  { id: 16, label: "Drafting and registration Of GPA" },
  { id: 17, label: "Procurement of Encumbrance Certificate for last 20 years" },
  { id: 18, label: "LTE Certificate (Lower Tax exemption)" },
];

export default function ServicesPage() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesPerPage = currentPage === 0 ? 10 : 8; // 10 on first page, 8 on second
  const totalPages = 2; // Since we have 18 services total

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const currentServices = services.slice(
    currentPage === 0 ? 0 : 10,
    currentPage === 0 ? 10 : 18
  );

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setShowOtpField(false);
    setIsOtpVerified(false);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+91${phoneNumber}`; // Adding +91 prefix
      const response = await axios.post(
        "http://localhost:8000/api/verify/start",
        {
          to: formattedPhoneNumber,
          channel: "sms",
          locale: "en",
        }
      );

      if (response.data.success) {
        toast({
          title: "OTP Sent",
          description: "Please check your phone for the verification code.",
          duration: 5000,
        });
        setShowOtpField(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response?.data?.error ||
            "Failed to send OTP. Please try again.",
          duration: 5000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          duration: 5000,
        });
      }
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const formattedPhoneNumber = `+91${phoneNumber}`; // Adding +91 prefix
      const response = await axios.post(
        "http://localhost:8000/api/verify/check",
        {
          to: formattedPhoneNumber,
          code: otp,
        }
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Phone number verified successfully!",
          duration: 5000,
        });
        setIsOtpVerified(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response?.data?.message || "Invalid OTP. Please try again.",
          duration: 5000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          duration: 5000,
        });
      }
      setIsOtpVerified(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // Convert selectedServices array of IDs to array of service labels
    const selectedServiceLabels = selectedServices
      .map(
        (id) => serviceCheckboxes.find((service) => service.id === id)?.label
      )
      .filter((label) => label !== undefined) as string[];

    try {
      const response = await axios.post(
        "http://localhost:8000/api/service-enquiry",
        {
          name,
          email,
          mobileNo: phoneNumber,
          selectedServices: selectedServiceLabels,
        }
      );

      if (response.status === 201) {
        const emailContent = `
        Welcome to RentAmigo!
        
        Dear ${name},
        
        Thank you for your interest in our services. We have received your enquiry for the following services:
        ${selectedServiceLabels.join(", ")}
        
        Our team will contact you shortly on your provided phone number: ${phoneNumber}
        
        Best regards,
        RentAmigo Team
      `;

        await axios.post("http://localhost:8000/api/email/send-email", {
          content: emailContent,
          toEmailAddress: email,
          subject: "Welcome to RentAmigo - Service Enquiry Confirmation",
        });

        const companyEmailContent = `
New Service Enquiry:

User Details:
------------
Name: ${name}
Email: ${email}
Phone: ${phoneNumber}

Requested Services:
-----------------
${selectedServiceLabels.join("\n")}

Please follow up with the customer regarding their service request.
`;

        await axios.post("http://localhost:8000/api/email/send-email", {
          content: companyEmailContent,
          toEmailAddress: "vikranth@rentamigo.in",
          subject: "New Service Enquiry Received",
        });

        // Show success toast
        toast({
          title: "Enquiry Submitted",
          description:
            "We've received your enquiry and will get back to you soon.",
          duration: 5000,
        });

        // Reset form and states
        setSelectedService(null);
        setShowForm(false);
        setSelectedServices([]);
        setPhoneNumber("");
        setShowOtpField(false);
        setOtp("");
        setIsOtpVerified(false);
      }
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response?.data?.error ||
            "Failed to submit enquiry. Please try again.",
          duration: 5000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... previous imports and code remain same

  return (
    <div className="bg-background p-8" id="services">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Our Services</h1>

        {/* Desktop pagination - only visible on desktop */}
        <div className="mb-8 hidden md:flex justify-end">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage === 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-${
            currentPage === 0 ? "5" : "4"
          }`}
        >
          {currentServices.map((service) => (
            <Card key={service.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedService(service);
                    setShowForm(false);
                  }}
                >
                  Know More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mobile pagination - only visible on mobile, centered below services */}
        <div className="mt-8 flex justify-center md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (currentPage === 0) {
                handleNext();
                // Scroll to top of services section after loading more
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                setCurrentPage(0);
              }
            }}
            className="w-12 h-12"
          >
            <ChevronDown
              className={`h-6 w-6 transition-transform ${
                currentPage === 1 ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        <Dialog
          open={!!selectedService}
          onOpenChange={() => {
            setSelectedService(null);
            setShowForm(false);
            setSelectedServices([]);
            setPhoneNumber("");
            setShowOtpField(false);
            setOtp("");
            setIsOtpVerified(false);
          }}
        >
          <DialogContent className="sm:max-w-[600px]">
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      {selectedService?.title}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedService(null)}
                    >
                      {/* <X className="h-4 w-4" /> */}
                    </Button>
                  </div>
                  <p className="text-muted-foreground">
                    {selectedService?.description}
                  </p>
                  <Button onClick={() => setShowForm(true)} className="w-full">
                    Enquire Now
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Enquiry Form</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedService(null)}
                    >
                      {/* <X className="h-4 w-4" /> */}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" name="name" required />{" "}
                    {/* Added name attribute */}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" required />{" "}
                    {/* Added name attribute */}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        required
                      />
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!phoneNumber || showOtpField}
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                  {showOtpField && (
                    <div className="space-y-2">
                      <label htmlFor="otp" className="text-sm font-medium">
                        OTP
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          id="otp"
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={!otp || isOtpVerified}
                        >
                          Verify OTP
                        </Button>
                      </div>
                    </div>
                  )}
                  {isOtpVerified && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Services Required
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-4 border rounded-lg">
                        {serviceCheckboxes.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-start space-x-2"
                          >
                            <Checkbox
                              id={`service-${service.id}`}
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={() =>
                                handleServiceToggle(service.id)
                              }
                            />
                            <Label
                              htmlFor={`service-${service.id}`}
                              className="text-sm leading-tight"
                            >
                              {service.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isOtpVerified || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </div>
  );
}
