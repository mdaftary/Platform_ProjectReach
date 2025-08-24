// Test script to populate localStorage with sample assignment data
// Run this in the browser console to test the grading functionality

console.log('Setting up test data in localStorage...');

// Sample file data for assignment_files_1
const sampleFiles = [
  {
    name: "alphabet_worksheet.jpg",
    type: "image/jpeg",
    url: "/placeholder.jpg",
    dataUrl: "data:image/jpeg;base64,sample_data_here"
  },
  {
    name: "homework_page2.jpg", 
    type: "image/jpeg",
    url: "/placeholder.svg",
    dataUrl: "data:image/jpeg;base64,another_sample_data"
  }
];

// Set the files in localStorage
localStorage.setItem('assignment_files_1', JSON.stringify(sampleFiles));

// Optionally set some existing grade data
// localStorage.setItem('assignment_1_grade', '8.5');
// localStorage.setItem('assignment_1_feedback', 'Great work! Keep practicing letter recognition.');

console.log('Test data set! Navigate to /admin/grading to see the real submission.');
console.log('Files stored:', sampleFiles);

// To clear the data:
// localStorage.removeItem('assignment_files_1');
// localStorage.removeItem('assignment_1_grade');
// localStorage.removeItem('assignment_1_feedback');
