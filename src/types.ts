// Tử vi data types and interfaces

// Import and re-export all enums from constants
export { ChuTinh } from "./constant/chutinh";
export { CungVi } from "./constant/cungvi";
export { PhuTinh } from "./constant/phutinh";
export { ThoiThan } from "./constant/thoithan";

// Import for internal use
import { ChuTinh } from "./constant/chutinh";
import { CungVi } from "./constant/cungvi";
import { PhuTinh } from "./constant/phutinh";
import { ThoiThan } from "./constant/thoithan";

/**
 * Lunar date input structure
 */
export interface LunarDate {
    day: number;         // Ngày âm lịch (1-30)
    month: number;       // Tháng âm lịch (1-12)
    year: number;        // Năm âm lịch
    hour: number;        // Giờ sinh (1-12 hoặc 0-23)
    gender: 'male' | 'female'; // Giới tính
}

/**
 * Cung information structure
 */
export interface CungInfo {
    position: CungVi;
    chuTinh: ChuTinh[];        // Chủ tinh trong cung
    phuTinh: PhuTinh[];        // Phụ tinh trong cung
    nguHanh: string;           // Ngũ hành của cung
    diaChi: ThoiThan;          // Địa chi của cung
}

/**
 * Tử vi chart structure
 */
export interface TuViChart {
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
        nguyenCuc: string;       // Nguyên cục (Thủy nhị cục, Mộc tam cục...)
        tuViTinhDo: number;      // Độ Tử Vi
    };
}

/**
 * Configuration for calculation options
 */
export interface CalculationOptions {
    useModernMethod?: boolean;  // Sử dụng phương pháp hiện đại
    includeMinorStars?: boolean; // Bao gồm tinh phụ
    includeLuckyStars?: boolean; // Bao gồm cát tinh
}