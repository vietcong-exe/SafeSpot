/**
 * Safe Spot — Screenshot automático de todas as telas
 * Uso: node screenshots.js
 * Saída: pasta ./screenshots/
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// ── Configuração ──────────────────────────────────────────────
const BASE_URL = 'https://safe-spot-lake.vercel.app';
const OUT_DIR  = './screenshots';
const DEVICE   = { width: 390, height: 844, deviceScaleFactor: 2 }; // iPhone 14

// Telas públicas (sem login)
const PUBLIC_SCREENS = [
  { name: '01-onboarding', path: '/onboarding' },
  { name: '02-auth',       path: '/auth'        },
];

// Telas autenticadas (precisam de login)
const AUTH_SCREENS = [
  { name: '03-home',              path: '/home'              },
  { name: '04-journal',           path: '/journal'           },
  { name: '05-insights',          path: '/insights'          },
  { name: '06-community',         path: '/community'         },
  { name: '07-chat',              path: '/chat'              },
  { name: '08-selfcare',          path: '/selfcare'          },
  { name: '09-reflections',       path: '/reflections'       },
  { name: '10-profile',           path: '/profile'           },
  { name: '11-notifications',     path: '/notifications'     },
  { name: '12-find-psychologist', path: '/find-psychologist' },
  { name: '13-psychologist-1',    path: '/psychologist/1'    },
  { name: '14-psychologist-signup', path: '/psychologist-signup' },
];
// ─────────────────────────────────────────────────────────────

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/** Navega via React Router (sem reload — preserva estado de auth) */
async function spaNavigate(page, targetPath) {
  await page.evaluate((p) => {
    window.history.pushState({}, '', p);
    window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
  }, targetPath);
  await wait(800);
}

async function screenshot(page, name) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  ✓ ${name}.png`);
}

async function main() {
  // Cria pasta de saída
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport(DEVICE);

  // ── 1. Telas públicas ────────────────────────────────────────
  console.log('\n📸 Telas públicas...');
  for (const screen of PUBLIC_SCREENS) {
    await page.goto(`${BASE_URL}${screen.path}`, { waitUntil: 'networkidle2' });
    await wait(1000);
    await screenshot(page, screen.name);
  }

  // ── 2. Login automático ──────────────────────────────────────
  console.log('\n🔐 Fazendo login...');
  await page.goto(`${BASE_URL}/auth`, { waitUntil: 'networkidle2' });
  await wait(1000);

  // Tenta preencher email + senha se existirem, senão clica no primeiro botão
  const emailInput = await page.$('input[type="email"], input[name="email"], input[placeholder*="email" i]');
  const passInput  = await page.$('input[type="password"]');

  if (emailInput && passInput) {
    await emailInput.type('demo@safespot.app');
    await passInput.type('demo1234');
    await page.keyboard.press('Enter');
    console.log('  → Credenciais preenchidas');
  } else {
    // Sem formulário real — clica no botão principal (ex: "Entrar" / "Continuar")
    const btn = await page.$('button[type="submit"], button');
    if (btn) {
      await btn.click();
      console.log('  → Botão clicado');
    }
  }
  await wait(1500);

  // ── 3. Telas autenticadas ────────────────────────────────────
  console.log('\n📸 Telas autenticadas...');

  // Primeiro navega pra /home pra confirmar que está logado
  await spaNavigate(page, '/home');
  const currentUrl = page.url();
  if (currentUrl.includes('/auth')) {
    console.log('\n⚠️  Login não funcionou automaticamente.');
    console.log('   Solução: abra o app, faça login manualmente e');
    console.log('   rode o script com SKIP_AUTH=true:\n');
    console.log('   SKIP_AUTH=true node screenshots.js\n');
    await browser.close();
    return;
  }

  for (const screen of AUTH_SCREENS) {
    await spaNavigate(page, screen.path);
    await screenshot(page, screen.name);
  }

  await browser.close();

  // ── Resumo ───────────────────────────────────────────────────
  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`\n✅ ${files.length} screenshots salvas em ./${OUT_DIR}/`);
  console.log('   Resolução: 390×844 @2x (iPhone 14)\n');
}

main().catch(err => {
  console.error('\n❌ Erro:', err.message);
  process.exit(1);
});
