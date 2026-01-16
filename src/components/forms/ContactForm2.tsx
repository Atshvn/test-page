"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { submitContact } from "@/actions/contact";

export interface Province {
  LocationId: number;
  Name: string;
  Code_Local?: string;
  PostOfficeId?: number;
}

interface ContactForm2Props {
  provinces: Province[];
  locale: string;
  isVietnamese: boolean;
  onSuccess?: () => void;
}

// Create validation schema with localized messages
const createQuoteFormSchema = (isVietnamese: boolean) =>
  z.object({
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
    note: z
      .string()
      .min(
        10,
        isVietnamese
          ? "Ghi chú phải có ít nhất 10 ký tự"
          : "Note must be at least 10 characters"
      ),
  });

type QuoteFormData = z.infer<ReturnType<typeof createQuoteFormSchema>>;

export default function ContactForm2({
  provinces,
  locale,
  isVietnamese,
  onSuccess,
}: ContactForm2Props) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof QuoteFormData, string>>
  >({});
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    email: "",
    phone: "",
    province: "",
    note: "",
  });

  // Get UTM parameters from URL
  const utmSource = searchParams.get("utm_source") || "direct";

  const handleChange = (field: keyof QuoteFormData, value: string) => {
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
      const quoteFormSchema = createQuoteFormSchema(isVietnamese);
      const validatedData = quoteFormSchema.parse(formData);

      // Find province name from provinces list
      const selectedProvince = provinces.find(
        (p) => p.LocationId.toString() === formData.province
      );

      // Prepare data for API - supportType is always "quote" (Type = 1)
      const contactData = {
        ContactId: 0,
        ContactName: validatedData.fullName,
        Phone: validatedData.phone,
        Email: validatedData.email,
        Address: selectedProvince?.Name || "",
        Notes: validatedData.note,
        Code: "",
        Type: 1, // Always "quote" for this form
        LocationId: parseInt(validatedData.province),
        StatusId: 1,
        utm_source: utmSource,
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
        // throw new Error("Failed to submit contact");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof QuoteFormData] = err.message;
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
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-5">
      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8">
        <div className="relative">
          <label className="block text-white/90 text-sm font-medium mb-2">
            {isVietnamese ? "Họ và tên" : "Full Name"}{" "}
            <span className="text-white">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-base"
            placeholder={isVietnamese ? "Nhập họ và tên" : "Enter your name"}
          />
          {errors.fullName && (
            <p className="text-sm text-red-300 mt-1">{errors.fullName}</p>
          )}
        </div>
        <div className="relative">
          <label className="block text-white/90 text-sm font-medium mb-2">
            Email <span className="text-white">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-base"
            placeholder={isVietnamese ? "Nhập email" : "Enter your email"}
          />
          {errors.email && (
            <p className="text-sm text-red-300 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Row 2: Phone & Province */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8">
        <div className="relative">
          <label className="block text-white/90 text-sm font-medium mb-2">
            {isVietnamese ? "Số điện thoại" : "Phone Number"}{" "}
            <span className="text-white">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-base"
            placeholder={
              isVietnamese ? "Nhập số điện thoại" : "Enter phone number"
            }
          />
          {errors.phone && (
            <p className="text-sm text-red-300 mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="relative">
          <label className="block text-white/90 text-sm font-medium mb-2">
            {isVietnamese ? "Tỉnh thành" : "Province"}{" "}
            <span className="text-white">*</span>
          </label>
          <select
            value={formData.province}
            onChange={(e) => handleChange("province", e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:bg-white/20 transition-all text-base appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option value="" className="bg-green-600 text-white">
              {isVietnamese ? "Chọn tỉnh thành" : "Select province"}
            </option>
            {provinces.map((province) => (
              <option
                key={province.LocationId}
                value={province.LocationId.toString()}
                className="bg-green-600 text-white"
              >
                {province.Name}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-sm text-red-300 mt-1">{errors.province}</p>
          )}
        </div>
      </div>

      {/* Row 3: Note */}
      <div className="relative">
        <label className="block text-white/90 text-sm font-medium mb-2">
          {isVietnamese ? "Ghi chú" : "Note"}{" "}
          <span className="text-white">*</span>
        </label>
        <textarea
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
          rows={3}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-base resize-none"
          placeholder={
            isVietnamese
              ? "NETCO POST có thể giúp gì cho bạn? Hãy cho chúng tôi biết..."
              : "How can NETCO POST help you? Let us know..."
          }
        />
        {errors.note && (
          <p className="text-sm text-red-300 mt-1">{errors.note}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-white text-green-primary font-bold uppercase tracking-wider py-4 px-12 hover:bg-white/90 hover:shadow-lg transition-all text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? isVietnamese
              ? "Đang gửi..."
              : "Sending..."
            : isVietnamese
            ? "Gửi"
            : "Submit"}
        </button>
      </div>
    </form>
  );
}
