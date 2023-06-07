import axios from "../../api/axios";

export async function chatHistory(from, to) {
  try {
    const token = sessionStorage.getItem(from);

    const response = await axios.get(`/chathistory?u1=${from}&u2=${to}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
}
