# 🎭 OctoMask

A privacy-first GitHub profile viewer with AI-powered insights. OctoMask allows you to explore GitHub profiles while maintaining privacy by redacting sensitive information and providing optional AI-generated insights about avatars and locations.

![OctoMask Logo](./public/logo.svg)

## Features

- **🔐 Privacy-First**: All personal information is redacted by default
- **👁️ Toggle Visibility**: Click to reveal or hide profile information
- **🤖 AI Insights**: Get AI-generated descriptions of avatars and location insights
- **⚡ Auto-Analysis**: Optional automatic analysis when searching for profiles
- **🎨 Beautiful UI**: Clean, modern interface built with Tailwind CSS
- **📱 Responsive**: Works great on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/octomask.git
cd octomask
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a GitHub username in the search field
2. Click "Search" or press Enter
3. Profile information will be displayed in redacted form by default
4. Click the "Reveal/Hide" button to toggle visibility of personal information
5. Use the "Analyze avatar" and "Get location insights" buttons for AI-generated content
6. Toggle "Auto-analyze profile on search" to automatically run AI analysis

## Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server (alias)
- `npm run build` - Build for production
- `npm run serve` - Serve production build

## Privacy Features

- **Avatar Masking**: Avatars are hidden behind a generic user icon until revealed
- **Text Redaction**: All personal information (bio, location) is replaced with asterisks
- **Selective Disclosure**: Users can choose what information to reveal
- **No Data Storage**: No personal information is stored or transmitted to external services

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Webpack 5** - Module bundler
- **Phosphor Icons** - Icon library
- **GitHub API** - Profile data source

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- GitHub API for profile data
- Phosphor Icons for the beautiful icon set
- Tailwind CSS for the styling framework
