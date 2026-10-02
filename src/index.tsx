import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MagnifyingGlass, User, EyeSlash, Eye, MapPin, X } from '@phosphor-icons/react';
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
  }, []);

  const fetchUserData = async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);
    setUserData(null);
    setShowRedacted(true);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void fetchUserData();
  };

  const clearSearch = () => {
    setUsername('');
    setUserData(null);
    setError(null);
    setShowRedacted(true);
  };

  const getRedactedText = (text: string) => {
    return '*****';
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <OctoMaskLogo size={140} />
          <p className="brand-caption">See the profile. Reveal only what you choose.</p>
        </div>
        <div className="privacy-indicator">
          <span className="privacy-dot" />
          Private by default
        </div>
      </header>

      <main className="workspace">
        <section className="lookup-section" aria-labelledby="lookup-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Profile lookup</p>
              <h1 id="lookup-title">Find a GitHub profile</h1>
            </div>
            <p className="privacy-note">Public data only <span aria-hidden="true">·</span> Nothing saved</p>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-field">
              <User size={18} aria-hidden="true" />
              <input
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError(null);
                }}
                placeholder="GitHub username"
                aria-label="GitHub username"
                autoComplete="off"
                disabled={isLoading}
              />
              {username && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={clearSearch}
                  disabled={isLoading}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="search-button"
              disabled={isLoading || !username.trim()}
            >
              <MagnifyingGlass size={18} aria-hidden="true" />
              {isLoading ? 'Searching' : 'Search profiles'}
            </button>
          </form>

          {error && <p className="error-message" role="alert">{error}</p>}
        </section>

        {isLoading && (
          <div className="status-panel" role="status">
            <span className="loading-indicator" />
            Fetching public profile
          </div>
        )}

        {userData && (
          <section className="profile-result" aria-label="GitHub profile result">
            <div className="profile-toolbar">
              <div>
                <p className="eyebrow">Profile result</p>
                <p className="profile-source">Public GitHub data</p>
              </div>
              <div className="profile-actions">
                <a
                  className="profile-link"
                  href={`https://github.com/${userData.login}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open on GitHub
                </a>
                <button
                  type="button"
                  className="reveal-button"
                  onClick={() => setShowRedacted(!showRedacted)}
                  aria-pressed={!showRedacted}
                >
                  {showRedacted ? <Eye size={18} /> : <EyeSlash size={18} />}
                  {showRedacted ? 'Reveal profile' : 'Hide profile'}
                </button>
              </div>
            </div>

            <div className="identity-row">
              <div className="profile-avatar">
                {showRedacted ? (
                  <User size={38} aria-label="Avatar hidden" />
                ) : (
                  <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
                )}
              </div>
              <div className="identity-copy">
                <p className="eyebrow">GitHub account</p>
                <h2>{showRedacted ? getRedactedText(userData.name || userData.login) : (userData.name || userData.login)}</h2>
                <p className="profile-login">
                  {showRedacted ? getRedactedText(userData.login) : `@${userData.login}`}
                </p>
                {userData.bio && (
                  <p className="profile-bio">
                    {showRedacted ? getRedactedText(userData.bio) : userData.bio}
                  </p>
                )}
                {userData.location && (
                  <p className="profile-location">
                    <MapPin size={16} aria-hidden="true" />
                    {showRedacted ? getRedactedText(userData.location) : userData.location}
                  </p>
                )}
              </div>
            </div>

            <div className="stats-heading">
              <h3>Public activity</h3>
              <span>Profile counts</span>
            </div>
            <dl className="stats-grid">
              <div className="stat-item">
                <dt>Followers</dt>
                <dd>{showRedacted ? '*****' : userData.followers.toLocaleString()}</dd>
              </div>
              <div className="stat-item">
                <dt>Following</dt>
                <dd>{showRedacted ? '*****' : userData.following.toLocaleString()}</dd>
              </div>
              <div className="stat-item">
                <dt>Repositories</dt>
                <dd>{showRedacted ? '*****' : userData.public_repos.toLocaleString()}</dd>
              </div>
            </dl>
          </section>
        )}

        {!userData && !isLoading && !error && (
          <section className="empty-state" aria-live="polite">
            <div className="empty-mark"><EyeSlash size={22} aria-hidden="true" /></div>
            <h2>No profile selected</h2>
            <p>Search a username to view a redacted profile.</p>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <span>OctoMask</span>
        <span>Your search stays in this session.</span>
      </footer>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<OctoMaskApp />);
