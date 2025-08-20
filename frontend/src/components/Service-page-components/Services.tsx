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
import ServiceEnquiryForm from "./Serviceform";

interface Service {
  id: number;
  title: string;
  description: string[];
  shortDescription: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "E-Asthi Khata Conversion",
    shortDescription: "BBPM Khata Transfer from A to E-Asthi",
    description: [
      "Sale deed information",
      "Encumbrance certificate",
      "Documents providing A-Khata status",
      "Previous property tax receipt",
      "Photographs of the property and owner",
      "GPS co-ordinates of the property",
      "BESCOM connection number",
      "Aadhar card of property owners (For e-KYC)",
    ],
  },
  {
    id: 2,
    title: "Khata Transfer",
    shortDescription:
      "Revenue records transfer from previous owner to current owner",
    description: [
      "Through Sale Deed",
      "Registered sale deed",
      "Latest property tax paid receipt",
      "Encumbrance certificate (Form 15) from the date of the sale deed to current date",
      "Through Inheritance",
      "Previous title deed or possession certificate (if allotted by a government agency)",
      "Latest property tax paid receipt",
      "Copy of the Will",
      "Original death certificate of the previous Khata holder",
      "Encumbrance certificate (Form 15) from the date of the sale deed to current date",
      "Notarized family tree and No Objection Certificate (NOC) from family members (if the Will is unregistered)",
      "Through Inheritance (Without Will)",
      "Previous title deed or possession certificate",
      "Latest property tax paid receipt",
      "Partition deed",
      "Original death certificate of the previous Khata holder",
      "Notarized family tree & NOC of family members",
      "Encumbrance certificate (Form 15) from the date of the sale deed to current date",
      "Through Gift Deed",
      "Previous title deed or possession certificate",
      "Registered gift deed",
      "Latest property tax paid receipt",
      "Encumbrance certificate (Form 15) from the date of the sale deed to current date",
      "Through Court Decree",
      "Court decree",
      "Previous title deed or possession certificate",
      "Latest property tax paid receipt",
      "Encumbrance certificate (Form 15) from the date of the sale deed to current date",
      "Aadhar card of property owners (For e-KYC)",
    ],
  },
  {
    id: 3,
    title: "Bescom Transfer",
    shortDescription:
      "Name change on BESCOM Electricity Bill from previous owner to current owner",
    description: [
      "Proof of ownership - Registered Sale Deed or Title Deed",
      "Latest property tax paid receipt or Khata Certificate",
      "NOC from previous Consumer (Previous owner consenting to transfer)",
      "Indemnity Bond",
      "Photocopy of license or clearance issued in his favour by Local Authority (if required)",
      "Undertaking to pay outstanding dues or short claims arise or detected later stage, period prior to the date of transfer",
    ],
  },
  {
    id: 4,
    title: "Tax Name Change",
    shortDescription:
      "Name change on Tax receipt from previous owner to current owner",
    description: [
      "Ownership Proof",
      "Title Deed (Sale Deed/Gift Deed/Partition Deed)",
      "Khata Certificate & Extract",
      "Latest property tax paid receipt",
      "Proof of Identity (PAN Card/Aadhar Card/Passport)",
      "Proof of Address (Aadhar Card/Electricity bill or Water bill)",
      "Proof of Name Change Basis",
      "For Sale or Transfer of Property",
      "Registered Sale Deed: Showing the transfer of ownership",
      "Encumbrance Certificate (EC): To confirm the property has no pending liabilities",
      "For Inherited Property",
      "Will or Probate Copy: If ownership is based on a Will",
      "Legal Heir Certificate: In case of inheritance without a Will",
      "Death Certificate: If the property was previously owned by a deceased person",
      "For Gifted Property",
      "Registered Gift Deed: As proof of transfer of ownership",
      "For Name Correction",
      "Affidavit: Declaring the correct name and explaining the discrepancy",
      "Gazette Notification: If the name has officially changed (e.g., post-marriage or for any other legal reason)",
      "Power of Attorney (POA): If the application is being made by an authorized representative",
      "No Objection Certificate (NOC): From other legal heirs or co-owners, if applicable",
    ],
  },
  {
    id: 5,
    title: "Tax Assessment",
    shortDescription: "Tax Assessments & Assisting in Tax Payments",
    description: [
      "Proof of Ownership (Title Deed, Possession Certificate, Allotment Letter)",
      "Approved Building Plan (Sanctioned Building Plan)",
      "Khata Certificate & Extract",
      "Previous Tax Receipts",
      "Measurement & Layout Details (Plot/Layout Plan, Area Statement)",
      "Occupancy Certificate (OC from Local Authority)",
      "Identity & Address Proof (PAN Card, Aadhaar Card, Passport, or Voter ID & Electricity/Water Bills)",
      "Construction Details (Completion Certificate, Contractor/Builder Bills)",
      "Proof of Use (Declaration of Property Use)",
      "Encumbrance Certificate",
      "Power of Attorney (POA)",
      "Change of Land Use Certificate",
      "NOC from society or builder",
      "Photographs of property",
    ],
  },
  {
    id: 6,
    title: "Property Valuation",
    shortDescription:
      "Determining market value of property by certified experts",
    description: [
      "Proof of Ownership (Title Deed, Possession Certificate, Allotment Letter, Encumbrance Certificate)",
      "Property Details (Khata Certificate & Extract, Approved Building Plan, Completion Certificate, Occupancy Certificate, Area Statement, Plot/Layout Plan)",
      "Tax & Utility Details (Property Tax Receipts, Electricity/Water Bill Receipts)",
      "Construction & Maintenance Details (Contractor/Builder Bills, Maintenance Receipts)",
      "Identity & Address Proof (PAN Card, Aadhaar Card, Passport, or Voter ID & Electricity/Water Bills)",
      "Market & Legal Information (Recent Sale Deeds in the Area, NOC from Housing Society)",
      "Bank Loan Details (If Applicable)",
      "Change of Land Use Certificate",
      "Court Orders (if any)",
      "Power of Attorney (POA)",
    ],
  },
  {
    id: 7,
    title: "Family Tree Approved Copy",
    shortDescription: "Certified Copy of Family Tree",
    description: [
      "Proof of Identity (PAN Card, Aadhar Card, Passport, Driving License, or Voter ID)",
      "Address Proof of Applicant (Aadhar Card, Electricity/Water Bill)",
      "Proof of Relationship (Birth Certificate, Marriage Certificate, Death Certificate, Old Family Tree Document if applicable)",
      "Supporting Documents for the Head of Family (Identity Proof, Address Proof)",
      "Affidavit (Notarized)",
      "Property Related Documents (Title Deed, Khata Certificate, EC)",
      "Witness Statement",
      "Court Orders (Legal Heir Certificate, Succession Certificate, Judicial Orders)",
    ],
  },
  {
    id: 8,
    title: "Procurement of RTC (Mutation)",
    shortDescription: "RTC Mutation Procurement",
    description: [
      "Proof of Ownership Transfer",
      "For Sale (Registered Sale Deed)",
      "For Inheritance (Legal Heir Certificate, Death Certificate, Will or Succession Certificate, Affidavit)",
      "For Gift (Registered Gift Deed)",
      "For Partition (Partition Deed, Court Order)",
      "For Court Decree (Court Decree or Order)",
      "Identity & Address Proof (PAN Card, Aadhaar Card, Passport, or Voter ID & Electricity/Water Bills)",
      "Existing RTC Documents (Previous RTC Copy, Survey Map/Sketch)",
      "Property Tax Documents",
      "Revenue Documents (Khata Certificate / Extract, EC, RTC Fee Payment Receipts, Land Revenue Receipts)",
      "Affidavit (Notarized)",
      "NOC & Consent Letters",
    ],
  },
  {
    id: 9,
    title: "Drafting & Registration of GPA",
    shortDescription: "Registering General Power of Attorney",
    description: [
      "Identity & Address Proof (PAN Card, Aadhaar Card, Passport, or Voter ID & Electricity/Water Bills)",
      "Proof of Ownership (EC, Latest Property Receipt, Title/Sale Deed)",
      "Passport Sized Photographs",
      "Stamp Duty Payment (Stamp Paper, Stamp Duty Payment Receipt)",
      "Witness Details (Identity Proof of Witness & Photographs)",
      "Affidavit (Notarized)",
      "Special Requirements for NRI Principals (Apostilled or Attested GPA, Passport Copy)",
      "Other Documents (Relationship Proof, Court Order)",
    ],
  },
  {
    id: 10,
    title: "Procurement of Encumbrance Certificate (For Last 20 Years)",
    shortDescription: "Last 20 Years EC",
    description: [
      "Property Details (Survey/Plot/House Number, Extent/Area of Property, Property Address)",
      "Ownership Details",
      "Identity & Address Proof (PAN Card, Aadhaar Card, Passport, or Voter ID & Electricity/Water Bills)",
      "Sale Deed or Title Deed",
      "Previous EC (if available)",
    ],
  },
  {
    id: 11,
    title: "LTE (Lower Tax Exemption) Certificate",
    shortDescription: "Lower Tax Exemption for NRI Property Sale",
    description: [
      "Property Details (Survey/Plot/House Number, Extent/Area of Property, Property Address)",
      "Ownership Details",
      "Identity & Address Proof (PAN Card, Aadhaar Card, Passport, or Voter ID & Electricity/Water Bills)",
      "Sale Deed or Title Deed",
      "Previous EC (if available)",
    ],
  },
  {
    id: 12,
    title: "TAN Assistance",
    shortDescription: "Applying TAN for Property Purchaser",
    description: [
      "Identity & Address Proof (PAN Card, Aadhaar Card, Passport, or Voter ID & Electricity/Water Bills)",
      "Property Details (Sale Agreement/Agreement to Sell, Property Location Details)",
      "Details of Seller (PAN of the Seller, Identity Proof of the Seller)",
      "Authorized Signatory Documents (Authorization Letter)",
    ],
  },
  {
    id: 13,
    title: "Review of Sale Deed",
    shortDescription: "Reviewing of Sale Deed",
    description: [
      "We help in reviewing a sale deed through our expert legal advisors It is critical to ensure that the property transaction is legally sound and protects the interests of both the buyer and the seller.",
    ],
  },
  {
    id: 14,
    title: "Review of Sale Agreement",
    shortDescription: "Review of Sale Agreement",
    description: [
      "Our expert legal team helps in reviewing sale agreement which is actually a crucial role in a property transaction. And we ensures that the agreement  protects your interests and accurately reflects the terms agreed upon between the busyer and seller.",
    ],
  },
  {
    id: 15,
    title: "Drafting of Sale Deed",
    shortDescription: "Sale Deed Drafting",
    description: [
      "Our legal team helps in drafting sale deed that outlines the terms and conditions of the sale legally",
    ],
  },
  {
    id: 16,
    title: "Drafting of Sale Agreement",
    shortDescription: "Sale Agreement Drafting",
    description: [
      "We help in the process of creating legal document that outlines the terms of property transfer from seller to a buyer						",
    ],
  },
];

