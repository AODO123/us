/**
 * =========================================================================
 * 💌 COSTA & DARIA • FOREVER MODE CONTENT CONFIG
 * =========================================================================
 *
 * BRO! This is your central content control room.
 * All your custom copy, dates, locations, and future sections are cleanly
 * isolated here with clear [TAGS] so you can edit text anytime without
 * touching any JSX/component structure.
 *
 * Format:
 * [TAG_NAME] -> Replace the string value inside the quotes.
 * =========================================================================
 */

export interface ContentConfig {
  couple: {
    partnerName: string; // [PARTNER_NAME]
    partnerNickname: string; // [PARTNER_NICKNAME]
    yourName: string; // [YOUR_NAME]
    yourNickname: string; // [YOUR_NICKNAME]
    relationshipStartDate: string; // [MEET_DATE] (YYYY-MM-DD or readable)
    firstMeetingStorySnippet: string; // [FIRST_MEET_SNIPPET]
  };
  locations: {
    me: {
      city: string; // [LOCATION_ME_CITY]
      country: string; // [LOCATION_ME_COUNTRY]
      timezone: string; // [TIMEZONE_ME] e.g. "Africa/Cairo (GMT+2)"
      coordinates: [number, number]; // [LAT, LNG]
    };
    her: {
      city: string; // [LOCATION_HER_CITY]
      country: string; // [LOCATION_HER_COUNTRY]
      timezone: string; // [TIMEZONE_HER] e.g. "Asia/Jakarta (GMT+7)"
      coordinates: [number, number]; // [LAT, LNG]
    };
    approxDistanceKm: number; // [DISTANCE_KM]
    timeDifferenceHours: number; // [TIME_DIFF_HOURS]
  };
  gate: {
    badgeText: string; // [GATE_BADGE]
    headline: string; // [GATE_HEADLINE]
    subhead: string; // [GATE_SUBHEAD]
    yesButtonText: string; // [GATE_YES_BUTTON]
    noButtonText: string; // [GATE_NO_BUTTON]
    guiltTrips: string[]; // [GATE_GUILT_TRIPS]
  };
  assets: {
    us: string; // [ASSET_US]
    me: string; // [ASSET_ME]
    me2: string; // [ASSET_ME2]
    her: string; // [ASSET_HER]
    her2: string; // [ASSET_HER2]
    heartMe: string; // [ASSET_HEART_ME]
    heartHer: string; // [ASSET_HEART_HER]
  };
  songs: {
    sectionBadge: string; // [SONGS_BADGE]
    title: string; // [PLAYLIST_TITLE]
    subtitle: string; // [PLAYLIST_SUBTITLE]
    track1: {
      title: string; // [SONG_1_TITLE]
      artist: string; // [SONG_1_ARTIST]
      tag: string; // [SONG_1_TAG]
      caption: string; // [SONG_1_CAPTION]
      spotifyUrl: string; // [SPOTIFY_URL_1]
      audioSrc: string; // [AUDIO_CLIP_1]
    };
    track2: {
      title: string; // [SONG_2_TITLE]
      artist: string; // [SONG_2_ARTIST]
      tag: string; // [SONG_2_TAG]
      caption: string; // [SONG_2_CAPTION]
      spotifyUrl: string; // [SPOTIFY_URL_2]
      audioSrc: string; // [AUDIO_CLIP_2]
    };
  };
  reasons: {
    sectionBadge: string; // [REASONS_BADGE]
    title: string; // [REASONS_TITLE]
    subtitle: string; // [REASONS_SUBTITLE]
  };
  common: {
    sectionBadge: string; // [COMMON_BADGE]
    title: string; // [COMMON_TITLE]
    subtitle: string; // [COMMON_SUBTITLE]
  };
  dreams: {
    sectionBadge: string; // [DREAMS_BADGE]
    title: string; // [FUTURE_DREAMS_TITLE]
    subtitle: string; // [FUTURE_DREAMS_SUBTITLE]
  };

