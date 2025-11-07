# 🎬 CINEVERSE - Movie Explorer Web App

A modern, responsive movie exploration web application built with React.js that allows users to search, browse, and manage their favorite movies using The Movie Database (TMDB) API.

## 🚀 Live Demo

- **Live App**: https://movie-explorer-app-drab.vercel.app/
- **GitHub Repository**: https://github.com/gauravgarg143/movie-explorer-app.git

## ✨ Features

### Core Functionality
- 🔍 **Advanced Search** - Search for movies by title, actor, or director
- 🎭 **Browse Categories** - Explore Popular, Top Rated, and Upcoming movies
- 🌍 **Region Filtering** - Filter by Hollywood, Bollywood, or All regions
- 📄 **Detailed Movie Info** - View comprehensive movie details including:
  - Movie poster and backdrop
  - Title and release date
  - Genres and runtime
  - Rating and vote count
  - Plot overview
  - Similar movie recommendations
- ❤️ **Favorites Management** - Add/Remove movies to your personal collection
- 💾 **Persistent Storage** - Favorites saved locally using localStorage
- 🎨 **Dark/Light Mode** - Toggle between themes
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

### User Experience
- ⚡ Smooth animations and transitions
- 🎯 Intuitive navigation with React Router
- 🔄 Pagination with "Load More" functionality
- 🎬 Featured hero section with highlighted movie
- 🌟 Interactive hover effects on movie cards
- 📊 Real-time favorite indicators
- 🎪 Helpful tooltips for better guidance

## 🛠️ Technology Stack

### Frontend Framework & Build Tools
- **React.js 18.3.1** - Modern UI library with TypeScript (.tsx extension)
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible UI components
- **Lucide React** - Beautiful icon library

### Routing & State
- **React Router DOM 6.30.1** - Client-side routing and navigation

### API Integration
- **Fetch API** - Native HTTP requests for TMDB API integration

### Data Persistence
- **localStorage** - Client-side favorites storage for persistence across sessions

### Additional Libraries
- **Sonner** - Toast notifications for user feedback
- **date-fns** - Date formatting utilities
- **next-themes** - Theme management for dark/light mode

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd cineverse
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

## 🎬 TMDB API Usage

This project uses **The Movie Database (TMDB) API** to fetch movie data.

### API Endpoints Used
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming releases
- `/discover/movie` - Filtered movie discovery
- `/search/movie` - Search functionality
- `/movie/{id}` - Detailed movie information
- `/movie/{id}/similar` - Similar movie recommendations

### API Features Implemented
- Real-time movie search
- Category-based browsing
- Regional filtering (Hollywood, Bollywood, All)
- Detailed movie information retrieval
- Similar movie recommendations
- Proper error handling and loading states

## 📁 Project Structure

```
cineverse/
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── CategoryTabs.tsx # Movie category selector
│   │   ├── Header.tsx       # Navigation header
│   │   ├── HeroSection.tsx  # Featured movie hero
│   │   ├── MovieCard.tsx    # Movie card component
│   │   ├── MovieGrid.tsx    # Movie grid layout
│   │   ├── RegionSelector.tsx # Region filter
│   │   ├── SearchBar.tsx    # Search input
│   │   └── ThemeToggle.tsx  # Dark/light mode toggle
│   ├── pages/
│   │   ├── Home.tsx         # Main browsing page
│   │   ├── MovieDetails.tsx # Movie detail page
│   │   ├── Favorites.tsx    # Favorites collection
│   │   └── NotFound.tsx     # 404 page
│   ├── lib/
│   │   ├── tmdb.ts          # TMDB API utilities
│   │   ├── favorites.ts     # localStorage favorites management
│   │   └── utils.ts         # Helper functions
│   ├── hooks/
│   │   └── use-toast.ts     # Toast notifications hook
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Configure Build Settings** (Auto-detected)
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `your-project.vercel.app`

### Deploy to Netlify

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**
   - Click "Deploy site"
   - Your app will be live at `your-site.netlify.app`

### Custom Domain (Optional)
Both Vercel and Netlify allow you to add custom domains in their respective dashboards.

## 💾 Favorites Feature Implementation

The favorites feature uses **localStorage** for persistent data storage:

### How It Works
```typescript
// Location: src/lib/favorites.ts

// Add movie to favorites
export const addFavorite = (movie: Movie) => {
  const favorites = getFavorites();
  if (!favorites.find(m => m.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem('movie_favorites', JSON.stringify(favorites));
  }
};

// Remove movie from favorites
export const removeFavorite = (movieId: number) => {
  const favorites = getFavorites();
  const updated = favorites.filter(m => m.id !== movieId);
  localStorage.setItem('movie_favorites', JSON.stringify(updated));
};

// Check if movie is favorited
export const isFavorite = (movieId: number): boolean => {
  return getFavorites().some(m => m.id === movieId);
};
```

### Features
- ✅ Persistent across browser sessions
- ✅ Add/remove with instant visual feedback
- ✅ Heart icon indicators on all movie cards
- ✅ Dedicated favorites collection page
- ✅ Toast notifications for user actions

## 🎨 Design & Accessibility Features

- **Modern UI** with glassmorphism effects and smooth gradients
- **Smooth animations** using Tailwind CSS keyframes
- **Accessible** with proper ARIA labels and semantic HTML
- **Responsive grid** that adapts to all screen sizes
- **Custom color scheme** with CSS variables for theming
- **Interactive hover effects** for enhanced user experience
- **Helpful tooltips** for better user guidance
- **Loading states** with skeleton screens and spinners

## 🧪 Browser Compatibility

The app has been tested and works on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📱 Responsive Breakpoints

- **Mobile**: 375px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px and above

## 📝 Assignment Requirements Checklist

### Technology Requirements
- ✅ **React.js with Vite** - Modern React setup
- ✅ **TypeScript (.tsx extension)** - All components use TypeScript
- ✅ **Fetch API** - For TMDB API integration
- ✅ **Tailwind CSS** - For styling
- ✅ **shadcn/ui** - UI component library
- ✅ **React Router** - For navigation between pages
- ✅ **localStorage** - For favorites persistence

### Feature Requirements
- ✅ **Search functionality** - Search movies by title
- ✅ **Browse movies** - Popular, Top Rated, Upcoming categories
- ✅ **Detailed movie page** - Shows all required information:
  - Poster image
  - Title
  - Release date
  - Genres
  - Overview/Description
  - Rating
  - Runtime
- ✅ **Add to Favorites / Remove from Favorites** - Full implementation
- ✅ **React Router navigation** - Multiple pages with routing

### Deployment Requirements
- ✅ GitHub repository with clean code
- ✅ Deployment instructions for Vercel/Netlify
- ✅ Comprehensive README.md
- ✅ Setup instructions
- ✅ API usage documentation
- ✅ Feature list

## 🐛 Known Issues & Limitations

- TMDB API has rate limits (40 requests per 10 seconds)
- Favorites are stored locally (not synced across devices/browsers)
- Some movies may have incomplete data from TMDB

## 🔮 Future Enhancements

- [ ] User authentication for cloud-synced favorites
- [ ] Movie trailers and video playback
- [ ] Advanced filtering (by year, rating, genre)
- [ ] User reviews and ratings
- [ ] Social sharing features
- [ ] Watchlist separate from favorites
- [ ] Movie comparison feature

## 📸 Screenshots

Add screenshots here after deployment:
- Home page with featured movie
- Search results
- Movie details page
- Favorites collection
- Mobile responsive view
- Dark mode theme

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

---

**Note**: This project was created as part of an academic assignment to demonstrate React.js development, API integration, localStorage usage, and modern web developme
