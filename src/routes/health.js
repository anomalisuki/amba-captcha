const express = require('express');
const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');
const { browserSlotStatus } = require('../services/browserLock');
const router = express.Router();

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return 'N/A';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getSwap() {
  // os.totalmem()/freemem() describe RAM, not swap. On Linux read /proc/meminfo.
  try {
    const info = fs.readFileSync('/proc/meminfo', 'utf8');
    const total = Number((info.match(/^SwapTotal:\s+(\d+)\s+kB/m) || [0, 0])[1]) * 1024;
    const free = Number((info.match(/^SwapFree:\s+(\d+)\s+kB/m) || [0, 0])[1]) * 1024;
    if (!total) return { total: 'N/A', used: 'N/A', free: 'N/A', usagePercent: 'N/A' };
    const used = Math.max(total - free, 0);
    return {
      total: formatBytes(total),
      used: formatBytes(used),
      free: formatBytes(free),
      usagePercent: ((used / total) * 100).toFixed(2) + '%'
    };
  } catch {
    return { total: 'N/A', used: 'N/A', free: 'N/A', usagePercent: 'N/A' };
  }
}

router.get('/health', async (req, res) => {
  const totalRam = os.totalmem();
  const freeRam = os.freemem();
  const usedRam = totalRam - freeRam;
  const cpus = os.cpus();
  const cpuInfo = {
    model: cpus[0]?.model || 'Unknown',
    cores: cpus.length,
    speed: cpus[0] ? cpus[0].speed + ' MHz' : 'N/A'
  };

  const finish = (diskUsage) => res.json({
    status: 'ok',
    service: 'turnstile-solver-js',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: os.platform(),
    arch: os.arch(),
    location: process.cwd(),
    ram: {
      total: formatBytes(totalRam),
      used: formatBytes(usedRam),
      free: formatBytes(freeRam),
      usagePercent: ((usedRam / totalRam) * 100).toFixed(2) + '%'
    },
    swap: getSwap(),
    cpu: cpuInfo,
    disk: diskUsage,
    browser: browserSlotStatus()
  });

  exec('df -h /', (error, stdout) => {
    if (error) return finish({ total: 'N/A', used: 'N/A', free: 'N/A', usagePercent: 'N/A' });
    try {
      const lines = stdout.trim().split('\n');
      const parts = lines[1]?.split(/\s+/) || [];
      finish({
        total: parts[1] || 'N/A',
        used: parts[2] || 'N/A',
        free: parts[3] || 'N/A',
        usagePercent: parts[4] || 'N/A'
      });
    } catch {
      finish({ total: 'N/A', used: 'N/A', free: 'N/A', usagePercent: 'N/A' });
    }
  });
});

module.exports = router;
