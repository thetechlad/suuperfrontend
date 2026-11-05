"use client";

import { useEffect, useRef } from "react";

const VERTEX = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";

// Slow flowing contour lines in ink and paper behind the hero.
const FRAGMENT = `
precision mediump float;
uniform vec2 res; uniform float t;
float hash(vec2 v){ return fract(sin(dot(v, vec2(41.3, 289.1))) * 43758.5453); }
float noise(vec2 v){ vec2 i = floor(v); vec2 f = fract(v); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }
float fbm(vec2 v){ float s = 0.0; float a = 0.55; for(int i = 0; i < 5; i++){ s += a * noise(v); v *= 2.02; a *= 0.5; } return s; }
void main(){
  vec2 uv = gl_FragCoord.xy / res.xy;
  vec2 q = vec2(uv.x * 2.6, uv.y * 1.5);
  float f = fbm(q + vec2(t * 0.05, t * 0.03) + fbm(q * 1.7 - t * 0.025));
  float band = smoothstep(0.35, 0.9, f);
  float lines = smoothstep(0.02, 0.0, abs(fract(f * 9.0) - 0.5) - 0.46);
  vec3 ink = vec3(0.055, 0.07, 0.063); vec3 paper = vec3(0.97, 0.96, 0.95);
  vec3 col = mix(ink, paper, lines * 0.6);
  float a = band * 0.3 + lines * 0.14;
  float vig = smoothstep(1.2, 0.2, length(uv - 0.5));
  gl_FragColor = vec4(col, a * vig);
}`;

export function HeroCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!canvas || !gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "res");
    const uT = gl.getUniformLocation(prog, "t");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    let visible = true;

    const draw = () => {
      // Render at half resolution; the effect is soft so it doesn't need full res.
      const w = Math.max(1, Math.floor(canvas.clientWidth * 0.5));
      const h = Math.max(1, Math.floor(canvas.clientHeight * 0.5));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uT, still ? 12 : (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    // Pause the loop while the hero is off screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) draw();
    });
    io.observe(canvas);
    draw();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
