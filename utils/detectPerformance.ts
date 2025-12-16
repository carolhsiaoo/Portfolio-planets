/**
 * Detect device performance tier for 3D rendering optimization
 */

export type PerformanceTier = 'high' | 'medium' | 'low' | 'potato';

export interface PerformanceSettings {
  samples: number;
  resolution: number;
  lights: 'full' | 'reduced' | 'minimal';
  autoRotate: boolean;
  mouseTracking: boolean;
  enableEffects: boolean;
}

/**
 * Detect if device is an Intel Mac (typically lower GPU performance)
 */
function isIntelMac(): boolean {
  const userAgent = navigator.userAgent;
  const isMac = /Mac/.test(userAgent);

  if (!isMac) return false;

  // Check if it's an M1/M2/M3 Mac (higher performance)
  // M-series Macs typically have higher GPU capabilities
  const isAppleSilicon = /Mac OS X.*AppleWebKit/.test(userAgent);

  // If we can detect GPU, check for Intel
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl) {
    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const rendererStr = String(renderer).toLowerCase();

      // Intel Iris, Intel HD, Intel UHD = Intel Mac
      if (/intel/.test(rendererStr)) {
        return true;
      }

      // Apple GPU = M-series Mac (better performance)
      if (/apple/.test(rendererStr)) {
        return false;
      }
    }
  }

  // Fallback: assume Intel if Mac and not detected as Apple Silicon
  return isMac;
}

/**
 * Detect device performance tier
 */
export function detectPerformanceTier(): PerformanceTier {
  const factors = {
    cpuCores: navigator.hardwareConcurrency || 4,
    memory: (navigator as any).deviceMemory || 4,
    isMobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
    isIntelMac: isIntelMac(),
  };

  // Intel Macs typically struggle with heavy 3D
  if (factors.isIntelMac) {
    if (factors.memory <= 8 || factors.cpuCores <= 4) {
      return 'low'; // Older Intel Macs
    }
    return 'medium'; // Newer Intel Macs (2019-2020)
  }

  // Mobile devices
  if (factors.isMobile) {
    if (factors.memory <= 2) return 'potato';
    if (factors.memory <= 4) return 'low';
    return 'medium';
  }

  // Desktop/Laptop scoring
  let score = 0;

  if (factors.cpuCores <= 2) score += 3;
  else if (factors.cpuCores <= 4) score += 2;
  else if (factors.cpuCores <= 6) score += 1;

  if (factors.memory <= 2) score += 3;
  else if (factors.memory <= 4) score += 2;
  else if (factors.memory <= 8) score += 1;

  if (score >= 5) return 'potato';
  if (score >= 3) return 'low';
  if (score >= 1) return 'medium';
  return 'high';
}

/**
 * Get performance settings based on tier
 */
export function getPerformanceSettings(tier: PerformanceTier): PerformanceSettings {
  switch (tier) {
    case 'high':
      return {
        samples: 8,
        resolution: 256,
        lights: 'full',
        autoRotate: true,
        mouseTracking: true,
        enableEffects: true,
      };

    case 'medium':
      return {
        samples: 6,
        resolution: 128,
        lights: 'reduced',
        autoRotate: true,
        mouseTracking: true,
        enableEffects: true,
      };

    case 'low':
      return {
        samples: 4,
        resolution: 128,
        lights: 'minimal',
        autoRotate: true,
        mouseTracking: false, // Disable mouse tracking for Intel Macs
        enableEffects: false,
      };

    case 'potato':
      return {
        samples: 2,
        resolution: 64,
        lights: 'minimal',
        autoRotate: false,
        mouseTracking: false,
        enableEffects: false,
      };
  }
}

/**
 * Monitor FPS and suggest tier downgrade
 */
export class FPSMonitor {
  private frames: number[] = [];
  private lastTime = performance.now();
  private callbacks: ((fps: number) => void)[] = [];

  start() {
    const measure = () => {
      const currentTime = performance.now();
      const delta = currentTime - this.lastTime;

      if (delta >= 1000) {
        const fps = Math.round((this.frames.length / delta) * 1000);
        this.callbacks.forEach(cb => cb(fps));
        this.frames = [];
        this.lastTime = currentTime;
      }

      this.frames.push(currentTime);
      requestAnimationFrame(measure);
    };

    requestAnimationFrame(measure);
  }

  onFPSUpdate(callback: (fps: number) => void) {
    this.callbacks.push(callback);
  }

  shouldDowngrade(currentFPS: number, tier: PerformanceTier): boolean {
    if (tier === 'potato') return false; // Already at minimum

    // Downgrade if FPS is consistently below threshold
    if (tier === 'high' && currentFPS < 45) return true;
    if (tier === 'medium' && currentFPS < 30) return true;
    if (tier === 'low' && currentFPS < 20) return true;

    return false;
  }
}
