const fs = require('fs');
const path = require('path');

// Script para gerar SVGs dos ícones da PWA
// Execute: node scripts/generate-icons.js

const iconSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="80" fill="#059669"/>
  <circle cx="256" cy="180" r="60" fill="white"/>
  <path d="M256 260 L200 340 L312 340 Z" fill="white"/>
  <rect x="180" y="360" width="152" height="80" rx="10" fill="white"/>
  <circle cx="220" cy="400" r="8" fill="#059669"/>
  <circle cx="256" cy="400" r="8" fill="#059669"/>
  <circle cx="292" cy="400" r="8" fill="#059669"/>
</svg>
`;

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Cria o diretório se não existir
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Gera os arquivos SVG para cada tamanho
sizes.forEach(size => {
  const fileName = `icon-${size}x${size}.svg`;
  const filePath = path.join(iconsDir, fileName);
  
  const scaledSVG = iconSVG.replace('width="512" height="512"', `width="${size}" height="${size}"`);
  
  fs.writeFileSync(filePath, scaledSVG);
  console.log(`Gerado: ${fileName}`);
});

// Gera o favicon.ico (como SVG simples)
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
const faviconSVG = iconSVG.replace('width="512" height="512"', 'width="32" height="32"');
fs.writeFileSync(faviconPath.replace('.ico', '.svg'), faviconSVG);

console.log('Ícones gerados com sucesso!');
console.log('\nPara gerar ícones PNG de alta qualidade, use uma ferramenta como:');
console.log('- https://favicon.io/');
console.log('- https://realfavicongenerator.net/');
console.log('- Photoshop/GIMP com os SVGs gerados');

// Gera template para screenshots
const screenshotHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #10b981, #059669); }
        .container { max-width: 400px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px 20px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .logo { width: 80px; height: 80px; background: #059669; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; }
        .logo svg { width: 50px; height: 50px; fill: white; }
        h1 { color: #059669; margin: 0 0 10px; font-size: 24px; }
        p { color: #6b7280; margin: 0 0 30px; }
        .features { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .feature { padding: 20px; background: #f9fafb; border-radius: 10px; }
        .feature-icon { font-size: 24px; margin-bottom: 10px; }
        .feature-text { font-size: 14px; color: #374151; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M12 11 L8 17 L16 17 Z"/></svg>
        </div>
        <h1>WhatsApp Ranking</h1>
        <p>Analise suas mensagens de forma segura e privada</p>
        <div class="features">
            <div class="feature">
                <div class="feature-icon">🔒</div>
                <div class="feature-text">100% Privado</div>
            </div>
            <div class="feature">
                <div class="feature-icon">⚡</div>
                <div class="feature-text">Instantâneo</div>
            </div>
            <div class="feature">
                <div class="feature-icon">📊</div>
                <div class="feature-text">Completo</div>
            </div>
            <div class="feature">
                <div class="feature-icon">📱</div>
                <div class="feature-text">Offline</div>
            </div>
        </div>
    </div>
</body>
</html>
`;

const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

fs.writeFileSync(path.join(screenshotsDir, 'template.html'), screenshotHTML);
console.log('\nTemplate para screenshots criado em: public/screenshots/template.html');
console.log('Abra este arquivo no navegador e tire screenshots nas resoluções:');
console.log('- 540x720 (mobile portrait)');
console.log('- 720x540 (mobile landscape)');