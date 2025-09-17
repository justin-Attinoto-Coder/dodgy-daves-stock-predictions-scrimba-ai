import { dates } from '@/utils/data';

const tickersArr: string[] = [];

const generateReportBtn = document.querySelector('.generate-report-btn') as HTMLButtonElement | null;
if (generateReportBtn) {
  generateReportBtn.addEventListener('click', fetchStockData);
}

document.getElementById('ticker-input-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const tickerInput = document.getElementById('ticker-input') as HTMLInputElement | null;
  if (tickerInput && tickerInput.value.length > 2) {
    if (generateReportBtn) generateReportBtn.disabled = false;
    const newTickerStr = tickerInput.value;
    tickersArr.push(newTickerStr.toUpperCase());
    tickerInput.value = '';
    renderTickers();
  } else {
    const label = document.getElementsByTagName('label')[0];
    label.style.color = 'red';
    label.textContent = 'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.';
  }
});

function renderTickers() {
  const tickersDiv = document.querySelector('.ticker-choice-display');
  if (!tickersDiv) return;
  tickersDiv.innerHTML = '';
  tickersArr.forEach((ticker) => {
    const newTickerSpan = document.createElement('span');
    newTickerSpan.textContent = ticker;
    newTickerSpan.classList.add('ticker');
    tickersDiv.appendChild(newTickerSpan);
  });
}

const loadingArea = document.querySelector('.loading-panel') as HTMLElement | null;
const apiMessage = document.getElementById('api-message') as HTMLElement | null;

async function fetchStockData() {
  (document.querySelector('.action-panel') as HTMLElement | null)?.style.setProperty('display', 'none');
  if (loadingArea) loadingArea.style.display = 'flex';
  // Get Polygon API key from a meta tag or window variable injected by Next.js
  const polygonApiKey = (window as any).POLYGON_API_KEY || document.querySelector('meta[name="polygon-api-key"]')?.getAttribute('content');
  if (!polygonApiKey) {
    if (loadingArea) loadingArea.innerText = 'Polygon API key is missing.';
    return;
  }
  try {
    const stockData = await Promise.all(tickersArr.map(async (ticker) => {
      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${polygonApiKey}`;
      const response = await fetch(url);
      const data = await response.text();
      const status = response.status;
      if (status === 200) {
        if (apiMessage) apiMessage.innerText = 'Creating report...';
        return data;
      } else {
        if (loadingArea) loadingArea.innerText = 'There was an error fetching stock data.';
      }
    }));
    fetchReport(stockData.join(''));
  } catch (err) {
    if (loadingArea) loadingArea.innerText = 'There was an error fetching stock data.';
    console.error('error: ', err);
  }
}

async function fetchReport(data: string) {
  try {
    const response = await fetch('/api/prediction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockData: data })
    });
    const result = await response.json();
    renderReport(result.report || result.error);
  } catch (err) {
    if (loadingArea) loadingArea.innerText = 'There was an error generating the report.';
    console.error('error: ', err);
  }
}

function renderReport(output: string) {
  if (loadingArea) loadingArea.style.display = 'none';
  const outputArea = document.querySelector('.output-panel') as HTMLElement | null;
  if (!outputArea) return;
  const report = document.createElement('p');
  outputArea.appendChild(report);
  report.textContent = output;
  outputArea.style.display = 'flex';
}
