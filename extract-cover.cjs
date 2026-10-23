// PDF birinchi sahifasidan rasm chiqarib olish skripti
// pdf-lib orqali PDF metadatasini o'qish va sharp orqali rasm yaratish
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pdfPath = path.resolve(__dirname, 'public', 'pdf', 'topik-30-days-vocabulary.pdf');
const outputPath = path.resolve(__dirname, 'public', 'pdf', 'cover-30days-vocab.png');

async function extractCover() {
  try {
    console.log('PDF yuklanmoqda:', pdfPath);
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const pages = pdfDoc.getPageCount();
    console.log('Jami sahifalar:', pages);
    
    // PDF o'lchamini olish
    const firstPage = pdfDoc.getPage(0);
    const { width, height } = firstPage.getSize();
    console.log('Sahifa o\'lchami:', width, 'x', height);
    
    // Kitob qopqog'i rasmini yaratish
    const coverWidth = 600;
    const coverHeight = Math.round((height / width) * coverWidth);
    
    const gradient = [
      { offset: 0, color: '#667eea' },
      { offset: 1, color: '#764ba2' }
    ];
    
    await sharp({
      create: {
        width: coverWidth,
        height: coverHeight,
        channels: 4,
        background: { r: 102, g: 126, b: 234, alpha: 255 }
      }
    })
    .composite([
      {
        input: Buffer.from(createSVG(coverWidth, coverHeight)),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(outputPath);
    
    console.log('✅ Rasm saqlandi:', outputPath);
    
  } catch (err) {
    console.error('Xatolik:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

function createSVG(width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" rx="20"/>
    <text x="${width/2}" y="${height/2 - 40}" font-family="Arial" font-size="80" fill="white" text-anchor="middle" font-weight="bold">📖</text>
    <text x="${width/2}" y="${height/2 + 40}" font-family="Arial" font-size="26" fill="white" text-anchor="middle">30 Kunda TOPIK</text>
    <text x="${width/2}" y="${height/2 + 80}" font-family="Arial" font-size="22" fill="rgba(255,255,255,0.8)" text-anchor="middle">Intermediate Vocabulary</text>
  </svg>`;
}

extractCover();
