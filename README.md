# Titu's Luxury Personal Website

A sophisticated, luxury personal website built with React, TailwindCSS, and Framer Motion. Features elegant red and white color scheme with smooth animations and responsive design.

## 🎨 Features

- **Luxury Design**: Elegant red and white color palette with premium typography
- **Smooth Animations**: Framer Motion powered animations throughout
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Interactive Elements**: Hover effects, smooth scrolling, and animated particles
- **Modern Tech Stack**: React 18, TailwindCSS, Framer Motion

## 📑 Sections

1. **Hero Section** - Welcome message with animated background
2. **About Section** - Personal introduction with profile photo placeholder
3. **Gallery Section** - Image grid with hover animations and modal preview
4. **Quotes Section** - Inspirational quotes with elegant typography
5. **Contact Section** - Contact form with validation and animations

## ✨ Enhanced Features

- **Advanced Gallery**: Enhanced filtering, tags, and featured content
- **Interactive Elements**: Smooth animations and hover effects
- **Responsive Design**: Optimized for all devices
- **Professional UI**: Luxury design with elegant typography
- **Content Management**: Easy organization with categories and tags

## 🚀 Quick Deploy

### One-Click Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mrAyubkhon/tity.git)

**Live Demo:** [https://tity.vercel.app](https://tity.vercel.app)

## 🛠️ Full Stack Setup

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for file storage)

### Backend Setup
```bash
# Install backend dependencies
cd backend
npm install

# Create environment file
cp env.example .env
# Edit .env with your MongoDB and Cloudinary credentials

# Start backend server
npm run dev
```

### Frontend Setup
```bash
# Install frontend dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm start
```

### Database Configuration
See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.js`:
- `luxury-red`: #DC2626 (main red)
- `elegant-red`: #B91C1C (darker red)
- `soft-red`: #FEE2E2 (light red)
- `cream-white`: #FEFEFE (background)
- `soft-white`: #F8FAFC (secondary background)

### Fonts
- **Elegant**: Playfair Display (for headings)
- **Modern**: Inter (for body text)

### Content
Replace placeholder content in each component:
- Update personal information in `About.js`
- Add real photos to `Gallery.js`
- Modify quotes in `Quotes.js`
- Update contact information in `Contact.js`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project for production:
```bash
npm run build
```

The `build` folder contains the production-ready files.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.js
│   ├── Hero.js
│   ├── About.js
│   ├── Gallery.js
│   ├── Quotes.js
│   ├── Contact.js
│   └── BackgroundAnimation.js
├── App.js
├── index.js
└── index.css
```

## 🎯 Features in Detail

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Floating background particles
- Scroll-triggered animations
- Loading states for form submission

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

### Performance
- Optimized images and animations
- Lazy loading for better performance
- Minimal bundle size

## 🔧 Dependencies

- **React**: ^18.2.0
- **Framer Motion**: ^10.16.4
- **TailwindCSS**: ^3.3.2
- **Autoprefixer**: ^10.4.14
- **PostCSS**: ^8.4.24

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ for Titu's luxury world.
