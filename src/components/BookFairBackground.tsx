'use client'

import { useEffect, useRef, memo } from 'react'
import { useAppStore } from '@/lib/store'

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Particle {
  x: number; y: number
  vx: number; vy: number
  opacity: number; life: number; maxLife: number
  size: number; rotation: number; rotSpeed: number
  type: 'book' | 'sparkle' | 'page' | 'arch' | 'dot'
  color: string
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const C_BLUE  = '#00B4D1'
const C_GOLD  = '#C4A35A'
const C_NAVY  = '#0B1D35'

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

/** Draw a stylised open book */
function drawBook(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rot: number, opacity: number, color: string) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.globalAlpha = opacity
  ctx.strokeStyle = color
  ctx.lineWidth = 1.2

  const hW = w / 2, hH = h / 2

  // Left page
  ctx.beginPath()
  ctx.moveTo(0, -hH)
  ctx.quadraticCurveTo(-hW * 0.9, -hH * 0.5, -hW, 0)
  ctx.quadraticCurveTo(-hW * 0.9, hH * 0.5, 0, hH)
  ctx.stroke()

  // Right page
  ctx.beginPath()
  ctx.moveTo(0, -hH)
  ctx.quadraticCurveTo(hW * 0.9, -hH * 0.5, hW, 0)
  ctx.quadraticCurveTo(hW * 0.9, hH * 0.5, 0, hH)
  ctx.stroke()

  // Spine
  ctx.beginPath(); ctx.moveTo(0, -hH); ctx.lineTo(0, hH); ctx.stroke()

  // Page lines
  ctx.lineWidth = 0.6
  ctx.globalAlpha = opacity * 0.4
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue
    const yOff = (i / 3) * hH * 0.6
    const sign = i < 0 ? -1 : 1
    ctx.beginPath()
    ctx.moveTo(sign * hW * 0.15, yOff)
    ctx.lineTo(sign * hW * 0.78, yOff)
    ctx.stroke()
  }
  ctx.restore()
}

/** Draw a 4-point sparkle / star */
function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, opacity: number, color: string) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.globalAlpha = opacity
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 4)
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, r); ctx.stroke()
  }
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = color; ctx.fill()
  ctx.restore()
}

/** Draw a flying single page */
function drawPage(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rot: number, opacity: number, color: string) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.globalAlpha = opacity
  ctx.strokeStyle = color
  ctx.lineWidth = 0.8
  // Rectangle with curl
  ctx.beginPath()
  ctx.moveTo(-w / 2, -h / 2)
  ctx.lineTo(w / 2 - 5, -h / 2)
  ctx.lineTo(w / 2, -h / 2 + 5)
  ctx.lineTo(w / 2, h / 2)
  ctx.lineTo(-w / 2, h / 2)
  ctx.closePath()
  ctx.stroke()
  // Curl corner
  ctx.beginPath()
  ctx.moveTo(w / 2 - 5, -h / 2)
  ctx.lineTo(w / 2 - 5, -h / 2 + 5)
  ctx.lineTo(w / 2, -h / 2 + 5)
  ctx.stroke()
  // Lines
  ctx.lineWidth = 0.5
  ctx.globalAlpha = opacity * 0.4
  for (let i = 1; i <= 4; i++) {
    const yOff = -h / 2 + (h / 5) * i
    ctx.beginPath()
    ctx.moveTo(-w / 2 + 4, yOff)
    ctx.lineTo(w / 2 - 4, yOff)
    ctx.stroke()
  }
  ctx.restore()
}

/** Draw a subtle arch / ogival arch (Islamic geometry motif) */
function drawArch(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, opacity: number, color: string) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.globalAlpha = opacity
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  // Pointed arch
  ctx.beginPath()
  ctx.moveTo(-r, 0)
  ctx.quadraticCurveTo(-r, -r * 1.5, 0, -r * 2)
  ctx.quadraticCurveTo(r, -r * 1.5, r, 0)
  ctx.stroke()
  // Inner arch
  ctx.globalAlpha = opacity * 0.4
  const ir = r * 0.65
  ctx.beginPath()
  ctx.moveTo(-ir, 0)
  ctx.quadraticCurveTo(-ir, -ir * 1.5, 0, -ir * 2)
  ctx.quadraticCurveTo(ir, -ir * 1.5, ir, 0)
  ctx.stroke()
  ctx.restore()
}

/* ─── Pyramid SVG path (drawn via canvas lines) ─────────────────────────── */
function drawPyramid(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseW: number, h: number, opacity: number, color: string) {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.strokeStyle = color
  ctx.lineWidth = 1.2

  // Outline
  ctx.beginPath()
  ctx.moveTo(cx, cy - h)                // apex
  ctx.lineTo(cx + baseW / 2, cy)        // right base
  ctx.lineTo(cx - baseW / 2, cy)        // left base
  ctx.closePath()
  ctx.stroke()

  // Horizontal "course" lines (slightly different spacing — authentic)
  const lines = 5
  ctx.lineWidth = 0.5
  ctx.globalAlpha = opacity * 0.35
  for (let i = 1; i < lines; i++) {
    const t = i / lines
    const y = lerp(cy - h, cy, t)
    const halfW = (baseW / 2) * t
    ctx.beginPath()
    ctx.moveTo(cx - halfW, y)
    ctx.lineTo(cx + halfW, y)
    ctx.stroke()
  }

  // Oblique faces (centre ridge)
  ctx.globalAlpha = opacity * 0.25
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.moveTo(cx, cy - h)
  ctx.lineTo(cx, cy)
  ctx.stroke()

  ctx.restore()
}

