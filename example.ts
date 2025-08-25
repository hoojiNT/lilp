// TypeScript example using the lilp library
// This demonstrates the TypeScript interface and type safety

import { CungVi } from './src/constant/cungvi';
import {
  quickCalculate,
  calculateTuVi,
  LunarDate,
  TuViChart,
  CalculationOptions,
  LIBRARY_INFO
} from './src/index';

console.log('='.repeat(60));
console.log(`${LIBRARY_INFO.name} v${LIBRARY_INFO.version} - TypeScript Example`);
console.log(LIBRARY_INFO.description);
console.log('='.repeat(60));

// Example with full type safety
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

console.log('\n🌟 TypeScript Example with Type Safety');
console.log(`Input: ${JSON.stringify(birthData, null, 2)}`);

try {
  // Type-safe calculation
  const chart: TuViChart = calculateTuVi(birthData, options);

  console.log('\n📊 Chart Analysis:');
  console.log(`Cung Mệnh: ${chart.cungMenh}`);
  console.log(`Cung Thân: ${chart.cungThan}`);
  console.log(`Nguyên Cục: ${chart.metadata.nguyenCuc}`);

  // Type-safe palace iteration
  console.log('\n🏛️ Palace Summary:');
  Object.entries(chart.palaces).forEach(([palaceName, palaceInfo]) => {
    const palace = palaceName as CungVi;
    console.log(`${palace}:`);
    console.log(`  - Chủ tinh: ${palaceInfo.chuTinh.join(', ') || 'Không có'}`);
    console.log(`  - Phụ tinh: ${palaceInfo.phuTinh.join(', ') || 'Không có'}`);
    console.log(`  - Ngũ hành: ${palaceInfo.nguHanh}`);
    console.log(`  - Địa chi: ${palaceInfo.diaChi}`);
    console.log('');
  });

  // Demonstrate type safety - this would cause compile error if uncommented:
  // chart.cungMenh = 'InvalidPalace'; // TS2322: Type '"InvalidPalace"' is not assignable to type 'CungVi'

  console.log('\n✅ TypeScript compilation and execution successful!');
  console.log('✅ All types are properly defined and enforced');

} catch (error) {
  console.error('❌ Error:', error);
}

console.log('\n' + '='.repeat(60));