"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContact } from "@/actions/contact";

export interface Province {
  LocationId: number;
  Name: string;
  Code_Local?: string;
  PostOfficeId?: number;
}

interface ContactFormProps {
  provinces: Province[];
  locale: string;
  isVietnamese: boolean;
  onSuccess?: () => void;
}

interface ContactSubmitResponse {
  status: string;
  data: {
    Status: string;
    ReturnMess: string;
  };
}

// Create validation schema with localized messages
const createContactFormSchema = (isVietnamese: boolean) =>
  z
    .object({
      fullName: z
        .string()
        .min(
          2,
          isVietnamese
            ? "Tên phải có ít nhất 2 ký tự"
            : "Name must be at least 2 characters"
        ),
      email: z
        .string()
        .email(isVietnamese ? "Email không hợp lệ" : "Invalid email address"),
      phone: z
        .string()
        .min(
          1,
          isVietnamese
            ? "Vui lòng nhập số điện thoại"
            : "Please enter phone number"
        )
        .regex(
          /^[0-9+\-\s()]+$/,
          isVietnamese
            ? "Số điện thoại không hợp lệ"
            : "Invalid phone number format"
        ),
      province: z
        .string()
        .min(
          1,
          isVietnamese ? "Vui lòng chọn tỉnh thành" : "Please select a province"
        ),
      supportType: z.enum(["quote", "complaint"]),
      code: z.string().optional(),
      note: z
        .string()
        .min(
          10,
          isVietnamese
            ? "Ghi chú phải có ít nhất 10 ký tự"
            : "Note must be at least 10 characters"
        ),
    })
    .refine(
      (data) => {
        // If supportType is complaint, code is required
        if (data.supportType === "complaint") {
          return data.code && data.code.trim().length > 0;
        }
        return true;
      },
      {
        message: isVietnamese
          ? "Vui lòng nhập mã đơn hàng"
          : "Please enter order code",
        path: ["code"],
      }
    );

type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>;

export default function ContactForm({
  provinces,
  locale,
  isVietnamese,
  onSuccess,
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    province: "",
    supportType: "quote",
    code: "",
    note: "",
  });

  // Get UTM parameters from URL
  const utmSource = searchParams.get("utm_source");

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form data with zod schema
      const contactFormSchema = createContactFormSchema(isVietnamese);
      const validatedData = contactFormSchema.parse(formData);

      // Find province name from provinces list
      const selectedProvince = provinces.find(
        (p) => p.LocationId.toString() === formData.province
      );

      // Prepare data for API
      const contactData = {
        ContactId: 0,
        ContactName: validatedData.fullName,
        Phone: validatedData.phone,
        Email: validatedData.email,
        Address: selectedProvince?.Name || "",
        Notes: validatedData.note,
        Code: validatedData.code || "",
        Type: validatedData.supportType === "quote" ? 1 : 2,
        LocationId: parseInt(validatedData.province),
        StatusId: 1,
        utm_source: utmSource || undefined,
      };

      // Call API
      const result = await submitContact(contactData);
      const { success, data } = result;
      console.log(data);
      if (success && (data as any)?.Status === "Ok") {
        toast.success(
          isVietnamese
            ? "Gửi thông tin thành công!"
            : "Information sent successfully!"
        );

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          province: "",
          supportType: "quote",
          code: "",
          note: "",
        });

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.warning(
          (data as any)?.ReturnMess ||
            (isVietnamese
              ? "Gửi thông tin thất bại!"
              : "Failed to submit information!")
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error(
          isVietnamese
            ? "Có lỗi xảy ra. Vui lòng thử lại!"
            : "An error occurred. Please try again!"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-green-dark mb-6">
        {isVietnamese ? "Liên hệ với chúng tôi" : "Contact Us"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Full Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700 font-medium">
              {isVietnamese ? "Họ và tên" : "Full Name"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder={isVietnamese ? "Họ và tên" : "Full Name"}
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="h-9"
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={isVietnamese ? "Mail" : "Email"}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="h-9"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Row 2: Phone & Province */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 font-medium">
              {isVietnamese ? "Số điện thoại" : "Phone Number"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder={isVietnamese ? "Số điện thoại" : "Phone Number"}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="h-9"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="province" className="text-gray-700 font-medium">
              {isVietnamese ? "Chọn khu vực" : "Select Region"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.province}
              onValueChange={(value) => handleChange("province", value)}
            >
              <SelectTrigger
                className="h-12 w-full"
                aria-invalid={!!errors.province}
              >
                <SelectValue
                  placeholder={
                    isVietnamese ? "Chọn tỉnh thành" : "Select Province"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem
                    key={province.LocationId}
                    value={province.LocationId.toString()}
                  >
                    {province.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.province && (
              <p className="text-sm text-red-500">{errors.province}</p>
            )}
          </div>
        </div>

        {/* Row 3: Support Type */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">
            {isVietnamese
              ? "Bạn cần hỗ trợ gì?"
              : "What do you need help with?"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.supportType}
            onValueChange={(value) =>
              handleChange("supportType", value as "quote" | "complaint")
            }
            className="flex flex-wrap gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="quote"
                id="quote"
                className="text-green-primary border-green-primary data-[state=checked]:bg-green-primary"
              />
              <Label htmlFor="quote" className="font-normal cursor-pointer">
                {isVietnamese ? "Tư vấn / Báo giá" : "Consultation / Quote"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="complaint"
                id="complaint"
                className="text-green-primary border-green-primary data-[state=checked]:bg-green-primary"
              />
              <Label htmlFor="complaint" className="font-normal cursor-pointer">
                {isVietnamese ? "Khiếu nại" : "Complaint"}
              </Label>
            </div>
          </RadioGroup>
          {errors.supportType && (
            <p className="text-sm text-red-500">{errors.supportType}</p>
          )}
        </div>

        {/* Row 3.5: Order Code (conditional) */}
        {formData.supportType === "complaint" && (
          <div className="space-y-2">
            <Label htmlFor="code" className="text-gray-700 font-medium">
              {isVietnamese ? "Mã đơn hàng" : "Order Code"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="code"
              placeholder={
                isVietnamese ? "Nhập mã đơn hàng" : "Enter order code"
              }
              value={formData.code || ""}
              onChange={(e) => handleChange("code", e.target.value)}
              className="h-9"
              aria-invalid={!!errors.code}
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code}</p>
            )}
          </div>
        )}

        {/* Row 4: Note */}
        <div className="space-y-2">
          <Label htmlFor="note" className="text-gray-700 font-medium">
            {isVietnamese ? "Ghi chú" : "Note"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="note"
            placeholder={
              isVietnamese
                ? "NETCO POST có thể giúp gì cho bạn? Hãy cho chúng tôi biết..."
                : "How can NETCO POST help you? Let us know..."
            }
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            className="min-h-[120px] resize-none"
            aria-invalid={!!errors.note}
          />
          {errors.note && <p className="text-sm text-red-500">{errors.note}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-start pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="px-12 text-base font-semibold bg-green-primary hover:bg-green-600 text-white"
          >
            {isLoading
              ? isVietnamese
                ? "Đang gửi..."
                : "Sending..."
              : isVietnamese
              ? "Gửi"
              : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
