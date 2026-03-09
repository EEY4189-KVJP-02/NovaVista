const puppeteer = require('puppeteer');
(async () => {
    try {
        const b = await puppeteer.launch();
        const p = await b.newPage();
        p.on('console', msg => console.log('LOG:', msg.text()));
        p.on('pageerror', err => console.log('ERROR:', err.message));
        await p.goto('http://localhost:3000/hotel', { waitUntil: 'networkidle2' });
        const btn = await p.waitForSelector('.view-btn', { timeout: 5000 });
        await btn.click();
        await new Promise(r => setTimeout(r, 2000));
        const m = await p.$('.modal-body');
        console.log('Modal visible:', !!m);
        await b.close();
    } catch (e) {
        console.error('PUPPETEER EXCEPTION:', e.message);
    }
    process.exit(0);
})();
