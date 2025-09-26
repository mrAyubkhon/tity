# 🎨 Titu's Luxury Website - Setup Instructions

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 📝 Content Customization Guide

### 1. Personal Information (About Section)
**File:** `src/components/About.js`

Replace the placeholder text with Titu's real information:
```javascript
// Update these sections:
<p className="text-elegant">
  // Replace with Titu's actual story
</p>
```

### 2. Profile Photo
**File:** `src/components/About.js`

Replace the placeholder div with an actual image:
```javascript
// Replace this div:
<div className="w-full h-full bg-gradient-to-br from-luxury-red/20 to-elegant-red/20 flex items-center justify-center">
  // With:
  <img src="/path/to/titu-photo.jpg" alt="Titu" className="w-full h-full object-cover" />
</div>
```

### 3. Gallery Images
**File:** `src/components/Gallery.js`

Replace placeholder gallery items with real photos:
```javascript
const galleryImages = [
  { id: 1, title: "Photo Title", category: "Category", src: "/images/photo1.jpg" },
  // Add more photos...
];
```

### 4. Contact Information
**File:** `src/components/Contact.js`

Update contact details:
```javascript
// Update these values:
<p className="text-white/80">hello@titu.com</p>
<p className="text-white/80">+1 (555) 123-4567</p>
<p className="text-white/80">New York, NY</p>
```

### 5. Quotes Section
**File:** `src/components/Quotes.js`

Replace quotes with Titu's favorite quotes:
```javascript
const quotes = [
  {
    text: "Your favorite quote here",
    author: "Author Name"
  },
  // Add more quotes...
];
```

## 🎨 Design Customization

### Colors
**File:** `tailwind.config.js`

Modify the color palette:
```javascript
colors: {
  'luxury-red': '#DC2626',    // Main red
  'elegant-red': '#B91C1C',   // Darker red
  'soft-red': '#FEE2E2',       // Light red
  'cream-white': '#FEFEFE',    // Background
  'soft-white': '#F8FAFC'      // Secondary background
}
```

### Fonts
**File:** `src/index.css`

Change fonts by updating the Google Fonts import:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap');
```

## 📱 Adding Real Images

1. **Create Images Folder**
   ```bash
   mkdir public/images
   ```

2. **Add Photos**
   - Place Titu's photos in `public/images/`
   - Recommended sizes:
     - Profile photo: 400x400px (square)
     - Gallery images: 600x600px (square)
     - Hero background: 1920x1080px

3. **Update Image References**
   ```javascript
   // Example:
   <img src="/images/titu-profile.jpg" alt="Titu" />
   ```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
```
Upload the `build` folder to your hosting provider.

## 🔧 Advanced Customization

### Adding New Sections
1. Create new component in `src/components/`
2. Import and add to `src/App.js`
3. Update navigation in `src/components/Navigation.js`

### Animation Customization
**File:** `tailwind.config.js`

Modify animation durations and effects:
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
  // Add your custom animations...
}
```

## 📞 Support

If you need help customizing the website, refer to:
- [React Documentation](https://reactjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Happy Customizing!** 🎉
