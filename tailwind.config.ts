import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'zewail': {
  				'blue': '#00B4D1',
  				'blue-dark': '#0096B7',
  				'blue-light': '#E0F7FA',
  				'blue-lighter': '#F0FCFD',
  				'navy': '#0B1D35',
  				'navy-light': '#1A2F4F',
  				'gold': '#C4A35A',
  				'gold-light': '#F5EFD6',
  				'accent': '#006B7E'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'float': 'float 6s ease-in-out infinite',
  			'float-slow': 'float 8s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
  			'shimmer': 'shimmer 3s ease-in-out infinite',
  			'slide-in-top': 'slide-in-top 0.6s ease-out',
  			'slide-in-left': 'slide-in-left 0.7s ease-out',
  			'fade-in': 'fade-in 0.8s ease-out',
  			'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
  			'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
  			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
  			'rotate-slow': 'rotate-slow 20s linear infinite',
  			'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
  		},
  		keyframes: {
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-20px)' }
  			},
  			'pulse-glow': {
  				'0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 180, 209, 0.3)' },
  				'50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 180, 209, 0.6)' }
  			},
  			'shimmer': {
  				'0%': { backgroundPosition: '200% center' },
  				'100%': { backgroundPosition: '-200% center' }
  			},
  			'slide-in-top': {
  				'0%': { opacity: '0', transform: 'translateY(-30px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'slide-in-left': {
  				'0%': { opacity: '0', transform: 'translateX(-50px)' },
  				'100%': { opacity: '1', transform: 'translateX(0)' }
  			},
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			'gradient-shift': {
  				'0%': { backgroundPosition: '0% center' },
  				'50%': { backgroundPosition: '100% center' },
  				'100%': { backgroundPosition: '0% center' }
  			},
  			'bounce-slow': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-10px)' }
  			},
  			'glow-pulse': {
  				'0%, 100%': { opacity: '0.5' },
  				'50%': { opacity: '1' }
  			},
  			'rotate-slow': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' }
  			},
  			'scale-pulse': {
  				'0%, 100%': { transform: 'scale(1)' },
  				'50%': { transform: 'scale(1.05)' }
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-blue': 'linear-gradient(135deg, #E0F7FA 0%, #B3E5FC 50%, #81D4FA 100%)',
  			'gradient-blue-dark': 'linear-gradient(135deg, #00B4D1 0%, #0096B7 100%)',
  			'gradient-premium': 'linear-gradient(135deg, #F0FCFD 0%, #E0F7FA 50%, #B3E5FC 100%)',
  		},
  		boxShadow: {
  			'blue-glow': '0 0 30px rgba(0, 180, 209, 0.2)',
  			'blue-glow-lg': '0 0 50px rgba(0, 180, 209, 0.3)',
  			'premium': '0 20px 60px rgba(0, 180, 209, 0.15)',
  			'premium-lg': '0 30px 80px rgba(0, 180, 209, 0.2)'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
export default config;
