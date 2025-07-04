
import { apiConnector } from "../apiconnector";
import { trailTestEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { SUBMIT_TRAIL_TEST_API, GET_TRAIL_TEST_HISTORY_API } = trailTestEndpoints;

// Submit trail test timing
export async function submitTrailTestTime(userId, timeTaken) {
  const toastId = toast.loading("Submitting Test Time...");
  try {
    const response = await apiConnector("POST", SUBMIT_TRAIL_TEST_API, {
      userId,
      timeTaken,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Time submitted successfully");
    return response.data.timings;
  } catch (error) {
    console.error("SUBMIT_TRAIL_TEST_API ERROR:", error);
    // toast.error("Failed to submit time");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}

// Get trail test history
export async function getTrailTestHistory(userId) {
  try {
    const response = await apiConnector("GET", `${GET_TRAIL_TEST_HISTORY_API}/${userId}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.timings;
  } catch (error) {
    console.error("GET_TRAIL_TEST_HISTORY_API ERROR:", error);
    // toast.error("Failed to fetch test history");
    return [];
  }
}
