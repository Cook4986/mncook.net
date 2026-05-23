'use client';

import { useEffect, useRef, useState } from 'react';

/* =========================================================
   RoomToneToggle — procedural ambient sound for the dark hero.

   No audio files: everything is synthesized at runtime via
   the Web Audio API. The mix is three voices crossfaded
   together inside a master gain:

     • SUB DRONE  — 55 Hz sine with slow LFO on freq
                   (the room's pulse / standing wave)
     • WIND      — band-pass filtered noise with a
                   gust-LFO on the filter freq
     • AM STATIC — high-Q band-pass on noise with an
                   AM (gain) LFO (distant radio receiver)

   Browser autoplay policy forbids starting audio without
   a user gesture, so the AudioContext is created lazily
   inside the click handler. The toggle button sits in the
   bottom-right of the hero canvas at all times.
   ========================================================= */

class RoomToneSynth {
  ctx: AudioContext;
  master: GainNode;
  active = false;

  constructor() {
    interface WindowWithWebkitAudio extends Window {
      webkitAudioContext?: typeof AudioContext;
    }
    const w = window as unknown as WindowWithWebkitAudio;
    const AC: typeof AudioContext = window.AudioContext || w.webkitAudioContext!;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);

    const noiseBuf = this.makeNoiseBuffer(4);

    /* ----- SUB DRONE ----- */
    const drone = this.ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;
    const droneG = this.ctx.createGain();
    droneG.gain.value = 0.075;
    drone.connect(droneG).connect(this.master);

    // Subtle frequency wobble — ~14 s period
    const droneLfo = this.ctx.createOscillator();
    droneLfo.frequency.value = 0.07;
    const droneLfoG = this.ctx.createGain();
    droneLfoG.gain.value = 0.6;
    droneLfo.connect(droneLfoG).connect(drone.frequency);

    // Faint harmonic (octave up at lower gain) for body
    const drone2 = this.ctx.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 110;
    const drone2G = this.ctx.createGain();
    drone2G.gain.value = 0.020;
    drone2.connect(drone2G).connect(this.master);

    /* ----- WIND ----- */
    const wind = this.ctx.createBufferSource();
    wind.buffer = noiseBuf;
    wind.loop = true;
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 420;
    windFilter.Q.value = 0.6;
    const windG = this.ctx.createGain();
    windG.gain.value = 0.050;
    wind.connect(windFilter).connect(windG).connect(this.master);

    // Gust LFO
    const windLfo = this.ctx.createOscillator();
    windLfo.frequency.value = 0.13;
    const windLfoG = this.ctx.createGain();
    windLfoG.gain.value = 220;
    windLfo.connect(windLfoG).connect(windFilter.frequency);

    /* ----- AM STATIC ----- */
    const sn = this.ctx.createBufferSource();
    sn.buffer = noiseBuf;
    sn.loop = true;
    const snFilter = this.ctx.createBiquadFilter();
    snFilter.type = 'bandpass';
    snFilter.frequency.value = 2400;
    snFilter.Q.value = 6;
    const snG = this.ctx.createGain();
    snG.gain.value = 0.022;
    sn.connect(snFilter).connect(snG).connect(this.master);

    // AM LFO — modulates the static gain
    const snLfo = this.ctx.createOscillator();
    snLfo.frequency.value = 0.4;
    const snLfoG = this.ctx.createGain();
    snLfoG.gain.value = 0.018;
    snLfo.connect(snLfoG).connect(snG.gain);

    drone.start();
    drone2.start();
    droneLfo.start();
    wind.start();
    windLfo.start();
    sn.start();
    snLfo.start();
  }

  private makeNoiseBuffer(seconds: number): AudioBuffer {
    const buf = this.ctx.createBuffer(2, this.ctx.sampleRate * seconds, this.ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
    }
    return buf;
  }

  async fadeIn(target = 0.55, secs = 1.8) {
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(target, now + secs);
    this.active = true;
  }

  fadeOut(secs = 1.2) {
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + secs);
    this.active = false;
  }

  destroy() {
    try { this.ctx.close(); } catch { /* noop */ }
  }
}

export default function RoomToneToggle() {
  const synth = useRef<RoomToneSynth | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    if (!synth.current) synth.current = new RoomToneSynth();
    if (playing) {
      synth.current.fadeOut();
      setPlaying(false);
    } else {
      await synth.current.fadeIn();
      setPlaying(true);
    }
  };

  useEffect(() => {
    const s = synth;
    return () => { s.current?.destroy(); };
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Silence the room tone' : 'Play the room tone'}
      title={playing ? 'Silence' : 'Audio: ambient room tone'}
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 600,
        background: 'rgba(15, 12, 22, 0.55)',
        border: `1px solid rgba(255, 255, 255, ${playing ? 0.75 : 0.35})`,
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        padding: 0,
        cursor: 'pointer',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        transition: 'all 240ms ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: playing
          ? '0 0 18px rgba(255, 255, 255, 0.30), inset 0 0 8px rgba(255, 255, 255, 0.10)'
          : 'none',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9 L4 15 L8 15 L13 19 L13 5 L8 9 Z" fill="#ffffff" fillOpacity={playing ? 0.85 : 0.55} />
        {playing ? (
          <g>
            <path d="M16 8 Q19 12 16 16" opacity="0.9">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
            </path>
            <path d="M18 5 Q23 12 18 19" opacity="0.6">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.6s" repeatCount="indefinite" />
            </path>
          </g>
        ) : (
          <path d="M16 7 L22 17" opacity="0.7" />
        )}
      </svg>
    </button>
  );
}
