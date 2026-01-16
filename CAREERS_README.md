# Chức năng tuyển dụng (Careers)

Chức năng tuyển dụng hiện đại với UI/UX đẹp mắt, responsive và đầy đủ các tính năng cần thiết.

## Cấu trúc files

```
new/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       └── careers/
│   │           ├── page.tsx              # Trang danh sách việc làm
│   │           └── [slug]/
│   │               └── page.tsx          # Trang chi tiết công việc
│   ├── components/
│   │   └── careers/
│   │       ├── CareerListPage.tsx        # Component trang danh sách
│   │       ├── CareerDetailPage.tsx      # Component trang chi tiết
│   │       ├── JobCard.tsx               # Card hiển thị công việc
│   │       ├── FilterBar.tsx             # Thanh lọc và tìm kiếm
│   │       └── ApplicationForm.tsx       # Form ứng tuyển
│   ├── actions/
│   │   └── career.ts                     # API actions (đã có sẵn)
│   └── locales/
│       ├── vi.json                       # Translations tiếng Việt
│       └── en.json                       # Translations tiếng Anh
```

## Tính năng

### 1. Trang danh sách việc làm (`/careers`)

- **Hiển thị grid responsive**: 1 cột (mobile), 2 cột (tablet), 3 cột (desktop)
- **Tìm kiếm**: Tìm theo tên vị trí và mô tả
- **Lọc**: Theo địa điểm và phòng ban
- **Animation**: Fade in và hover effects
- **Job Cards** với thông tin:
  - Hình ảnh
  - Tiêu đề
  - Mô tả ngắn
  - Địa điểm
  - Mức lương
  - Hạn nộp hồ sơ
  - Badge "Hot" cho vị trí hot

### 2. Trang chi tiết công việc (`/careers/[slug]`)

- **Thông tin chi tiết**:
  - Header với tiêu đề, địa điểm, lương, hạn nộp
  - Tabs: Mô tả công việc, Yêu cầu, Quyền lợi
  - Sticky sidebar với form ứng tuyển
- **Quyền lợi**: Grid hiển thị 6 benefits với icon
- **Social sharing**: Facebook, Twitter, LinkedIn
- **Responsive**: Layout thay đổi từ 2 cột (desktop) sang 1 cột (mobile)

### 3. Form ứng tuyển

- **Các trường**:
  - Họ và tên (required)
  - Email (required, validate format)
  - Số điện thoại (required, validate 10-11 số)
  - Upload CV (required, PDF/DOC/DOCX, max 5MB)
  - Thư giới thiệu (optional)
- **Features**:
  - Drag & drop file upload
  - File preview với kích thước
  - Real-time validation
  - Loading state khi submit
  - Toast notifications
  - Privacy note

## API Integration

Sử dụng 3 functions từ `@/actions/career`:

```typescript
// Lấy danh sách việc làm
getCareers({ keylang: 'VN' })

// Lấy chi tiết công việc
getCareerDetail({ keylang: 'VN', Url: 'slug' })

// Gửi hồ sơ ứng tuyển
submitJobApplication({
  HRCandidate_NewID: 0,
  CandidateName: 'Tên',
  Email: 'email@example.com',
  Phone: '0912345678',
  FileCV: file,
  HRRecruitmentProposeID: careerId,
  Creater: 0,
})
```

## Responsive Design

### Mobile (< 768px)
- 1 cột cho job cards
- Filter bar stack vertical
- Sidebar xuống dưới
- Full width buttons

### Tablet (768px - 1024px)
- 2 cột cho job cards
- Filter bar có wrap
- Layout vẫn 1 cột cho detail page

### Desktop (> 1024px)
- 3 cột cho job cards
- Filter bar horizontal
- 2 cột layout (content + sidebar)
- Sticky sidebar

## Animations

- **Framer Motion** cho smooth animations:
  - Fade in khi load page
  - Stagger animation cho job cards
  - Hover effects (scale, shadow)
  - Page transitions

## Styling

- **TailwindCSS** với design system hiện có
- **shadcn/ui components**:
  - Card, Button, Input, Label
  - Textarea, Badge, Separator
  - Tabs, Select
- **Custom colors**: Primary, Destructive, Muted
- **Dark mode ready** (nếu theme được bật)

## SEO

- Dynamic metadata cho mỗi trang
- Structured data (JSON-LD) - có thể thêm
- Breadcrumbs cho navigation
- Social sharing meta tags

## Translations

Hỗ trợ đa ngôn ngữ (vi/en) với next-intl:

```typescript
const t = useTranslations();
t('careers.title') // Cơ hội nghề nghiệp
```

Tất cả texts đều có trong `locales/vi.json` và `locales/en.json` dưới key `careers`.

## Testing

Các điểm cần test:

1. Load danh sách việc làm
2. Filter và search hoạt động
3. Navigate đến detail page
4. Form validation
5. File upload (size, type)
6. Submit form thành công
7. Responsive trên các thiết bị
8. Animations smooth
9. Error handling

## Notes

- File upload chưa được implement đầy đủ server-side, cần xử lý convert file to base64 hoặc upload to CDN
- Department filter chưa có data từ API, có thể cần thêm field trong database
- Social sharing buttons chỉ là UI, cần implement logic share
- Toast notifications sử dụng `sonner` đã có sẵn

## Next Steps

1. Test với real data từ API
2. Implement file upload to server/CDN
3. Add pagination nếu có nhiều jobs
4. Add sort options (newest, deadline, salary)
5. Add "Save job" feature
6. Email notifications khi submit
7. Admin panel để quản lý applications
