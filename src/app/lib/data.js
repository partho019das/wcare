export const getusers = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

  try {
    const res = await fetch(`${baseUrl}/docter`, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error("Failed to fetch doctors from backend");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error inside getusers:", error);
    return [];
  }
};