import React, { createContext, useContext, useEffect, useState, type ReactNode, useRef } from 'react';
import NDK, { NDKEvent, NDKNip07Signer, NDKUser } from '@nostr-dev-kit/ndk';
// All other NDK sub-imports like NDKFilter, NDKRelay etc. are removed as they are not directly used in this simplified context.

// Re-define UserProfile interface if it was in the old NostrContext, or ensure it's imported if it's in src/types
export interface UserProfile {
  name?: string;
  displayName?: string;
  website?: string;
  about?: string;
  picture?: string;
  banner?: string;
  nip05?: string;
  lud16?: string;
  lud06?: string;
}

// Simplified shortenNpub function (can be moved to a utils file later if preferred)
const shortenNpub = (npub: string, startChars = 8, endChars = 8): string => {
  if (!npub || typeof npub !== 'string' || !npub.startsWith('npub1')) return npub;
  const prefix = 'npub1';
  const key = npub.substring(prefix.length);
  if (key.length <= startChars + endChars) return npub;
  return `${prefix}${key.substring(0, startChars)}...${key.substring(key.length - endChars)}`;
};

export interface NostrContextType {
  ndk: NDK | null;
  user: NDKUser | null;
  isLoggedIn: boolean;
  loginWithNip07: () => Promise<boolean>;
  logout: () => void;
  shortenNpub: (npub: string) => string; // For display convenience
  npub: string | null; // Convenience access to logged-in user's npub
  userName: string | null; // Convenience access to user's name for display
  userProfilePicture: string | null; // Convenience access to user's picture for display
  ndkReady: boolean; // Flag to check if NDK is connected and ready
  publishEvent: (kind: number, content: string, tags?: string[][]) => Promise<NDKEvent | null>; // Basic publish functionality
}

const defaultContextValue: NostrContextType = {
  ndk: null,
  user: null,
  isLoggedIn: false,
  loginWithNip07: async () => false,
  logout: () => {},
  shortenNpub: shortenNpub,
  npub: null,
  userName: null,
  userProfilePicture: null,
  ndkReady: false,
  publishEvent: async () => null,
};

const NostrContext = createContext<NostrContextType>(defaultContextValue);

// Custom hook for using the Nostr context easily
export const useNostr = () => useContext(NostrContext);

export const NostrProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ndk, setNdk] = useState<NDK | null>(null);
  const [user, setUser] = useState<NDKUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // Store basic profile info for context consumers
  const [ndkReady, setNdkReady] = useState<boolean>(false);
  const ndkInitialized = useRef(false); // Prevent multiple initializations

  const loginWithNip07 = async (): Promise<boolean> => {
    if (!ndk) {
      console.error('[NostrContext] NDK not initialized. Cannot login.');
      return false;
    }
    if (!window.nostr) {
      console.error('[NostrContext] NIP-07 extension (window.nostr) not found.');
      // Here you could trigger a modal or message suggesting users to install a NIP-07 extension like Alby, Nos2x, etc.
      return false;
    }
    try {
      const nip07Signer = new NDKNip07Signer();
      ndk.signer = nip07Signer; // Set the signer on the NDK instance
      const userFromSigner = await nip07Signer.user();
      await userFromSigner.fetchProfile(); // NDK will cache this profile information
      
      setUser(userFromSigner);
      setIsLoggedIn(true);
      // Store fetched profile in local state for easy access by context consumers
      setUserProfile(userFromSigner.profile as UserProfile || null); 
      console.log('[NostrContext] User logged in via NIP-07:', userFromSigner.npub, userFromSigner.profile);
      return true;
    } catch (error) {
      console.error('[NostrContext] NIP-07 Login failed:', error);
      if (ndk) ndk.signer = undefined; // Clear signer on failure
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserProfile(null);
    if (ndk) ndk.signer = undefined; // Clear the signer on logout
    console.log('[NostrContext] User logged out');
  };

  const publishEvent = async (kind: number, content: string, tags: string[][] = []): Promise<NDKEvent | null> => {
    if (!ndk || !isLoggedIn || !user) {
      console.error('[NostrContext] Cannot publish event: NDK not ready or user not logged in.');
      return null;
    }
    try {
      const event = new NDKEvent(ndk);
      event.kind = kind;
      event.content = content;
      event.created_at = Math.floor(Date.now() / 1000);
      // event.pubkey is automatically set by NDK when a signer is present
      event.tags = tags;
      await event.publish(); // This will also sign the event if a signer is present
      console.log(`[NostrContext] Event ${event.id} published successfully.`);
      return event;
    } catch (error) {
      console.error('[NostrContext] Error publishing event:', error);
      return null;
    }
  };

  useEffect(() => {
    if (ndkInitialized.current) return; // Ensure NDK is initialized only once
    ndkInitialized.current = true;

    console.log('[NostrContext] Initializing NDK for MadTrips...');
    const relays = [
      'wss://relay.damus.io',
      'wss://relay.nostr.band',
      'wss://nostr.wine',
      // Add more default relays as needed, or load from constants/relays.ts if that file is simplified
    ];
    const ndkInstance = new NDK({ explicitRelayUrls: relays });
    setNdk(ndkInstance);

    ndkInstance.connect()
      .then(() => {
        console.log('[NostrContext] NDK connected to relays:', relays);
        setNdkReady(true);
      })
      .catch((error) => {
        console.error('[NostrContext] NDK connection failed:', error);
        setNdkReady(false);
      });

    // NDK handles its own cleanup. Explicit disconnect on unmount can be added if issues arise.
    // return () => { ndkInstance.explicitRelayUrls?.forEach(url => ndkInstance.removeRelay(url)); };
  }, []);

  const contextValue: NostrContextType = {
    ndk,
    user,
    isLoggedIn,
    loginWithNip07,
    logout,
    shortenNpub,
    npub: user ? user.npub : null,
    userName: userProfile?.displayName || userProfile?.name || (user ? shortenNpub(user.npub, 10) : null),
    userProfilePicture: userProfile?.picture || null,
    ndkReady,
    publishEvent,
  };

  return <NostrContext.Provider value={contextValue}>{children}</NostrContext.Provider>;
}; 