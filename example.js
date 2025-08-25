// Example usage of lilp - Tử vi đẩu số calculation library
// This demonstrates how to use the compiled JavaScript library

const { quickCalculate, calculateTuVi, LIBRARY_INFO } = require('./dist/index.js');

console.log('='.repeat(60));
console.log(`${LIBRARY_INFO.name} v${LIBRARY_INFO.version}`);
console.log(LIBRARY_INFO.description);
console.log('='.repeat(60));

// Example 1: Quick calculation using convenience function
console.log('\n🌟 Example 1: Quick Calculation');
console.log('Input: Ngày 15, Tháng 8, Năm 1990, Giờ 14 (2:00 PM), Nam');

try {
  const result1 = quickCalculate(15, 8, 1990, 14, 'male');
  
  console.log('\n📊 Tử vi Chart Results:');
  console.log('Cung Mệnh:', result1.cungMenh);
  console.log('Cung Thân:', result1.cungThan);
  console.log('Nguyên Cục:', result1.metadata.nguyenCuc);
  console.log('Tử Vi Tinh Độ:', result1.metadata.tuViTinhDo);
  
  console.log('\n🏛️ Can Chi Information:');
  console.log('Năm:', result1.metadata.canChi.nam);
  console.log('Tháng:', result1.metadata.canChi.thang);
  console.log('Ngày:', result1.metadata.canChi.ngay);
  console.log('Giờ:', result1.metadata.canChi.gio);
  
  console.log('\n🌟 Main Stars in Palaces:');
  Object.entries(result1.palaces).forEach(([cung, info]) => {
    if (info.chuTinh.length > 0) {
      console.log(`${cung}: ${info.chuTinh.join(', ')} (${info.nguHanh})`);
    }
  });
  
  console.log('\n⭐ Supporting Stars in Palaces:');
  Object.entries(result1.palaces).forEach(([cung, info]) => {
    if (info.phuTinh.length > 0) {
      console.log(`${cung}: ${info.phuTinh.join(', ')}`);
    }
  });

} catch (error) {
  console.error('Error in calculation:', error.message);
}

// Example 2: Using detailed input object
console.log('\n\n🌟 Example 2: Detailed Input');
console.log('Input: Ngày 3, Tháng 12, Năm 1985, Giờ 22 (10:00 PM), Nữ');

try {
  const lunarDate = {
    day: 3,
    month: 12, 
    year: 1985,
    hour: 22,
    gender: 'female'
  };
  
  const options = {
    useModernMethod: true,
    includeMinorStars: true,
    includeLuckyStars: true
  };
  
  const result2 = calculateTuVi(lunarDate, options);
  
  console.log('\n📊 Complete JSON Output:');
  console.log(JSON.stringify(result2, null, 2));

} catch (error) {
  console.error('Error in detailed calculation:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('✨ Calculation completed successfully!');
console.log('✨ All results are in JSON format for easy integration');
console.log('='.repeat(60));