// import { format } from 'fast-csv';
// import { Readable } from 'stream';

// export const generateCSV = (data: any) => {
//     if (!Array.isArray(data) || data.length === 0) {
//         throw new Error('No data available to generate CSV');
//     }
//     console.log(data);
//     // Transform MongoDB data to a flat JSON array
//     const csvData = data.map((item: any) => ({
//         ...item.toObject(),
//     }));

//     // Create a readable stream and write CSV data
//     const stream = new Readable();
//     stream._read = () => { }; // No-op for readable stream
//     format({ headers: true })
//         .on('data', chunk => stream.push(chunk))
//         .on('end', () => stream.push(null))
//         .write(csvData);
//     return stream;
// };

// utils/generateExcel.ts
import * as XLSX from 'xlsx'



export const generateExcel = (data: any[], filename: string): Buffer => {
  // Convert MongoDB data to a JSON array
  // Create a new workbook and worksheet

  // const worksheet = XLSX.utils.json_to_sheet(data);
  // const workbook = XLSX.utils.book_new();
  // // Append the worksheet to the workbook
  // XLSX.utils.book_append_sheet(workbook, worksheet, 'production-report');
  // // Write the workbook to a buffer
  // return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  // Create a new worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(data)

  // Apply custom formatting to the worksheet
  // Example: Bold header row
  const headerRange = XLSX.utils.decode_range(worksheet['!ref'] ?? '') // Get the range of the sheet
  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const headerCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: col })]
    if (headerCell) {
      headerCell.s = { font: { bold: true } } // Bold font for header cells
    }
  }

  // Adjust column widths
  const colWidths = [
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
  ]

  worksheet['!cols'] = colWidths

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, `${filename}`)

  // Write the workbook to a buffer and return it
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}
