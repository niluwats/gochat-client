import axios from "../../api/axios";

export async function verifyContact(contact, user) {
  try {
    const token = sessionStorage.getItem(user);

    const response = await axios.post(
      "/verifycontact",
      JSON.stringify({ username: contact }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    throw new Error(error);
  }
}
