import axios from "../../api/axios";

export async function getContactList(username) {
  try {
    const token = sessionStorage.getItem(username);

    const response = await axios.get(`/contactlist?username=${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    const filtered = response.data.data.filter((item) => item.username !== "");
    return filtered.map((item) => item.username);
  } catch (error) {
    throw new Error(error);
  }
}
