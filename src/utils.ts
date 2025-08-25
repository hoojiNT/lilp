import { ThoiThan } from "./constant/thoithan";

/**
 * Can (Heavenly Stems) array
 */
export const CAN = [
	'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu',
	'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'
];

/**
 * Chi (Earthly Branches) array
 */
export const CHI = [
	'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ',
	'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
];

/**
 * Ngũ hành (Five Elements) cycle
 */
export const NGU_HANH = ['Kim', 'Thủy', 'Hỏa', 'Thổ', 'Mộc'];

/**
 * Calculate Can Chi for a given year
 */
export function getCanChiYear(year: number): string {
	const canIndex = (year - 4) % 10;
	const chiIndex = (year - 4) % 12;
	return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

/**
 * Calculate Can Chi for a given month
 */
export function getCanChiMonth(year: number, month: number): string {
	// Tháng âm lịch bắt đầu từ Dần
	const yearCanIndex = (year - 4) % 10;
	const monthCanIndex = (yearCanIndex * 2 + month - 1) % 10;
	const monthChiIndex = (month + 1) % 12; // Tháng 1 = Dần (index 2)

	return `${CAN[monthCanIndex]} ${CHI[monthChiIndex]}`;
}

/**
 * Calculate Can Chi for a given day
 */
export function getCanChiDay(year: number, month: number, day: number): string {
	// Simplified calculation - in real implementation would need more complex lunar calendar conversion
	const totalDays = year * 365 + month * 30 + day;
	const canIndex = (totalDays - 1) % 10;
	const chiIndex = (totalDays - 1) % 12;

	return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

/**
 * Calculate Can Chi for a given hour
 */
export function getCanChiHour(dayCanIndex: number, hour: number): string {
	// Convert 24-hour to 12-hour system if needed
	const hourIndex = Math.floor(hour / 2) % 12;
	const hourCanIndex = (dayCanIndex * 2 + hourIndex) % 10;

	return `${CAN[hourCanIndex]} ${CHI[hourIndex]}`;
}

/**
 * Get Thời thần from hour
 */
export function getThoiThan(hour: number): ThoiThan {
	const hourIndex = Math.floor(hour / 2) % 12;
	return Object.values(ThoiThan)[hourIndex];
}

/**
 * Calculate Nguyên cục (Destiny Bureau) based on birth year and palace
 */
export function getNguyenCuc(yearChi: string, cungMenh: number): string {
	const chiIndex = CHI.indexOf(yearChi.split(' ')[1]);
	const cuc = [
		'Thủy nhị cục', 'Mộc tam cục', 'Kim tứ cục', 'Thổ ngũ cục', 'Hỏa lục cục'
	];

	return cuc[(chiIndex + cungMenh) % 5];
}

/**
 * Get Ngũ hành of a Can Chi combination
 */
export function getNguHanh(canChi: string): string {
	const can = canChi.split(' ')[0];
	const canIndex = CAN.indexOf(can);

	// Mapping Can to Ngũ hành
	const nguHanhMap = [
		'Mộc', 'Mộc', 'Hỏa', 'Hỏa', 'Thổ',
		'Thổ', 'Kim', 'Kim', 'Thủy', 'Thủy'
	];

	return nguHanhMap[canIndex];
}

/**
 * Calculate distance between two chi positions
 */
export function getChiDistance(fromChi: string, toChi: string): number {
	const fromIndex = CHI.indexOf(fromChi);
	const toIndex = CHI.indexOf(toChi);
	return (toIndex - fromIndex + 12) % 12;
}

/**
 * Get opposite chi position
 */
export function getOppositeChi(chi: string): string {
	const index = CHI.indexOf(chi);
	return CHI[(index + 6) % 12];
}