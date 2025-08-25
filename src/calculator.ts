import { ChuTinh } from './constant/chutinh';
import { CungVi } from './constant/cungvi';
import { PhuTinh } from './constant/phutinh';
import { ThoiThan } from './constant/thoithan';
import {
  LunarDate,
  TuViChart,
  CungInfo,
  CalculationOptions
} from './types';
import {
  getCanChiYear,
  getCanChiMonth,
  getCanChiDay,
  getCanChiHour,
  getThoiThan,
  getNguyenCuc,
  getNguHanh,
  CHI,
  CAN
} from './utils';

/**
 * Main class for Tử vi calculations
 */
export class TuViCalculator {
  private lunarDate: LunarDate;
  private options: CalculationOptions;

  constructor(lunarDate: LunarDate, options: CalculationOptions = {}) {
    this.lunarDate = lunarDate;
    this.options = {
      useModernMethod: true,
      includeMinorStars: true,
      includeLuckyStars: true,
      ...options
    };
  }

  /**
   * Calculate complete Tử vi chart
   */
  public calculateChart(): TuViChart {
    const canChiData = this.calculateCanChi();
    const cungMenh = this.calculateCungMenh();
    const cungThan = this.calculateCungThan();
    const cungDau = this.calculateCungDau();
    const palaces = this.calculateAllPalaces();
    const nguyenCuc = this.calculateNguyenCuc();
    const tuViTinhDo = this.calculateTuViTinhDo();

    return {
      input: this.lunarDate,
      cungMenh,
      cungThan,
      cungDau,
      palaces,
      metadata: {
        canChi: canChiData,
        nguyenCuc,
        tuViTinhDo
      }
    };
  }

  /**
   * Calculate Can Chi for year, month, day, hour
   */
  private calculateCanChi() {
    const { year, month, day, hour } = this.lunarDate;
    const yearCanChi = getCanChiYear(year);
    const monthCanChi = getCanChiMonth(year, month);
    const dayCanChi = getCanChiDay(year, month, day);

    const dayCanIndex = CAN.indexOf(dayCanChi.split(' ')[0]);
    const hourCanChi = getCanChiHour(dayCanIndex, hour);

    return {
      nam: yearCanChi,
      thang: monthCanChi,
      ngay: dayCanChi,
      gio: hourCanChi
    };
  }

  /**
   * Calculate Cung Mệnh (Life Palace)
   */
  private calculateCungMenh(): CungVi {
    const { month, hour } = this.lunarDate;

    // Cung Mệnh = (Tháng sinh + Giờ sinh - 2) % 12
    const cungMenhIndex = (month + Math.floor(hour / 2) - 2 + 12) % 12;
    return this.indexToCungVi(cungMenhIndex);
  }

  /**
   * Calculate Cung Thân (Body Palace)  
   */
  private calculateCungThan(): CungVi {
    const { month, hour } = this.lunarDate;

    // Cung Thân = (Tháng sinh - Giờ sinh + 2) % 12
    const cungThanIndex = (month - Math.floor(hour / 2) + 2 + 12) % 12;
    return this.indexToCungVi(cungThanIndex);
  }

  /**
   * Calculate Cung Đầu (First Palace) - usually same as Cung Mệnh
   */
  private calculateCungDau(): CungVi {
    return this.calculateCungMenh();
  }

  /**
   * Calculate Tử Vi degree position
   */
  private calculateTuViTinhDo(): number {
    const { day } = this.lunarDate;
    const cungMenhIndex = this.cungViToIndex(this.calculateCungMenh());

    // Simplified calculation for Tử Vi degree
    return (day + cungMenhIndex * 30) % 360;
  }

  /**
   * Calculate Nguyên cục
   */
  private calculateNguyenCuc(): string {
    const yearCanChi = getCanChiYear(this.lunarDate.year);
    const cungMenhIndex = this.cungViToIndex(this.calculateCungMenh());
    return getNguyenCuc(yearCanChi, cungMenhIndex);
  }

  /**
   * Calculate all 12 palaces with their stars
   */
  private calculateAllPalaces(): { [key in CungVi]: CungInfo } {
    const palaces = {} as { [key in CungVi]: CungInfo };
    const cungMenh = this.calculateCungMenh();
    const cungMenhIndex = this.cungViToIndex(cungMenh);

    // Initialize all palaces
    Object.values(CungVi).forEach((cung, index) => {
      const position = (cungMenhIndex + index) % 12;
      palaces[cung] = {
        position: cung,
        chuTinh: [],
        phuTinh: [],
        nguHanh: this.calculateCungNguHanh(position),
        diaChi: this.indexToThoiThan(position)
      };
    });

    // Place main stars (Chủ tinh)
    this.placeChuTinh(palaces);

    // Place supporting stars (Phụ tinh) if enabled
    if (this.options.includeMinorStars) {
      this.placePhuTinh(palaces);
    }

    return palaces;
  }

