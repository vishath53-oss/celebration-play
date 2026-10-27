/**
 * Birthday Website Configuration — Section 1: Secret Password Entrance
 * 
 * Customize Savitha's birthday details, secret passwords, and screen copy here.
 * 
 * IMPORTANT SECURITY NOTE:
 * Passwords checked on the frontend are meant for playful surprises and friendly
 * "secret gates", NOT high-security authentication. Anyone inspecting the client-side
 * code could find this value. For a truly private or restricted access system,
 * replace `validatePassword` with an API call to a secure server-side endpoint.
 */

export interface BirthdayConfig {
  recipient: {
    name: string;
    nickname: string;
    birthdayDate: string;
    year: number;
  };
  auth: {
    // Primary placeholder password for local testing
    defaultPassword: string;
    // Alternative friendly variations accepted (e.g. lowercase, nickname, date)
    acceptedPasswords: string[];
    // Friendly hint displayed to help friends during testing
    hint: string;
  };
  copy: {
    badgeText: string;
    heading: string;
    subheading: string;
    supportingText: string;
    passwordInstruction: string;
    placeholder: string;
    buttonText: string;
    cardFooter: string;
    viewportFooter: string;
    emptyError: string;
    incorrectError: string;
    successMessage: string;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipient: {
    name: "Savitha",
    nickname: "thangaveluuuuuuu",
    birthdayDate: "November 3, 2026",
    year: 2026,
  },
  auth: {
    // You can change the secret password right here!
    defaultPassword: "savitha2026",
    acceptedPasswords: [
      "savitha2026",
      "thangavelu",
      "thangaveluuuuuuu",
      "savitha",
      "03112026",
      "03/11/2026",
      "birthday2026"
    ],
    hint: "Try 'savitha2026' or 'thangavelu' ✨",
  },
  copy: {
    badgeText: "A LITTLE SURPRISE FOR SOMEONE SPECIAL",
    heading: "Hey, thangaveluuuuuuu! 👀",
    subheading: "Someone has made something special just for you.",
    supportingText: "A tiny world of memories, laughter, and a little something from the heart is waiting inside.",
    passwordInstruction: "Only you know the secret. Enter the password to unlock your surprise.",
    placeholder: "Enter our secret password",
    buttonText: "Unlock Your Surprise",
    cardFooter: "Made with a little mischief and a lot of heart. 💜",
    viewportFooter: "Your little birthday universe awaits ✨",
    emptyError: "Please enter the secret password first! 🗝️",
    incorrectError: "Oops! That's not the secret. Try again, birthday star! ✨",
    successMessage: "You found the secret! Get ready for something special. 💜",
  },
};

/**
 * Validates the entered password against the accepted secret passwords list.
 * Case-insensitive and trimmed for a smooth user experience.
 */
export function validatePassword(input: string): boolean {
  if (!input || !input.trim()) return false;
  const normalized = input.trim().toLowerCase().replace(/[\s\-_]/g, '');
  return BIRTHDAY_CONFIG.auth.acceptedPasswords.some((pwd) => {
    const cleanPwd = pwd.toLowerCase().replace(/[\s\-_]/g, '');
    return (
      cleanPwd === normalized ||
      normalized.includes('savitha') ||
      normalized.includes('thangavelu') ||
      normalized === '03112026' ||
      normalized === 'birthday'
    );
  });
}
