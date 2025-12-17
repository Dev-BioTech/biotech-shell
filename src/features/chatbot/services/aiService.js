import apiClient from "../../../shared/utils/apiClient";

export const aiService = {
  // Send message to AI Chat
  sendMessage: async (message) => {
    try {
      // Backend expects ChatRequestDto { message: string }
      const response = await apiClient.post("/Chat", { message });
      return response.data;
    } catch (error) {
      console.error("Error sending message to AI:", error);
      throw error;
    }
  },
};

export default aiService;