  /**
   * Place main stars (Chủ tinh) in palaces
   */
  private placeChuTinh(palaces: { [key in CungVi]: CungInfo }): void {
    const tuViPosition = this.calculateTuViPosition();

    // Main star positions based on Tử Vi position
    const starPositions = {
      [ChuTinh.TU_VI]: tuViPosition,
      [ChuTinh.THIEN_CO]: (tuViPosition + 1) % 12,
      [ChuTinh.THAI_DUONG]: (tuViPosition + 2) % 12,
      [ChuTinh.VU_KHUC]: (tuViPosition + 3) % 12,
      [ChuTinh.THIEN_DONG]: (tuViPosition + 4) % 12,
      [ChuTinh.LIEM_TRINH]: (tuViPosition + 5) % 12,
      [ChuTinh.THIEN_PHU]: (tuViPosition + 6) % 12,
      [ChuTinh.THAI_AM]: (tuViPosition + 7) % 12,
      [ChuTinh.THAM_LANG]: (tuViPosition + 8) % 12,
      [ChuTinh.CU_MON]: (tuViPosition + 9) % 12,
      [ChuTinh.THIEN_TUONG]: (tuViPosition + 10) % 12,
      [ChuTinh.THIEN_LUONG]: (tuViPosition + 11) % 12,
      [ChuTinh.THAT_SAT]: (tuViPosition + 6) % 12, // Same as Thiên Phủ
      [ChuTinh.PHA_QUAN]: (tuViPosition + 4) % 12  // Same as Thiên Đồng
    };

    // Place stars in corresponding palaces
    Object.entries(starPositions).forEach(([star, position]) => {
      const cungVi = this.indexToCungVi(position);
      palaces[cungVi].chuTinh.push(star as ChuTinh);
    });
  }

  /**
   * Place supporting stars (Phụ tinh) in palaces  
   */
  private placePhuTinh(palaces: { [key in CungVi]: CungInfo }): void {
    // Simplified placement of some key supporting stars
    const { month, day, hour } = this.lunarDate;

    // Tả Phụ, Hữu Bật
    const taPhuPos = (month + day) % 12;
    const huuBatPos = (month - day + 12) % 12;

    palaces[this.indexToCungVi(taPhuPos)].phuTinh.push(PhuTinh.TA_PHU);
    palaces[this.indexToCungVi(huuBatPos)].phuTinh.push(PhuTinh.HUU_BAT);

    // Văn Xương, Văn Khúc
    const vanXuongPos = (hour + day) % 12;
    const vanKhucPos = (hour - day + 12) % 12;

    palaces[this.indexToCungVi(vanXuongPos)].phuTinh.push(PhuTinh.VAN_XUONG);
    palaces[this.indexToCungVi(vanKhucPos)].phuTinh.push(PhuTinh.VAN_KHUC);
  }

  /**
   * Calculate Tử Vi star position
   */
  private calculateTuViPosition(): number {
    const { day } = this.lunarDate;
    const cungMenhIndex = this.cungViToIndex(this.calculateCungMenh());

    // Simplified Tử Vi positioning
    return (day + cungMenhIndex) % 12;
  }

  /**
   * Calculate Ngũ hành for a palace position
   */
  private calculateCungNguHanh(position: number): string {
    const nguHanhCycle = ['Thủy', 'Thổ', 'Mộc', 'Mộc', 'Thổ', 'Hỏa',
      'Hỏa', 'Thổ', 'Kim', 'Kim', 'Thổ', 'Thủy'];
    return nguHanhCycle[position];
  }

  /**
   * Helper methods for conversions
   */
  private cungViToIndex(cungVi: CungVi): number {
    return Object.values(CungVi).indexOf(cungVi);
  }

  private indexToCungVi(index: number): CungVi {
    const cungViArray = Object.values(CungVi);
    const normalizedIndex = ((index % 12) + 12) % 12; // Ensure positive index
    return cungViArray[normalizedIndex];
  }

  private indexToThoiThan(index: number): ThoiThan {
    const thoiThanArray = Object.values(ThoiThan);
    const normalizedIndex = ((index % 12) + 12) % 12; // Ensure positive index
    return thoiThanArray[normalizedIndex];
  }
}

/**
 * Main function to calculate Tử vi chart
 */
export function calculateTuVi(
  lunarDate: LunarDate,
  options?: CalculationOptions
): TuViChart {
  const calculator = new TuViCalculator(lunarDate, options);
  return calculator.calculateChart();
}