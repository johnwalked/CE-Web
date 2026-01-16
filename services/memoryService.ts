/**
 * Memory Service
 * Handles persistence of user profile and conversation history using localStorage.
 * This allows the AI assistant to "remember" the user and context between sessions.
 */

export interface UserProfile {
    clientId?: string; // Persistent Device/IP Identifier
    name?: string;
    preferences?: {
        language?: string;
        notifications?: boolean;
    };
    lastInteraction?: number;
}

export interface ConversationSummary {
    id: string;
    timestamp: number;
    summary: string; // A brief summary of what was discussed
    topics: string[];
}

const STORAGE_KEYS = {
    USER_PROFILE: 'ce_power_user_profile',
    CONVERSATION_HISTORY: 'ce_power_conversation_history'
};

export const memoryService = {
    // --- User Profile ---

    getUserProfile: (): UserProfile => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error("Failed to load user profile", e);
            return {};
        }
    },

    saveUserProfile: (profile: Partial<UserProfile>) => {
        try {
            const current = memoryService.getUserProfile();
            const updated = { ...current, ...profile, lastInteraction: Date.now() };
            localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
        } catch (e) {
            console.error("Failed to save user profile", e);
        }
    },

    updateUserName: (name: string) => {
        memoryService.saveUserProfile({ name });
    },

    // --- Conversation History ---

    getConversationHistory: (): ConversationSummary[] => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.CONVERSATION_HISTORY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to load conversation history", e);
            return [];
        }
    },

    saveConversationAttempt: (summary: string) => {
        // Start with a simple implementation: Append a simple summary
        // In a real app, we might use the AI to generate this summary first
        if (!summary) return;

        try {
            const history = memoryService.getConversationHistory();
            const newEntry: ConversationSummary = {
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                summary,
                topics: [] // Can be extracted via AI later
            };

            // Keep only last 10 conversations to save space
            const updatedHistory = [newEntry, ...history].slice(0, 10);
            localStorage.setItem(STORAGE_KEYS.CONVERSATION_HISTORY, JSON.stringify(updatedHistory));
        } catch (e) {
            console.error("Failed to save conversation", e);
        }
    },

    // --- Context Construction ---

    buildContextContext: (): string => {
        const profile = memoryService.getUserProfile();
        const history = memoryService.getConversationHistory();

        // Ensure Client ID exists (simulating IP/Device tracking)
        if (!profile.clientId) {
            profile.clientId = crypto.randomUUID();
            memoryService.saveUserProfile({ clientId: profile.clientId });
        }

        const nameContext = profile.name ? `User's Name: ${profile.name}` : "User's Name: Unknown";
        const clientContext = `Client ID (Device/IP Memory): ${profile.clientId}`;

        // Format last 5 conversations (increased from 3)
        const recentHistory = history.slice(0, 5).map(h =>
            `- [${new Date(h.timestamp).toLocaleString()}]: ${h.summary}`
        ).join('\n');

        const historyContext = recentHistory
            ? `PAST CONVERSATION HISTORY (Use this to remember the user):\n${recentHistory}`
            : "No previous conversation history found for this device.";

        return `
[MEMORY SYSTEM - PERSISTENT CONTEXT]
${clientContext}
${nameContext}

${historyContext}

[INSTRUCTIONS FOR MEMORY USAGE]
1. RECOGNIZE THE USER: If there is history above, acknowledge it naturally (e.g., "Welcome back! Last time we discussed [topic]...").
2. CONTINUITY: If they asked about a specific product before, ask if they made a decision or need more info on it.
3. ADAPTIVITY: If they preferred a specific language or style previously, adopt it immediately.
`;
    }
};
