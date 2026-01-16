'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { calculateShippingFee } from '@/actions/tracking';
import { getProvinces, getDistricts } from '@/actions/address';
import { Calculator, Package, MapPin, Weight, DollarSign, Ruler } from 'lucide-react';
import Link from 'next/link';

interface PriceResult {
  ServiceName: string;
  Amount: number;
  DealineTime: string;
}

export function ShippingCalculatorForm({ locale }: { locale: string }) {
  const t = useTranslations('calculator');
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districtsFrom, setDistrictsFrom] = useState<any[]>([]);
  const [districtsTo, setDistrictsTo] = useState<any[]>([]);
  const [priceResults, setPriceResults] = useState<PriceResult[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    cityFromId: '',
    districtFromId: '',
    cityToId: '',
    districtToId: '',
    weight: '',
    cod: '',
    insured: '',
    length: '',
    width: '',
    height: '',
  });
  console.log(provinces, districtsFrom, districtsTo)

  // Load provinces on mount
  useEffect(() => {
    loadProvinces();
  }, []);

  const loadProvinces = async () => {
    try {
      const response = await getProvinces();
      if (response?.success && response?.data) {
        setProvinces(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Failed to load provinces:', error);
    }
  };

  const loadDistrictsFrom = async (provinceId: number) => {
    try {
      const response = await getDistricts(provinceId);
      if (response?.success && response?.data) {
        setDistrictsFrom(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Failed to load districts:', error);
    }
  };

  const loadDistrictsTo = async (provinceId: number) => {
    try {
      const response = await getDistricts(provinceId);
      if (response?.success && response?.data) {
        setDistrictsTo(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Failed to load districts:', error);
    }
  };

  const handleProvinceFromChange = (value: string) => {
    setFormData({ ...formData, cityFromId: value, districtFromId: '' });
    setDistrictsFrom([]);
    if (value) {
      loadDistrictsFrom(parseInt(value));
    }
  };

  const handleProvinceToChange = (value: string) => {
    setFormData({ ...formData, cityToId: value, districtToId: '' });
    setDistrictsTo([]);
    if (value) {
      loadDistrictsTo(parseInt(value));
    }
  };

  const validateForm = () => {
    if (!formData.cityFromId) {
      toast.error(t('errors.selectOriginCity'));
      return false;
    }
    if (!formData.cityToId) {
      toast.error(t('errors.selectDestinationCity'));
      return false;
    }
    if (!formData.districtToId) {
      toast.error(t('errors.selectDistrict'));
      return false;
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      toast.error(t('errors.enterWeight'));
      return false;
    }
    return true;
  };

  const handleCalculate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const params = {
        CustomerId: 0,
        CityGoId: parseInt(formData.cityFromId),
        CityToId: parseInt(formData.cityToId),
        DistrictTo: parseInt(formData.districtToId),
        WardToId: 0,
        Weight: parseFloat(formData.weight),
        Mass: 0,
        Number: 0,
        HHKG: formData.insured ? parseFloat(formData.insured) : 0,
        COD: formData.cod ? parseFloat(formData.cod) : 0,
      };

      const response = await calculateShippingFee(params);
      
      if (response?.success && response?.data) {
        // Filter out unwanted services
        const data = Array.isArray(response.data) ? response.data : [];
        const filtered = data.filter(
          (item: any) =>
            item.ServiceName !== 'My NETCO' && 
            item.ServiceName !== 'Phát hỏa tốc'
        );
        setPriceResults(filtered);
        toast.success(t('success'));
      } else {
        toast.error(t('errors.calculateFailed'));
      }
    } catch (error) {
      console.error('Calculate error:', error);
      toast.error(t('errors.calculateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US');
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-green-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('title')}</h2>
            <p className="text-sm text-gray-600">{t('subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Province */}
          <div className="space-y-2">
            <Label htmlFor="cityFrom" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-primary" />
              {t('fromProvince')} <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.cityFromId}
              onValueChange={handleProvinceFromChange}
            >
              <SelectTrigger id="cityFrom" className="w-full">
                <SelectValue placeholder={t('selectProvince')} />
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
          </div>

          {/* From District */}
          <div className="space-y-2">
            <Label htmlFor="districtFrom">
              {t('fromDistrict')}
            </Label>
            <Select
              value={formData.districtFromId}
              onValueChange={(value) =>
                setFormData({ ...formData, districtFromId: value })
              }
              disabled={!formData.cityFromId}
            >
              <SelectTrigger id="districtFrom" className="w-full">
                <SelectValue placeholder={t('selectDistrict')} />
              </SelectTrigger>
              <SelectContent>
                {districtsFrom.map((district) => (
                  <SelectItem
                    key={district.LocationId}
                    value={district.LocationId.toString()}
                  >
                    {district.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Province */}
          <div className="space-y-2">
            <Label htmlFor="cityTo" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-primary" />
              {t('toProvince')} <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.cityToId}
              onValueChange={handleProvinceToChange}
            >
              <SelectTrigger id="cityTo" className="w-full">
                <SelectValue placeholder={t('selectProvince')} />
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
          </div>

          {/* To District */}
          <div className="space-y-2">
            <Label htmlFor="districtTo">
              {t('toDistrict')} <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.districtToId}
              onValueChange={(value) =>
                setFormData({ ...formData, districtToId: value })
              }
              disabled={!formData.cityToId}
            >
              <SelectTrigger id="districtTo" className="w-full">
                <SelectValue placeholder={t('selectDistrict')} />
              </SelectTrigger>
              <SelectContent>
                {districtsTo.map((district) => (
                  <SelectItem
                    key={district.LocationId}
                    value={district.LocationId.toString()}
                  >
                    {district.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Weight className="w-4 h-4 text-green-primary" />
              {t('weight')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="weight"
              type="number"
              min="0"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              placeholder={t('weightPlaceholder')}
              className="w-full"
            />
          </div>

          {/* COD */}
          <div className="space-y-2">
            <Label htmlFor="cod" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-primary" />
              {t('cod')}
            </Label>
            <Input
              id="cod"
              type="number"
              min="0"
              value={formData.cod}
              onChange={(e) =>
                setFormData({ ...formData, cod: e.target.value })
              }
              placeholder={t('codPlaceholder')}
              className="w-full"
            />
          </div>

          {/* Insured */}
          <div className="space-y-2">
            <Label htmlFor="insured" className="flex items-center gap-2">
              <Package className="w-4 h-4 text-green-primary" />
              {t('insured')}
            </Label>
            <Input
              id="insured"
              type="number"
              min="0"
              value={formData.insured}
              onChange={(e) =>
                setFormData({ ...formData, insured: e.target.value })
              }
              placeholder={t('insuredPlaceholder')}
              className="w-full"
            />
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-green-primary" />
              {t('size')}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                min="0"
                value={formData.length}
                onChange={(e) =>
                  setFormData({ ...formData, length: e.target.value })
                }
                placeholder={t('lengthPlaceholder')}
              />
              <Input
                type="number"
                min="0"
                value={formData.width}
                onChange={(e) =>
                  setFormData({ ...formData, width: e.target.value })
                }
                placeholder={t('widthPlaceholder')}
              />
              <Input
                type="number"
                min="0"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                placeholder={t('heightPlaceholder')}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            onClick={handleCalculate}
            disabled={loading}
            size="lg"
            className="w-full sm:w-auto bg-green-primary hover:bg-green-700"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t('calculating')}
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5 mr-2" />
                {t('calculate')}
              </>
            )}
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href={`/${locale}/services`}>{t('viewServices')}</Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">{t('note')}</p>
      </motion.div>

      {/* Results Section */}
      {priceResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-sm p-6 md:p-8"
        >
          <h3 className="text-2xl font-bold text-green-primary mb-6 text-center">
            {t('results.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priceResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-primary/10 flex items-center justify-center">
                    <Package className="w-8 h-8 text-green-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">
                      {result.ServiceName}
                    </h4>
                    <p className="text-3xl font-bold text-green-primary">
                      {formatCurrency(result.Amount)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {t('results.estimatedDelivery')}:{' '}
                      <span className="font-medium text-gray-900">
                        {formatDate(result.DealineTime)}
                      </span>
                    </p>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-green-primary hover:bg-green-700"
                  >
                    <Link
                      href="https://customer.netco.com.vn/tao-nhanh-van-don"
                      target="_blank"
                    >
                      {t('results.createOrder')}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
