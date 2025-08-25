# lilp - Tử vi đẩu số Library

A comprehensive TypeScript library for calculating **Tử vi đẩu số** (Vietnamese astrology) charts. This library provides accurate calculations for Vietnamese traditional astrology based on lunar calendar input and outputs structured JSON data.

## Features

🌙 **Lunar Calendar Support** - Accepts lunar date and time input  
🎯 **Accurate Calculations** - Implements traditional Tử vi calculation methods  
🗺️ **Complete Chart** - Generates all 12 palaces with stars and elements  
📊 **JSON Output** - Structured data format for easy integration  
🔥 **TypeScript** - Full type safety and modern development experience  
⚡ **Zero Dependencies** - Lightweight and standalone  

## Installation

```bash
npm install lilp
```

## Quick Start

### JavaScript (ES6/CommonJS)

```javascript
const { quickCalculate, calculateTuVi } = require('lilp');

// Quick calculation
const chart = quickCalculate(15, 8, 1990, 14, 'male');
console.log('Cung Mệnh:', chart.cungMenh);
console.log('Chart:', JSON.stringify(chart, null, 2));
```

### TypeScript

```typescript
import { calculateTuVi, LunarDate, TuViChart } from 'lilp';

const birthData: LunarDate = {
  day: 15,
  month: 8, 
  year: 1990,
  hour: 14,
  gender: 'male'
};

const chart: TuViChart = calculateTuVi(birthData);
console.log('Cung Mệnh:', chart.cungMenh);
```

## API Reference

### Main Functions

#### `calculateTuVi(lunarDate, options?)`

Calculates a complete Tử vi chart.

**Parameters:**
- `lunarDate: LunarDate` - Birth date and time information
- `options?: CalculationOptions` - Optional calculation settings

**Returns:** `TuViChart` - Complete astrology chart

#### `quickCalculate(day, month, year, hour, gender)`

Convenience function for quick calculations.

**Parameters:**
- `day: number` - Lunar day (1-30)
- `month: number` - Lunar month (1-12) 
- `year: number` - Lunar year
- `hour: number` - Birth hour (0-23)
- `gender: 'male' | 'female'` - Gender

### Types

#### `LunarDate`
```typescript
interface LunarDate {
  day: number;         // Ngày âm lịch (1-30)
  month: number;       // Tháng âm lịch (1-12)
  year: number;        // Năm âm lịch
  hour: number;        // Giờ sinh (0-23)
  gender: 'male' | 'female'; // Giới tính
}
```

#### `TuViChart`
```typescript
interface TuViChart {
  input: LunarDate;
  cungMenh: CungVi;          // Cung mệnh chủ
  cungThan: CungVi;          // Cung thân chủ
  cungDau: CungVi;           // Cung đầu
  palaces: {
    [key in CungVi]: CungInfo;
  };
  metadata: {
    canChi: {
      nam: string;           // Can chi năm sinh
      thang: string;         // Can chi tháng sinh
      ngay: string;          // Can chi ngày sinh
      gio: string;           // Can chi giờ sinh
    };
    nguyenCuc: string;       // Nguyên cục
    tuViTinhDo: number;      // Độ Tử Vi
  };
}
```

#### `CungInfo`
```typescript
interface CungInfo {
  position: CungVi;
  chuTinh: ChuTinh[];        // Chủ tinh trong cung
  phuTinh: PhuTinh[];        // Phụ tinh trong cung
  nguHanh: string;           // Ngũ hành của cung
  diaChi: ThoiThan;          // Địa chi của cung
}
```

### Enums

#### `CungVi` (12 Palaces)
- `MENH` - Mệnh
- `PHU_MU` - Phụ Mẫu
- `PHUC_DUC` - Phúc Đức
- `DIEN_TRACH` - Điền Trạch
- `QUAN_LOC` - Quan Lộc
- `NO_BAC` - Nô Bạc
- `THIEN_DI` - Thiên Di
- `TAT_ACH` - Tật Ách
- `TAI_BACH` - Tài Bạch
- `TU_TU` - Tử Tự
- `PHU_THEE` - Phụ Thê
- `HUYNH_DE` - Huynh Đệ

#### `ChuTinh` (Main Stars)
- `TU_VI` - Tử Vi
- `LIEM_TRINH` - Liêm Trinh
- `THIEN_DONG` - Thiên Đồng
- `VU_KHUC` - Vũ Khúc
- `THAI_DUONG` - Thái Dương
- `THIEN_CO` - Thiên Cơ
- And more...

#### `PhuTinh` (Supporting Stars)
- `TA_PHU` - Tả Phụ
- `HUU_BAT` - Hữu Bật
- `VAN_XUONG` - Văn Xương
- `VAN_KHUC` - Văn Khúc
- And more...

## Examples

### Example 1: Basic Usage

```javascript
const { quickCalculate } = require('lilp');

const chart = quickCalculate(15, 8, 1990, 14, 'male');

console.log('Basic Information:');
console.log('Cung Mệnh:', chart.cungMenh);
console.log('Cung Thân:', chart.cungThan);
console.log('Nguyên Cục:', chart.metadata.nguyenCuc);

console.log('\nCan Chi:');
console.log('Năm:', chart.metadata.canChi.nam);
console.log('Tháng:', chart.metadata.canChi.thang);
console.log('Ngày:', chart.metadata.canChi.ngay);
console.log('Giờ:', chart.metadata.canChi.gio);
```

### Example 2: TypeScript with Options

```typescript
import { calculateTuVi, LunarDate, CalculationOptions } from 'lilp';

const birthData: LunarDate = {
  day: 20,
  month: 5,
  year: 1992,
  hour: 8,
  gender: 'female'
};

const options: CalculationOptions = {
  useModernMethod: true,
  includeMinorStars: true,
  includeLuckyStars: true
};

const chart = calculateTuVi(birthData, options);

// Type-safe access to chart data
Object.entries(chart.palaces).forEach(([palace, info]) => {
  console.log(`${palace}:`);
  console.log(`  Chủ tinh: ${info.chuTinh.join(', ') || 'Không có'}`);
  console.log(`  Phụ tinh: ${info.phuTinh.join(', ') || 'Không có'}`);
  console.log(`  Ngũ hành: ${info.nguHanh}`);
});
```

### Example 3: JSON Export

```javascript
const { calculateTuVi } = require('lilp');
const fs = require('fs');

const chart = calculateTuVi({
  day: 3,
  month: 12,
  year: 1985,
  hour: 22,
  gender: 'female'
});

// Export to JSON file
fs.writeFileSync('tuvi-chart.json', JSON.stringify(chart, null, 2));
console.log('Chart exported to tuvi-chart.json');
```

## Development

### Build from Source

```bash
# Clone repository
git clone <repository-url>
cd lilp

# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Run TypeScript example
npm run dev

# Test with examples
node example.js
npx ts-node example.ts
```

### Project Structure

```
lilp/
├── src/
│   ├── types.ts        # Type definitions
│   ├── utils.ts        # Utility functions
│   ├── calculator.ts   # Core calculation logic
│   └── index.ts        # Main entry point
├── dist/               # Compiled JavaScript
├── example.js          # JavaScript example
├── example.ts          # TypeScript example
├── package.json
├── tsconfig.json
└── README.md
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Note:** This library implements simplified Tử vi calculations for demonstration purposes. For production use in professional astrology applications, more comprehensive algorithms and validation would be recommended.