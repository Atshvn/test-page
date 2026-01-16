"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  AlertTriangle,
  Eye,
  User,
  Calendar,
  Weight,
  Box,
  QrCode,
  Home,
  ChevronRight,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trackLading, trackLadingByDO } from "@/actions/lading";
import Link from "next/link";
import AppDownload from "@/components/sections/AppDownload";

// Format date helper
const formatDate = (dateStr: string, format?: number) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  
  if (format === 7) {
    return date.toLocaleDateString("vi-VN");
  } else if (format === 10) {
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (format === 15) {
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  
  return date.toLocaleString("vi-VN");
};

// Format number helper
const formatNumber = (num: number | string) => {
  if (!num) return "0";
  return Number(num).toLocaleString("vi-VN");
};

export default function TrackingPage() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchType, setSearchType] = useState("1"); // 1 = Code, 2 = DO Code
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Load from URL params on mount
  useEffect(() => {
    const code = searchParams.get("code") || "";
    const type = searchParams.get("type") || "1";
    
    if (code) {
      setTrackingCode(code);
      setSearchType(type);
      handleTrack(type, code);
    }
  }, [searchParams]);

  const handleTrack = async (type?: string, code?: string) => {
    const searchCode = code || trackingCode;
    const typeToUse = type || searchType;

    if (!searchCode.trim()) {
      setError(
        isVi
          ? "Vui lòng nhập mã vận đơn"
          : "Please enter tracking code"
      );
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      let result;
      if (typeToUse === "1") {
        result = await trackLading({
          Code: searchCode.trim(),
          FinishMonth: 3,
        });
        console.log(result)
      } else {
        result = await trackLadingByDO({
          Code: searchCode.trim(),
          FinishMonth: 3,
        });
      }

      if (result.success) {
        setData(result.data);
      }
      
      // Update URL
      if (!code) {
        router.push(`/${locale}/tracking?code=${searchCode}&type=${typeToUse}`);
      }
    } catch (err) {
      console.error("Error fetching tracking data:", err);
      setError(
        isVi
          ? "Có lỗi xảy ra khi tra cứu vận đơn"
          : "Error occurred while tracking shipment"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack();
  };

  // Get order info based on search type
  const Info =
    searchType === "1"
      ? data?.Data?.[0] ?? data?.Detail?.[0] ?? null
      : data?.Detail?.[0] ?? data?.Data?.[0] ?? null;
  const History = data?.DataDetail;
  const AnotherLading = data?.Detail;

  // Status badge helper
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    const s = String(status).toLowerCase();
    
    let colorClass = "bg-gray-100 text-gray-700 border-gray-300";
    let icon = <Clock className="w-4 h-4" />;
    
    if (s.includes("thành công") || s.includes("delivered")) {
      colorClass = "bg-green-100 text-green-700 border-green-500";
      icon = <CheckCircle className="w-4 h-4" />;
    } else if (
      s.includes("đang giao") ||
      s.includes("đang trên đường") ||
      s.includes("in transit")
    ) {
      colorClass = "bg-blue-100 text-blue-700 border-blue-500";
      icon = <Truck className="w-4 h-4" />;
    } else if (s.includes("hủy") || s.includes("fail") || s.includes("hoàn")) {
      colorClass = "bg-red-100 text-red-700 border-red-500";
      icon = <XCircle className="w-4 h-4" />;
    }
    
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold ${colorClass}`}>
        {icon}
        <span>{status}</span>
      </div>
    );
  };

  const EmptyState = ({ message, showIcon = true }: { message: string; showIcon?: boolean }) => (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      {showIcon && (
        <div className="h-20 w-20 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
          <Package className="w-10 h-10" />
        </div>
      )}
      <p className="text-base text-gray-600 max-w-md">{message}</p>
    </div>
  );

  const hasResults = data && Object.keys(data).length !== 0;

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
   

      {/* Hero Section with Search */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-red-50 via-white to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-green-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-dark mb-3">
                {isVi ? "Tra cứu vận đơn" : "Track Your Shipment"}
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                {isVi
                  ? "Nhập mã vận đơn hoặc mã DO để theo dõi hành trình đơn hàng"
                  : "Enter tracking code or DO code to follow your shipment"}
              </p>
            </div>

            {/* Search Form */}
            <Card className="shadow-lg">
              <CardContent className="p-4 md:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Input and Button Row */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        placeholder={
                          isVi
                            ? "VD: CRG123456789"
                            : "e.g., CRG123456789"
                        }
                        className="h-12 pl-11 text-base"
                        disabled={loading}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 text-white h-12 px-8 font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {isVi ? "Đang tra cứu..." : "Searching..."}
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5 mr-2" />
                          {isVi ? "Tra cứu" : "Search"}
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Radio Group */}
                  <RadioGroup
                    value={searchType}
                    onValueChange={setSearchType}
                    className="flex items-center justify-center gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="search-code" className="text-red-600 border-red-600 focus-visible:ring-red-600" />
                      <Label htmlFor="search-code" className="text-sm font-medium cursor-pointer">
                        {isVi ? "Mã vận đơn" : "Tracking Code"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="search-do" className="text-red-600 border-red-600 focus-visible:ring-red-600" />
                      <Label htmlFor="search-do" className="text-sm font-medium cursor-pointer">
                        {isVi ? "Mã DO" : "DO Code"}
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Support Info */}
                  <p className="text-xs text-center text-gray-500">
                    {isVi ? "Cần hỗ trợ?" : "Need help?"}{" "}
                    <a href="mailto:info@netco.com.vn" className="text-green-primary hover:underline font-medium">
                      info@netco.com.vn
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tracking Results */}
      <AnimatePresence mode="wait">
        {searched && (
          <>
            {hasResults ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Related DO Ladings */}
                {AnotherLading?.length > 0 && searchType === "2" && (
                  <section className="py-6 bg-white">
                    <div className="container mx-auto px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Package className="w-5 h-5 text-green-primary" />
                              {isVi ? "Vận đơn cùng mã DO:" : "Ladings with same DO code:"}{" "}
                              <span className="text-red-600">{trackingCode}</span>
                            </CardTitle>
                            <p className="text-gray-600 text-sm">
                              {isVi
                                ? "Nhấn vào mã vận đơn để xem chi tiết"
                                : "Click on tracking code to view details"}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {AnotherLading.map((item: any, index: number) => (
                                <Link
                                  key={index}
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-green-600 transition font-medium"
                                  href={`/${locale}/tracking?code=${item.Code}&type=1`}
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>{item.Code}</span>
                                </Link>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </section>
                )}

                {/* Main Tracking Info */}
                {searchType !== "2" && Info && (
                  <section className="py-6 bg-white">
                    <div className="container mx-auto px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto space-y-6"
                      >
                        {/* Status Header */}
                        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <p className="text-sm text-gray-600 mb-1">
                                  {isVi ? "Mã vận đơn" : "Tracking Code"}
                                </p>
                                <h2 className="text-2xl md:text-3xl font-bold text-red-600 flex items-center gap-2">
                                  <Package className="w-7 h-7" />
                                  {Info.Code}
                                </h2>
                              </div>
                              <div className="flex flex-col items-start md:items-end gap-2">
                                <p className="text-sm text-gray-600">
                                  {isVi ? "Trạng thái" : "Status"}
                                </p>
                                {getStatusBadge(Info.StatusName)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Order Details */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Box className="w-5 h-5 text-green-primary" />
                              {isVi ? "Thông tin đơn hàng" : "Order Information"}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Customer Info */}
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 space-y-3 min-w-0">
                                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                                  <User className="w-5 h-5 flex-shrink-0" />
                                  <span className="truncate">{isVi ? "Khách hàng" : "Customer"}</span>
                                </div>
                                <div className="space-y-3 text-sm">
                                  <div>
                                    <p className="text-gray-600 text-xs mb-1">{isVi ? "Tên" : "Name"}</p>
                                    <p className="font-medium text-gray-900 break-words">{Info.CustomerName_Reality}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600 text-xs mb-1">{isVi ? "Địa chỉ" : "Address"}</p>
                                    <p className="font-medium text-gray-900 break-words leading-relaxed">{Info.CustomerAddress_Reality}</p>
                                  </div>
                                  <Separator />
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm" className="w-full text-xs">
                                        <QrCode className="w-3 h-3 mr-1" />
                                        {isVi ? "Xem QR Code" : "View QR Code"}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[400px]">
                                      <DialogHeader>
                                        <DialogTitle className="text-center">
                                          {isVi ? "Mã QR tra cứu" : "Tracking QR Code"}
                                        </DialogTitle>
                                      </DialogHeader>
                                      <div className="flex flex-col items-center gap-4 py-4">
                                        <img
                                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                                            Info?.Code || ""
                                          )}`}
                                          alt="QR Code"
                                          width={250}
                                          height={250}
                                          className="rounded-lg border-2 border-gray-200"
                                        />
                                        <p className="text-center text-sm text-gray-600">
                                          {isVi
                                            ? "Quét mã QR để xem chi tiết trên app NETCO POST"
                                            : "Scan QR code to view details on NETCO POST app"}
                                        </p>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>

                              {/* Package Info */}
                              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 space-y-3 min-w-0">
                                <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                  <Weight className="w-5 h-5 flex-shrink-0" />
                                  <span className="truncate">{isVi ? "Thông tin kiện hàng" : "Package Info"}</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between gap-2">
                                    <span className="text-gray-600 flex-shrink-0">{isVi ? "Khối lượng" : "Weight"}</span>
                                    <span className="font-semibold text-gray-900 text-right">
                                      {Info.Weight} {Info.Unit}
                                    </span>
                                  </div>
                                  <Separator />
                                  <div className="flex justify-between gap-2">
                                    <span className="text-gray-600 flex-shrink-0">{isVi ? "Số lượng" : "Quantity"}</span>
                                    <span className="font-semibold text-gray-900">{formatNumber(Info.Number)}</span>
                                  </div>
                                  <Separator />
                                  <div>
                                    <p className="text-gray-600 text-xs mb-1">{isVi ? "Dịch vụ" : "Service"}</p>
                                    <p className="font-medium text-gray-900 break-words">{Info.ServiceName}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Timeline Info */}
                              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100 space-y-3 min-w-0">
                                <div className="flex items-center gap-2 text-orange-700 font-semibold mb-2">
                                  <Calendar className="w-5 h-5 flex-shrink-0" />
                                  <span className="truncate">{isVi ? "Thời gian" : "Timeline"}</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <p className="text-gray-600 text-xs mb-1">{isVi ? "Ngày tạo" : "Created"}</p>
                                    <p className="font-medium text-gray-900 break-words">{formatDate(Info.CreateDate, 10)}</p>
                                  </div>
                                  <Separator />
                                  <div>
                                    <p className="text-gray-600 text-xs mb-1">{isVi ? "Dự kiến giao" : "Est. Delivery"}</p>
                                    <p className="font-medium text-gray-900 break-words">{formatDate(Info.DealineTime, 7)}</p>
                                  </div>
                                  {Info.FinishDate && (
                                    <>
                                      <Separator />
                                      <div>
                                        <p className="text-gray-600 text-xs mb-1">{isVi ? "Hoàn thành" : "Completed"}</p>
                                        <p className="font-bold text-red-600 break-words">{formatDate(Info.FinishDate, 10)}</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Tracking History */}
                        <Card>
                          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <CardTitle className="flex items-center gap-2">
                              <Truck className="w-5 h-5 text-green-primary" />
                              {isVi ? "Lịch sử vận chuyển" : "Tracking History"}
                            </CardTitle>
                            <Link
                              href="https://customer.netco.com.vn"
                              className="text-sm text-blue-600 flex items-center gap-1 hover:underline font-medium"
                              target="_blank"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {isVi ? "Xem trên cổng khách hàng" : "View on customer portal"}
                            </Link>
                          </CardHeader>
                          <CardContent>
                            {Array.isArray(History) && History.length > 0 ? (
                              <div className="relative">
                                <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500 to-gray-200" />
                                <ul className="space-y-4">
                                  {History.map((item: any, index: number) => (
                                    <li key={index} className="relative pl-12">
                                      <div className="absolute left-2 top-2 w-6 h-6 rounded-full border-3 border-white bg-green-500 shadow-md flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                      </div>
                                      <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                          <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                              {item.NoteCustomer || item.Note || (isVi ? "Đã tiếp nhận" : "Received")}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                              <Clock className="w-3 h-3" />
                                              {formatDate(item.DateTime, 10)}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <EmptyState
                                message={isVi ? "Chưa có lịch sử vận chuyển" : "No tracking history available"}
                                showIcon={false}
                              />
                            )}
                          </CardContent>
                        </Card>

                        {/* Scam Warning - Show after tracking result */}
                        <Card className="border-2 border-red-200 bg-red-50">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <h3 className="font-bold text-red-700 mb-2">
                                  {isVi
                                    ? "⚠️ Cảnh báo lừa đảo"
                                    : "⚠️ Scam Warning"}
                                </h3>
                                <p className="text-sm text-red-800 mb-3">
                                  {isVi
                                    ? "NETCO POST không bao giờ yêu cầu chuyển khoản qua điện thoại hoặc tin nhắn. Hãy cảnh giác với các cuộc gọi/tin nhắn mạo danh!"
                                    : "NETCO POST never requests bank transfers via phone or messages. Be vigilant against impersonation calls/messages!"}
                                </p>
                                <Link
                                  href={`/${locale}/contact`}
                                  className="text-sm text-red-700 underline hover:text-red-900 font-medium"
                                >
                                  {isVi ? "Liên hệ chính thức" : "Official contact"} →
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </section>
                )}
              </motion.div>
            ) : (
              /* No Results Found */
              <motion.section
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-12 bg-white"
              >
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl mx-auto">
                    <Card className="border-2 border-orange-200">
                      <CardContent className="p-8">
                        <EmptyState
                          message={
                            isVi
                              ? "Không tìm thấy vận đơn hoặc đã vượt quá thời hạn tra cứu (3 tháng). Vui lòng kiểm tra lại mã hoặc liên hệ hỗ trợ."
                              : "Tracking code not found or exceeded lookup period (3 months). Please check your code or contact support."
                          }
                        />
                        <div className="flex justify-center mt-6">
                          <Button
                            asChild
                            variant="outline"
                            className="border-green-primary text-green-primary hover:bg-green-50"
                          >
                            <Link href={`/${locale}/contact`}>
                              {isVi ? "Liên hệ hỗ trợ" : "Contact Support"}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.section>
            )}
          </>
        )}
      </AnimatePresence>

      {/* App Download Section - Always visible */}
      <AppDownload />

    </main>
  );
}