const serviceCheckboxes = services.map((service) => ({
  id: service.id,
  label: service.title,
}));

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

  const servicesPerPage = 10; // Display 10 services per page
  const totalPages = Math.ceil(services.length / servicesPerPage); // Dynamically calculate total pages

  const currentServices =
    currentPage === totalPages - 1
      ? services // Show all services if on the last page
      : services.slice(0, 7); // Show only the first 7 services on the first page

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
        "https://api.rentamigo.in//api/verify/start",
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
        "https://api.rentamigo.in//api/verify/check",
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
        "https://api.rentamigo.in//api/service-enquiry",
        {
          name,
          email,
          mobileNo: phoneNumber,
          selectedServices: selectedServiceLabels,
        }
      );

      if (response.status === 201) {
        const emailContent = `
        Welcome to PropAmigo!
        
        Dear ${name},
        
        Thank you for your interest in our services. We have received your enquiry for the following services:
        ${selectedServiceLabels.join(", ")}
        
        Our team will contact you shortly on your provided phone number: ${phoneNumber}
        
        Best regards,
        PropAmigo Team
      `;

        await axios.post(
          "https://api.rentamigo.in//api/email/send-email",
          {
            content: emailContent,
            toEmailAddress: email,
            subject: "Welcome to PropAmigo - Service Enquiry Confirmation",
          }
        );

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

        await axios.post(
          "https://api.rentamigo.in//api/email/send-email",
          {
            content: companyEmailContent,
            toEmailAddress: "vikranth@rentamigo.in",
            subject: "New Service Enquiry Received",
          }
        );

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
        <h1 className="text-3xl font-bold mb-8">Legal Services</h1>

        {/* Desktop pagination - only visible on desktop */}
        <div className="mb-8 hidden md:flex justify-end">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
              }
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentServices.map((service, index) => (
       <Card key={service.id} id={`card-${index + 1}`} className="transition-all hover:shadow-lg">
  <CardHeader>
    <CardTitle className="text-xl">{service.title}</CardTitle>
  </CardHeader>

  <CardContent>
    <p className="text-sm text-muted-foreground mb-2">
      {service.shortDescription}
    </p>

    {/* Show first 2–3 description points */}
    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
      {service.description.slice(0, 3).map((point, idx) => (
        <li key={idx}>{point}</li>
      ))}
    </ul>
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

        {/* Single pagination button - toggles between showing all and showing first 7 */}

        <div className="mt-8 flex justify-center md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (currentPage === 0) {
                // Show all cards
                setCurrentPage(totalPages - 1);
              } else {
                // Show first 7 cards and scroll to the 7th card
                setCurrentPage(0);

                // Scroll to the 7th card
                const seventhCard = document.querySelector(`#card-7`);
                if (seventhCard) {
                  seventhCard.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }
            }}
            className="w-12 h-12"
          >
            <ChevronDown
              className={`h-6 w-6 transition-transform ${
                currentPage === 0 ? "" : "rotate-180"
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
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto p-6">
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
                  <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                    {selectedService?.description.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <Button onClick={() => setShowForm(true)} className="w-full">
                    Enquire Now
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ServiceEnquiryForm />
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
