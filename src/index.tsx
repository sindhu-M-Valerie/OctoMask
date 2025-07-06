import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MagnifyingGlass, User, EyeSlash, Eye, MapPin } from '@phosphor-icons/react';
import OctoMaskLogo from './OctoMaskLogo.jsx';
import './styles.css';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

function OctoMaskApp() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRedacted, setShowRedacted] = useState(true);

  useEffect(() => {
    document.body.className = 'dark';
    document.body.style.background = '#0d1117';
    document.body.style.color = '#f0f6fc';
  }, []);

  const fetchUserData = async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        } else if (response.status === 403) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchUserData();
    }
  };

  const getRedactedText = (text: string) => {
    return '*****';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
      background: '#0d1117',
      color: '#f0f6fc'
    }}>
      {/* Sparkling Background */}
      <div className="sparkles-container">
        <div className="sparkle sparkle-1">🎭</div>
        <div className="sparkle sparkle-2">🎭</div>
        <div className="sparkle sparkle-3">🎭</div>
        <div className="sparkle sparkle-4">🎭</div>
        <div className="sparkle sparkle-5">🎭</div>
        <div className="sparkle sparkle-6">🎭</div>
        <div className="sparkle sparkle-7">🎭</div>
        <div className="sparkle sparkle-8">🎭</div>
      </div>
      
      <div className="max-w-5xl mx-auto p-6 relative z-10">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <OctoMaskLogo size={64} color="#58a6ff" textColor="transparent" />
            <div>
              <h1 className="text-6xl font-black gradient-text">
                OctoMask
              </h1>
            </div>
          </div>
          <p className="text-lg mb-4" style={{ 
            color: '#7d8590' 
          }}>
            🎭 Reveal. Conceal. Commit. 🎭
          </p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#7d8590' }} size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter GitHub username"
                  className="input pl-10"
                  disabled={isLoading}
                />
              </div>
              <button 
                onClick={fetchUserData}
                disabled={isLoading || !username.trim()}
                className="btn btn-primary flex items-center gap-2 px-4"
              >
                <MagnifyingGlass size={16} />
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-md border" style={{ 
            backgroundColor: '#f85149', 
            borderColor: '#f85149', 
            color: '#ffffff' 
          }}>
            {error}
          </div>
        )}

        {/* User Profile */}
        {userData && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Avatar and basic info */}
              <div className="md:col-span-1">
                <div className="text-center md:text-left">
                  <div className="relative inline-block mb-4">
                    {showRedacted ? (
                      <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ 
                        backgroundColor: '#21262d', 
                        border: '1px solid #30363d' 
                      }}>
                        <User className="w-16 h-16" style={{ 
                          color: '#7d8590' 
                        }} />
                      </div>
                    ) : (
                      <img 
                        src={userData.avatar_url} 
                        alt={`${userData.login}'s avatar`}
                        className="w-32 h-32 rounded-full"
                        style={{ 
                          border: '1px solid #30363d' 
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-1" style={{ 
                      color: '#f0f6fc' 
                    }}>
                      {showRedacted ? getRedactedText(userData.name || userData.login) : (userData.name || userData.login)}
                    </h2>
                    <p className="text-xl font-light" style={{ 
                      color: '#7d8590' 
                    }}>
                      {showRedacted ? getRedactedText(userData.login) : userData.login}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowRedacted(!showRedacted)}
                    className="btn btn-secondary flex items-center gap-2 mb-4"
                  >
                    {showRedacted ? <Eye size={16} /> : <EyeSlash size={16} />}
                    {showRedacted ? 'Reveal' : 'Conceal'}
                  </button>

                  {userData.bio && (
                    <p className="mb-4" style={{ 
                      color: '#f0f6fc' 
                    }}>
                      {showRedacted ? getRedactedText(userData.bio) : userData.bio}
                    </p>
                  )}

                  {userData.location && (
                    <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                      <MapPin style={{ 
                        color: '#7d8590' 
                      }} size={16} />
                      <span style={{ 
                        color: '#f0f6fc' 
                      }}>
                        {showRedacted ? getRedactedText(userData.location) : userData.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="md:col-span-2">
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4" style={{ 
                    color: '#f0f6fc' 
                  }}>Profile Statistics</h3>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold profile-stat-number">
                        {showRedacted ? '*****' : userData.followers.toLocaleString()}
                      </div>
                      <div className="profile-stat">followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold profile-stat-number">
                        {showRedacted ? '*****' : userData.following.toLocaleString()}
                      </div>
                      <div className="profile-stat">following</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold profile-stat-number">
                        {showRedacted ? '*****' : userData.public_repos.toLocaleString()}
                      </div>
                      <div className="profile-stat">repositories</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-sm" style={{ color: '#7d8590' }}>
            🎭 Where your code wears its boldest face. 🎭
          </p>
        </footer>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<OctoMaskApp />);
