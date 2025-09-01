import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// The UMD build for vfs_fonts.js requires a namespace import (`import * as`) to be handled correctly
// in a native browser ES module environment. This ensures that the `pdfMake` property containing the
// virtual file system (vfs) is accessible.
if ((pdfFonts as any)?.pdfMake?.vfs) {
  (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;
} else {
  console.error("Could not load vfs_fonts. PDF font support will be limited.");
}

let cairoFontLoaded = false;

async function fetchFontAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function ensureArabicPdfFont(): Promise<void> {
  if (cairoFontLoaded) {
    return;
  }
  
  try {
    const fontUrl = 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/cairo/Cairo-Regular.ttf';
    const cairoRegularBase64 = await fetchFontAsBase64(fontUrl);
    
    (pdfMake as any).vfs['Cairo-Regular.ttf'] = cairoRegularBase64;

    pdfMake.fonts = {
      ...(pdfMake.fonts || {}),
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      },
      Cairo: {
        normal: 'Cairo-Regular.ttf',
        bold: 'Cairo-Regular.ttf',
        italics: 'Cairo-Regular.ttf',
        bolditalics: 'Cairo-Regular.ttf'
      }
    };
    cairoFontLoaded = true;
  } catch (error) {
    console.error("Could not load Arabic font for PDF export:", error);
    // Fallback to Roboto if Cairo fails to load
    if (!pdfMake.fonts) {
        pdfMake.fonts = {};
    }
    if (!pdfMake.fonts.Cairo) {
        pdfMake.fonts.Cairo = pdfMake.fonts.Roboto;
    }
  }
}

export async function generateSha256Hash(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}