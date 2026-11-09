"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/*
 * Trường hạt 3D "mặt biển" cho Hero (2026-11-09): lưới điểm gợn sóng, con trỏ tạo vùng sóng lan.
 * Toàn bộ chuyển động tính trong vertex shader (GPU), JS chỉ cập nhật uTime và uMouse mỗi khung.
 * Nền trắng nên dùng blending thường (không additive), màu xanh biển → aqua theo độ sâu.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute float aRandom;
  varying float vDepth;
  varying float vLift;

  void main() {
    vec3 p = position;
    float t = uTime * 0.55;
    float wave = sin(p.x * 0.32 + t) * 0.55
               + sin(p.z * 0.45 + t * 1.3) * 0.38
               + sin((p.x + p.z) * 0.18 + t * 0.7) * 0.5;

    // Gợn sóng quanh con trỏ (toạ độ mặt phẳng x/z)
    float d = distance(p.xz, uMouse);
    float ripple = exp(-d * 0.35) * sin(d * 1.6 - uTime * 3.2) * 0.9;

    p.y += wave + ripple + aRandom * 0.15;
    vLift = ripple;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vDepth = clamp(-mv.z / 38.0, 0.0, 1.0);
    gl_PointSize = (2.6 + aRandom * 1.8 + max(ripple, 0.0) * 3.0) * uPixelRatio * (16.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uNear;
  uniform vec3 uFar;
  uniform vec3 uHot;
  varying float vDepth;
  varying float vLift;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, r) * (1.0 - vDepth * 0.85);
    vec3 color = mix(uNear, uFar, vDepth);
    color = mix(color, uHot, clamp(vLift, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha);
  }
`;

// Lưới điểm dựng một lần khi module được tải (chỉ ở trình duyệt, vì component tải với ssr: false)
function buildGrid() {
  const cols = 150;
  const rows = 70;
  const gap = 0.42;
  const positions = new Float32Array(cols * rows * 3);
  const randoms = new Float32Array(cols * rows);
  let i = 0;
  for (let x = 0; x < cols; x++) {
    for (let z = 0; z < rows; z++) {
      positions[i * 3] = (x - cols / 2) * gap;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (z - rows / 2) * gap;
      randoms[i] = Math.random();
      i++;
    }
  }
  return { positions, randoms };
}

const GRID = buildGrid();

function Waves() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { positions, randoms } = GRID;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: {
        value:
          typeof window === "undefined"
            ? 1
            : Math.min(window.devicePixelRatio, 2),
      },
      uNear: { value: new THREE.Color("#0b5bd3") },
      uFar: { value: new THREE.Color("#84bcff") },
      uHot: { value: new THREE.Color("#19c3e6") },
    }),
    [],
  );

  useFrame(({ camera, pointer }, delta) => {
    const m = material.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    // Con trỏ (-1..1) → toạ độ mặt sóng, làm mượt để sóng không giật
    mouse.current.lerp(
      new THREE.Vector2(pointer.x * 22, -pointer.y * 9 + 2),
      0.06,
    );
    (m.uniforms.uMouse.value as THREE.Vector2).copy(mouse.current);
    // Camera lắc nhẹ theo chuột tạo chiều sâu
    camera.position.x += (pointer.x * 2.2 - camera.position.x) * 0.03;
    camera.position.y += (6 + pointer.y * 1.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, -2);
  });

  return (
    <points rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// active = false (Hero khuất màn hình hoặc giảm chuyển động): dừng vòng render, giữ khung hình cuối
export default function HeroParticles({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 6, 16], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Waves />
    </Canvas>
  );
}
