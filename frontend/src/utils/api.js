import axios from "axios";

export const getCruxData = async (urls, deviceType) => {
  try {
    const response = await axios.post("https://crux-backend-nine.vercel.app/api/crux", {urls , device: deviceType });
    return response.data.results;
  } catch (e) {
    return [{ success: false, error: e.toString() }];
  }
}
