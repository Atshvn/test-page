'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Upload, X, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { submitJobApplication } from '@/actions/career';

interface ApplicationFormProps {
  careerId: number;
  careerTitle: string;
}

interface FormData {
  candidateName: string;
  email: string;
  phone: string;
  coverLetter?: string;
}

interface FormErrors {
  candidateName?: string;
  email?: string;
  phone?: string;
}

export function ApplicationForm({ careerId, careerTitle }: ApplicationFormProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    candidateName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File CV không được vượt quá 5MB');
        return;
      }
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Chỉ chấp nhận file PDF, DOC, DOCX');
        return;
      }
      setCvFile(file);
    }
  };

  const removeFile = () => {
    setCvFile(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!cvFile) {
      toast.error('Vui lòng tải lên CV của bạn');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitJobApplication({
        HRCandidate_NewID: 0, // New application
        CandidateName: formData.candidateName,
        Email: formData.email,
        Phone: formData.phone,
        FileCV: cvFile,
        HRRecruitmentProposeID: careerId,
        Creater: 0,
      });

      toast.success('Nộp hồ sơ thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
      setFormData({
        candidateName: '',
        email: '',
        phone: '',
        coverLetter: '',
      });
      setCvFile(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5" />
          Ứng tuyển vị trí: {careerTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="candidateName">
              Họ và tên <span className="text-destructive">*</span>
            </Label>
            <Input
              id="candidateName"
              name="candidateName"
              placeholder="Nguyễn Văn A"
              value={formData.candidateName}
              onChange={handleInputChange}
              aria-invalid={errors.candidateName ? 'true' : 'false'}
            />
            {errors.candidateName && (
              <p className="text-sm text-destructive">
                {errors.candidateName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0912345678"
              value={formData.phone}
              onChange={handleInputChange}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* CV Upload */}
          <div className="space-y-2">
            <Label htmlFor="cv">
              CV/Resume <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-2">
              {!cvFile ? (
                <label
                  htmlFor="cv"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="size-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    id="cv"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{cvFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={removeFile}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Thư giới thiệu (không bắt buộc)</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Giới thiệu ngắn gọn về bản thân và lý do ứng tuyển..."
              rows={5}
              value={formData.coverLetter}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className=" w-full cursor-pointer bg-green-primary hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Đang gửi...
              </>
            ) : (
              'Nộp hồ sơ ứng tuyển'
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Bằng cách nộp đơn, bạn đồng ý với{' '}
            <a href="/privacy" className="underline hover:text-green-primary">
              chính sách bảo mật
            </a>{' '}
            của chúng tôi.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