/* ─── Blueprint grid + scan line overlay ─────────────────────────────────── */
function drawBlueprint(ctx: CanvasRenderingContext2D, w: number, h: number, tick: number, isDark: boolean) {
  const gridSize = 50
  const lineAlpha = isDark ? 0.04 : 0.025
  ctx.save()
  ctx.strokeStyle = C_BLUE
  ctx.lineWidth = 0.5
  ctx.globalAlpha = lineAlpha
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }
  // Subtly moving horizontal scan line
  const scanY = (tick * 0.3) % h
  const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30)
  grad.addColorStop(0,   'transparent')
  grad.addColorStop(0.5, `${C_BLUE}${isDark ? '18' : '0C'}`)
  grad.addColorStop(1,   'transparent')
  ctx.globalAlpha = 1
  ctx.fillStyle = grad
  ctx.fillRect(0, scanY - 30, w, 60)
  ctx.restore()
}

/** Radial glow blob */
function drawGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, opacity: number, color: string) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0,   color + Math.round(opacity * 255).toString(16).padStart(2, '0'))
  g.addColorStop(1,   'transparent')
  ctx.save()
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const BookFairBackground = memo(function BookFairBackground() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const animRef     = useRef<number>(0)
  const tickRef     = useRef(0)
  const particles   = useRef<Particle[]>([])
  const { theme }   = useAppStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const isDark = () => document.documentElement.classList.contains('dark')

    // ── Spawn particles ──
    const TYPES: Particle['type'][] = ['book','book','book','book','book','book','page','page','page','sparkle','sparkle','arch','dot','dot','dot']
    const COUNT = Math.min(35, Math.floor(window.innerWidth / 50))

    particles.current = Array.from({ length: COUNT }, () => spawnParticle(canvas.width, canvas.height))

    function spawnParticle(W: number, H: number, fromBottom = false): Particle {
      const type = TYPES[Math.floor(Math.random() * TYPES.length)]
      const colors = [C_BLUE, C_BLUE, C_BLUE, C_GOLD]
      return {
        x:       Math.random() * W,
        y:       fromBottom ? H + 60 : Math.random() * H,
        vx:      (Math.random() - 0.5) * 0.4,
        vy:      -(Math.random() * 0.5 + 0.2),
        opacity: 0,
        life:    fromBottom ? 0 : Math.random() * 400,
        maxLife: 400 + Math.random() * 400,
        size:    type === 'dot' ? 2 + Math.random() * 4 : 22 + Math.random() * 36,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    }

    // ── Static pyramid positions (fixed, subtle, large) ──
    const PYRAMIDS = [
      { cx: 0.15, cy: 0.88, bw: 260, h: 140, op: 0.035 },
      { cx: 0.85, cy: 0.88, bw: 200, h: 110, op: 0.03  },
      { cx: 0.5,  cy: 0.92, bw: 160, h:  90, op: 0.025 },
    ]

    // ── Animation loop ──
    const animate = () => {
      const W = canvas.width, H = canvas.height
      const dark = isDark()

      ctx.clearRect(0, 0, W, H)
      tickRef.current++

      // Blueprint grid + scan
      drawBlueprint(ctx, W, H, tickRef.current, dark)

      // Soft glow orbs
      drawGlow(ctx, W * 0.15, H * 0.2, 280, dark ? 0.05 : 0.03, C_BLUE)
      drawGlow(ctx, W * 0.85, H * 0.7, 320, dark ? 0.04 : 0.025, C_BLUE)
      drawGlow(ctx, W * 0.5,  H * 0.5, 180, dark ? 0.025 : 0.015, C_GOLD)

      // Static pyramids (always rendered, opacity scales with dark)
      PYRAMIDS.forEach(p => {
        drawPyramid(ctx, W * p.cx, H * p.cy, p.bw, p.h, dark ? p.op * 1.6 : p.op, C_BLUE)
      })

      // Particles
      particles.current.forEach((p, i) => {
        p.x   += p.vx
        p.y   += p.vy
        p.rotation += p.rotSpeed
        p.life += 1

        const ratio = p.life / p.maxLife
        p.opacity = ratio < 0.12
          ? (ratio / 0.12) * 0.15
          : ratio > 0.85
            ? ((1 - ratio) / 0.15) * 0.15
            : 0.05 + Math.sin(p.life * 0.025) * 0.05

        // Respawn
        if (p.y < -80 || p.x < -80 || p.x > W + 80 || p.life > p.maxLife) {
          particles.current[i] = spawnParticle(W, H, true)
          return
        }

        const s = p.size
        switch (p.type) {
          case 'book':
            drawBook(ctx, p.x, p.y, s * 1.4, s, p.rotation, p.opacity, p.color); break
          case 'page':
            drawPage(ctx, p.x, p.y, s * 0.8, s, p.rotation, p.opacity, p.color); break
          case 'sparkle':
            drawSparkle(ctx, p.x, p.y, s * 0.55, p.rotation, p.opacity, p.color); break
          case 'arch':
            drawArch(ctx, p.x, p.y, s * 0.5, p.rotation, p.opacity, p.color); break
          case 'dot':
            ctx.save()
            ctx.globalAlpha = p.opacity * 1.2
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.fill()
            ctx.restore()
            break
        }
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    />
  )
})

export default BookFairBackground
