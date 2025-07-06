import * as React from "react";
import { createRoot } from "react-dom/client";
import { MagnifyingGlass, User, EyeSlash, Eye, MapPin, Moon, Sun } from "@phosphor-icons/react";
import OctoMaskLogo from "./OctoMaskLogo.jsx";
import "./styles.css";

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

function GitHubUserLookup() {
  const [username, setUsername] = React.useState("");
  const [userData, setUserData] = React.useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [avatarDescription, setAvatarDescription] = React.useState("");
  const [locationInsights, setLocationInsights] = React.useState("");
  const [isAvatarGenerating, setIsAvatarGenerating] = React.useState(false);
  const [isLocationGenerating, setIsLocationGenerating] = React.useState(false);
  const [showRedacted, setShowRedacted] = React.useState(true);
  const [autoAnalyze, setAutoAnalyze] = React.useState(false);

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Helper function to create redacted text
  const getRedactedText = (text: string) => {
    return '*'.repeat(Math.max(10, text.length));
  };

  const fetchUserData = async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);
    setAvatarDescription("");
    setLocationInsights("");
    try {
      // Using fetch API since we don't have spark.octokit available
      const response = await fetch(`https://api.github.com/users/${username.trim()}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data: GitHubUser = await response.json();
      setUserData(data);
      setShowRedacted(true); // Reset to redacted view on new search
      
      // Auto-analyze if enabled
      if (autoAnalyze) {
        setTimeout(() => {
          generateAvatarDescription();
          if (data.location) {
            generateLocationInsights();
          }
        }, 500); // Small delay to let the UI update first
      }
    } catch (err) {
      setError('User not found');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAvatarDescription = async () => {
    if (!userData?.avatar_url) return;
    setIsAvatarGenerating(true);
    setAvatarDescription("");
    
    // Simulate AI generation with placeholder text
    // In a real app, this would use spark.llmStreaming
    try {
      const descriptions = [
        "This avatar shows a creative and professional GitHub user with a clean, modern aesthetic that suggests attention to detail.",
        "The profile picture has a friendly and approachable vibe, perfect for open-source collaboration and community engagement.",
        "This avatar displays a tech-savvy individual with a unique style that stands out in the developer community.",
        "The image conveys professionalism mixed with personality, indicating someone who takes their craft seriously but remains approachable."
      ];
      
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      // Simulate streaming effect
      for (let i = 0; i <= randomDescription.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setAvatarDescription(randomDescription.slice(0, i));
      }
    } finally {
      setIsAvatarGenerating(false);
    }
  };

  const generateLocationInsights = async () => {
    if (!userData?.location) return;
    setIsLocationGenerating(true);
    setLocationInsights("");
    
    try {
      const insights = [
        `${userData.location} is known for its vibrant tech community and innovative spirit!`,
        `Fun fact: ${userData.location} has produced many influential developers and tech companies.`,
        `${userData.location} is a great place for networking with fellow developers and tech enthusiasts.`,
        `The tech scene in ${userData.location} is thriving with lots of opportunities for growth.`
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      
      // Simulate streaming effect
      for (let i = 0; i <= randomInsight.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setLocationInsights(randomInsight.slice(0, i));
      }
    } finally {
      setIsLocationGenerating(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header with logo and dark mode toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <OctoMaskLogo size={48} color="#38bdf8" textColor="transparent" />
            <div>
              <h1 className="text-2xl font-bold">OctoMask</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Privacy-first GitHub profile viewer</p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="btn btn-secondary p-2"
            title="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                onKeyUp={(e) => e.key === 'Enter' && fetchUserData()}
                className="input pl-10"
              />
            </div>
            <button 
              onClick={fetchUserData}
              disabled={isLoading}
              className="btn btn-primary flex items-center gap-2 px-6"
            >
              <MagnifyingGlass size={16} />
              Search
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center text-fg-secondary">Loading...</div>
        )}

        {error && (
          <div className="text-accent-9 text-center p-4">{error}</div>
        )}

        {userData && (
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className={`relative ${isAvatarGenerating ? 'animate-pulse bg-gray-200 dark:bg-gray-700' : ''}`}>
                  {showRedacted ? (
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  ) : (
                    <img 
                      src={userData.avatar_url} 
                      alt={`${userData.login}'s avatar`}
                      className={`w-16 h-16 rounded-full ${isAvatarGenerating ? 'opacity-50' : ''}`}
                    />
                  )}
                </div>
                <button 
                  className="btn btn-secondary mt-2 flex items-center gap-1 text-xs px-2 py-1"
                  onClick={() => setShowRedacted(!showRedacted)}
                  aria-label={showRedacted ? "Show profile info" : "Hide profile info"}
                >
                  {showRedacted ? <Eye size={12} /> : <EyeSlash size={12} />}
                </button>
                <button 
                  className="btn btn-secondary mt-2 text-xs px-2 py-1"
                  onClick={generateAvatarDescription}
                  disabled={isAvatarGenerating}
                >
                  {isAvatarGenerating ? 'Analyzing...' : avatarDescription ? 'Regenerate analysis' : 'Analyze avatar'}
                </button>
                {avatarDescription && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{avatarDescription}</div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{userData.name || userData.login}</h2>
                <p className="text-fg-secondary">@{userData.login}</p>
                {userData.bio && (
                  <div className="mt-2">
                    {showRedacted ? (
                      <p className="font-mono">{getRedactedText(userData.bio)}</p>
                    ) : (
                      <p>{userData.bio}</p>
                    )}
                  </div>
                )}
                {userData.location && (
                  <div className={`mt-2 flex items-start gap-2 ${isLocationGenerating ? 'animate-pulse bg-gray-200 dark:bg-gray-700' : ''}`}>
                    <MapPin className="mt-1 text-blue-500" />
                    {showRedacted ? (
                      <p className="font-mono">{getRedactedText(userData.location)}</p>
                    ) : (
                      <div className="flex-1">
                        <p className={isLocationGenerating ? 'opacity-50' : ''}>{userData.location}</p>
                        <button 
                          className="btn btn-secondary mt-1 text-xs px-2 py-1"
                          onClick={generateLocationInsights}
                          disabled={isLocationGenerating}
                        >
                          {isLocationGenerating ? 'Analyzing...' : locationInsights ? 'Regenerate insights' : 'Get location insights'}
                        </button>
                        {locationInsights && (
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{locationInsights}</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-4 flex gap-4">
                  <div>
                    <span className="font-semibold">{userData.followers}</span>
                    <span className="text-fg-secondary ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-semibold">{userData.following}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">following</span>
                  </div>
                  <div>
                    <span className="font-semibold">{userData.public_repos}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">repos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Built with privacy in mind • Powered by GitHub API</p>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<GitHubUserLookup />);
