/**
 * Memory Service
 * Handles persistence of user profile and conversation history using localStorage.
 * This allows the AI assistant to "remember" the user and context between sessions.
 */

export interface UserProfile {
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

    /**
     * Builds the context string to inject into the AI's system instruction.
     */
    buildContextContext: (): string => {
        const profile = memoryService.getUserProfile();
        const history = memoryService.getConversationHistory();

        const nameContext = profile.name ? `User's Name: ${profile.name}` : "User's Name: Unknown (Ask politely if relevant)";

        // Format last 3 conversations
        const recentHistory = history.slice(0, 3).map(h =>
            `- [${new Date(h.timestamp).toLocaleDateString()}]: ${h.summary}`
        ).join('\n');

        const historyContext = recentHistory
            ? `Recent Conversations:\n${recentHistory}`
            : "No recent conversation history.";

        return `
[MEMORY & CONTEXT]
${nameContext}
${historyContext}
If the user's name is known, address them by it occasionally.
Recall topics from recent conversations to provide continuity if the user references them.
`;
    }
};
