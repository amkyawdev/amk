# 🎨 Design System: Amkyawdev-ai Website

---

## 1. Overall Theme

| Element | Color | Hex |
|---------|-------|-----|
| Primary | Gold | `#FFD700` |
| Secondary | Gray | `#2C2F33` |
| Background | Black smoke | `#0A0A0A` |
| Text Primary | White | `#FFFFFF` |
| Text Secondary | Light Gray | `#B0B0B0` |
| Card BG | Dark | `#1E1E1E` |
| Input BG | Charcoal | `#2C2F33` |

- **Border Radius**: 8px (cards), 20px (buttons), 4px (inputs)
- **Spacing**: Compact (padding: 8-16px, margin: 4-12px)
- **Typography**: System fonts (SF Pro, Inter, Roboto)
- **Base Font Size**: 14px, 12px for small labels

---

## 2. Mobile-First Breakpoints

| Device | Width |
|--------|-------|
| Mobile | 320px - 480px |
| Tablet | 481px - 768px |
| Desktop | 769px+ (max-width: 500px) |

---

## 3. Page Layouts

### Get Started Page
- Full screen black smoke background
- Centered gold logo (48px height)
- Headline: "Amkyawdev-ai" (gold, bold, 28px)
- Subhead: "Burmese AI Bot for Everyone" (light gray, 14px)
- CTA Button: "Get Started" (gold filled, rounded 40px, full width 80%)
- Footer: "Already have an account? Login" (gold link)
- Background: animated gradient (gold → black)

### Login / Register / Reset Pages
- Form container: #1E1E1E, rounded 16px, padding 20px
- Input fields: #2C2F33 bg, gold focus ring, padding 12px
- Labels: 12px gold, left aligned
- Buttons: gold bg, black text, bold, full width

### User-Info Dialog (Modal)
- Width: 90% (max 350px)
- Background: #1E1E1E, border-top: 4px solid gold
- Title: "Tell us about yourself" (gold, 18px)
- Fields: Name, Age (dropdown 18-80), Interest
- Buttons: "Cancel" (gray), "Save" (gold)

### Storage Permission Dialog
- Same modal style
- Content: "Allow Amkyawdev-ai to store your chat history?"
- Icons: storage (gold), chat (gray)
- Buttons: "Deny" (gray), "Allow" (gold)

### Main Page (Bottom Nav)
- Bottom nav: fixed, gold bg, 50px height
- Icons (Bootstrap Icons, 20px): house, chat-dots, key, file-text, person
- Top bar: hamburger (left), logo (center), avatar (right)
- Body: scrollable cards (100% width, margin 8px)

### Chat Page
**Layout:**
- Top bar: hamburger + "Burme AI Bot" + settings
- Message area: scrollable, reversed
  - User: right, #2C2F33 bubble, white text, 16px radius (top-right 4px)
  - Bot: left, #1E1E1E bubble, gold left border
- Input area (fixed bottom):
  - Input: #2C2F33, gold border, 40px height, rounded 30px
  - Upload: paperclip (32px)
  - Send: gold circle (40px)
- Below input: token counter (right aligned)
- Voice: microphone icon

### API Page
- Grid (2 columns mobile)
- Cards: #1E1E1E, rounded 12px, padding 12px
- Each: API name, "Add Key" button, status dot

### Docs Page
- Markdown style with gold headers
- Code blocks: dark bg, gold syntax

### About Page
- Centered avatar (64px, gold border)
- Text: description, tech stack
- Social links: gold icons

---

## 4. Component Specs

### Buttons
| Type | Height | Padding | Font | Radius |
|------|--------|---------|------|--------|
| Primary | 36px | 0 16px | 13px bold | 20px |
| Secondary | 36px | 0 16px | 13px | 20px |
| Icon | 32px | - | - | 50% |

### Cards
- Width: 100% (max 400px)
- Padding: 12px
- Margin: 8px auto
- BG: #1E1E1E
- Radius: 12px

### Dialogs
- Width: 90% (max 350px)
- Backdrop: blur

---

## 5. Animations

| Animation | Trigger | Duration | Effect |
|-----------|---------|----------|--------|
| Thanking | "thanks" | 1.5s | Gold confetti |
| Generator | thinking | 0.5s loop | 3 jumping dots |
| Send button | click | 0.2s | ripple + scale 0.95 |
| Connection error | failed | 0.3s | shake + red border |
| Click button | any click | 0.1s | scale 0.97 |
| Work done | response | 0.3s | gold glow |
| Mobile transform | touch | 0.05s | scale 0.95 |
| Streaming | typing | 50ms/char | typewriter |

---

## 6. Icons (Bootstrap Icons CDN)

| Name | Icon Code |
|------|-----------|
| Hamburger | `bi-list` |
| Send | `bi-send-fill` |
| Upload | `bi-paperclip` |
| Voice | `bi-mic` |
| Home | `bi-house-door` |
| Chat | `bi-chat-dots` |
| API | `bi-key` |
| Docs | `bi-file-text` |
| About | `bi-person` |
| Storage | `bi-hdd-stack` |
| Close | `bi-x-lg` |

---

## 7. Responsive Rules

- Desktop: 500px centered container
- Tablet: 80% width
- Mobile (<480px): full width + 8px padding
- Modals: 90% width, max 350px

---

## 8. CSS Notes

- Use CSS Grid for layout
- Flexbox for buttons/nav
- `overflow-y: auto` for chat
- `position: fixed` for bottom nav/input
- Use `:active` for touch effects
- Gold variants:
  - `#FFD700` (primary)
  - `#DAA520` (dark)
  - `#FFF8DC` (light)

---

## 9. Visual Hierarchy

1. Gold (buttons, links, active)
2. White (primary text)
3. Light gray (secondary)
4. Dark gray (cards, inputs)
5. Black smoke (body)

---

## Quick Reference

```css
:root {
  --gold: #FFD700;
  --gold-dark: #DAA520;
  --gold-light: #FFF8DC;
  --bg: #0A0A0A;
  --card: #1E1E1E;
  --input: #2C2F33;
  --text: #FFFFFF;
  --text-secondary: #B0B0B0;
}
```

---

**Design System v1.0** - Amkyawdev-ai