  /* =========================================================================
   * PLACEHOLDERS FOR UPCOMING SECTIONS (PROMPTS 2, 3, 4, 5, 6)
   * These will be filled in during the respective section builds.
   * ========================================================================= */
  placeholders: {
    mapTitle: string; // [MAP_TITLE]
    mapSubtitle: string; // [MAP_SUBTITLE]
    playlistTitle: string; // [PLAYLIST_TITLE]
    fiftyReasonsTitle: string; // [FIFTY_REASONS_TITLE]
    futureDreamsTitle: string; // [FUTURE_DREAMS_TITLE]
    finalLetterTitle: string; // [FINAL_LETTER_TITLE]
    secretCodeOrNote: string; // [SECRET_NOTE]
  };
}

export const SITE_CONTENT: ContentConfig = {
  // ── 1. Couple Info ────────────────────────────────────────────────────────
  couple: {
    partnerName: 'Daria', // [PARTNER_NAME]
    partnerNickname: 'Wifey', // [PARTNER_NICKNAME]
    yourName: 'Costa', // [YOUR_NAME]
    yourNickname: 'Husby', // [YOUR_NICKNAME]
    relationshipStartDate: '2026-7-4', // [MEET_DATE]
    firstMeetingStorySnippet:
      'We met in the most unexpected messy way, and now we mean everything to each other.', // [FIRST_MEET_SNIPPET]
  },

  // ── 2. Geography & Distance (Dedicated section only) ───────────────────────
  locations: {
    me: {
      city: 'Cairo', // [LOCATION_ME_CITY]
      country: 'Egypt', // [LOCATION_ME_COUNTRY]
      timezone: 'Africa/Cairo', // [TIMEZONE_ME] (GMT+3)
      coordinates: [30.0444, 31.2357],
    },
    her: {
      city: 'Bukittinggi', // [LOCATION_HER_CITY]
      country: 'Indonesia', // [LOCATION_HER_COUNTRY]
      timezone: 'Asia/Jakarta', // [TIMEZONE_HER] (GMT+7)
      coordinates: [-0.3055, 100.3692],
    },
    approxDistanceKm: 8740, // [DISTANCE_KM]
    timeDifferenceHours: 4, // [TIME_DIFF_HOURS] (Cairo GMT+3 -> Bukittinggi GMT+7)
  },

  // ── 3. Gate Screen Interactive Text ───────────────────────────────────────
  gate: {
    badgeText: 'A special gift for you', // [GATE_BADGE] (Clean, no star emoji)
    headline: 'HEY BABY! Wanna see your gift?', // [GATE_HEADLINE]
    subhead: 'Handcrafted with all my love, just for you 💌', // [GATE_SUBHEAD]
    yesButtonText: 'YES OF COURSE!', // [GATE_YES_BUTTON]
    noButtonText: 'No thanks', // [GATE_NO_BUTTON]

    // Escalating playful guilt-trips when she taps/hovers the 'X' / 'No' button
    guiltTrips: [
      'Wait what?! 🥺 Did you misclick, wifey?',
      'Are you really saying no to your husby? 💔',
      'Look at this little face -> (｡•́︿•̀｡) you are breaking my heart!',
      'Okay now you are just teasing me 😤',
      'The button is literally running away from you rn 🏃‍♂️💨',
      'Please Please Please Babuu? 🥺',
      'FINE... but the YES button comes with unlimited kisses forever 👉👈',
    ],
  },

  // ── 4. Assets Reference ───────────────────────────────────────────────────
  assets: {
    us: '/assets/us.png', // [ASSET_US]
    me: '/assets/me.jpeg', // [ASSET_ME]
    me2: '/assets/me2.jpeg', // [ASSET_ME2]
    her: '/assets/her.jpeg', // [ASSET_HER]
    her2: '/assets/her2.jpeg', // [ASSET_HER2]
    heartMe: '/assets/heartme.jpeg', // [ASSET_HEART_ME] - Left half of hand-heart
    heartHer: '/assets/hearther.jpeg', // [ASSET_HEART_HER] - Right half of hand-heart
  },

  // ── 5. Songs & Soundtrack ─────────────────────────────────────────────────
  songs: {
    sectionBadge: 'Our Soundtrack • In Forever Mode', // [SONGS_BADGE]
    title: 'Songs That Feel Like Us', // [PLAYLIST_TITLE]
    subtitle: 'Two special tracks that hold our memories, our late-night calls, and every sweet word.', // [PLAYLIST_SUBTITLE]
    track1: {
      title: 'An Art Gallery Could Never Be As Unique As You', // [SONG_1_TITLE]
      artist: 'mrld', // [SONG_1_ARTIST]
      tag: 'Sent by Daria • My Favorite Ever 💌', // [SONG_1_TAG]
      caption: 'The very first song you ever sent me... and still the most beautiful melody in my entire world.', // [SONG_1_CAPTION]
      spotifyUrl: 'https://open.spotify.com/album/0FRaoawfqep3bJcCqcQZpD?si=U_mnmqt-Tm6qE76qwKIU9A', // [SPOTIFY_URL_1]
      audioSrc: '/assets/audio/art.mp3', // [AUDIO_CLIP_1]
    },
    track2: {
      title: 'My Name', // [SONG_2_TITLE]
      artist: 'Reed Wonder, Aurora Olivas', // [SONG_2_ARTIST]
      tag: "Costa's Pick • Our Signature Song 🥺", // [SONG_2_TAG]
      caption: 'Our signature song. Every time it plays, it feels like the universe made this just for us two.', // [SONG_2_CAPTION]
      spotifyUrl: 'https://open.spotify.com/album/77ykc4hJTGuICmMOjovmXt?si=aVxCo5GJQe-4Y6LrocQAaA', // [SPOTIFY_URL_2]
      audioSrc: '/assets/audio/my-name.mp3', // [AUDIO_CLIP_2]
    },
  },

  // ── 6. Reasons I Love You ─────────────────────────────────────────────────
  reasons: {
    sectionBadge: 'Reasons Why • In Forever Mode', // [REASONS_BADGE]
    title: 'Reasons I Love You', // [REASONS_TITLE]
    subtitle: 'Every single thing that made my heart yours forever.', // [REASONS_SUBTITLE]
  },

  // ── 7. Things Common in Us ────────────────────────────────────────────────
  common: {
    sectionBadge: 'Our Shared Constellation • Forever Us', // [COMMON_BADGE]
    title: 'common things between us', // [COMMON_TITLE]
    subtitle: 'The little threads and shared obsessions that weave our souls together.', // [COMMON_SUBTITLE]
  },

  // ── 8. Future & Dreams ────────────────────────────────────────────────────
  dreams: {
    sectionBadge: 'Our Next Chapter • Future & Dreams', // [DREAMS_BADGE]
    title: 'Where We Go From Here', // [FUTURE_DREAMS_TITLE]
    subtitle: 'From closing 8,740 km to building our cozy forever home, hand in hand.', // [FUTURE_DREAMS_SUBTITLE]
  },

  // ── 9. Future Sections Placeholders ───────────────────────────────────────
  placeholders: {
    mapTitle: 'Cairo ✈️ Bukittinggi', // [MAP_TITLE]
    mapSubtitle: '8,740 km apart, but sharing the exact same heartbeat.', // [MAP_SUBTITLE]
    playlistTitle: 'Songs that feel like us', // [PLAYLIST_TITLE]
    fiftyReasonsTitle: '50 Reasons why you are my whole world', // [FIFTY_REASONS_TITLE]
    futureDreamsTitle: 'Where we go from here', // [FUTURE_DREAMS_TITLE]
    finalLetterTitle: 'To my favorite person across the sea', // [FINAL_LETTER_TITLE]
    secretCodeOrNote: 'P.S. I love you more than words could ever fit on a screen.', // [SECRET_NOTE]
  },
};
