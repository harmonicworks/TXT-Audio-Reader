// TXT Audio Reader — runs the Kokoro voice model off the main page so the browser stays responsive.
import { KokoroTTS } from "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.0/+esm";

const MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";
let tts = null;
let chain = Promise.resolve();   // handle one job at a time
let minRun = 0;                  // jobs from older (stopped) runs are skipped

const progress = p => {
  if (p.status === "progress" && p.total) postMessage({ type: "progress", loaded: p.loaded, total: p.total });
};

async function handle(m) {
  try {
    if (m.type === "load") {
      const useGPU = !!(self.navigator && navigator.gpu);
      try {
        tts = await KokoroTTS.from_pretrained(MODEL, useGPU
          ? { dtype: "fp32", device: "webgpu", progress_callback: progress }
          : { dtype: "q8", device: "wasm", progress_callback: progress });
        postMessage({ type: "ready", gpu: useGPU });
      } catch (err) {
        if (!useGPU) throw err;
        tts = await KokoroTTS.from_pretrained(MODEL, { dtype: "q8", device: "wasm", progress_callback: progress });
        postMessage({ type: "ready", gpu: false });
      }
    } else if (m.type === "gen") {
      if (m.run < minRun) { postMessage({ type: "error", id: m.id, message: "cancelled" }); return; }
      const out = await tts.generate(m.text, { voice: m.voice, speed: m.speed });
      const audio = out.audio.slice();
      postMessage({ type: "audio", id: m.id, audio, rate: out.sampling_rate || 24000 }, [audio.buffer]);
    }
  } catch (err) {
    postMessage({ type: "error", id: m.id, message: String((err && err.message) || err) });
  }
}

self.onmessage = e => {
  if (e.data.type === "cancel") { minRun = e.data.run; return; }
  chain = chain.then(() => handle(e.data));
};
