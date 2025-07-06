# OctoMask

This app, allows users to search for any GitHub username and view summary information about their public profile in a privacy-conscious way. Here’s what it does:

**Username Search:**
Users enter a GitHub username and click “Search” to fetch public profile data using the GitHub API.

**Redacted Profile Info:**
By default, sensitive info (avatar, bio, location) is redacted (obscured with asterisks or placeholder icons). Users can toggle a “Show/Hide” switch to reveal or redact this info.

**Avatar Analysis:**
Users can click “Analyze avatar” to generate a fun, LLM-powered description of the user’s avatar image. This uses a streaming AI prompt for engaging summaries, with a button to regenerate if desired.

**Location Insights:**
If the profile has a location, users can click “Get location insights” to receive a fun AI-generated fact or observation about that place.

**Auto-Analyze Option:**
There’s a switch to “Auto-analyze profile on search,” which will automatically run the avatar and location AI analyses after every search.

**Profile Stats:**
Shows GitHub stats like followers, following, and public repo count.

**Loading/Error States:**
The UI displays loading indicators and handles user-not-found errors gracefully.

**In summary:**
This app is a privacy-friendly GitHub profile search tool with fun AI-powered extras for avatar and location, giving users control over what profile info is revealed.

<img width="388" alt="Screenshot 2025-07-04 at 11 18 55 PM" src="https://github.com/user-attachments/assets/2fe5edad-fc12-46dd-bada-f09166cc0ddc" />
