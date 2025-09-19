"use server"

// This function runs only on the server

export async function submitEmail(quizData: { email: string; [key: string]: any }) {
  // 1. Prepare the data payload for the webhook
  // It includes all the data from the quiz, plus the specific event and tag fields
  const webhookPayload = {
    ...quizData,
    evento: "Usuario Criado", // Your specified event in Portuguese
    tag: "liven fr - usuario criado", // CORRECT TAG: Your specified tag in Portuguese
  }

  // 2. Define the webhook URL
  const webhookUrl = "https://get.flwg.cc/webhook/d9afc0f144dd2f70ad5558bf7532212d48947016bc01a515b64a9d8f71823961";

  try {
    // 3. Send the data to the webhook using a POST request
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    // 4. Check if the request was successful
    if (!response.ok) {
      // If the webhook server responds with an error, log it and return a failure message
      const errorBody = await response.text();
      console.error("Webhook failed with status:", response.status, errorBody);
      return { success: false, message: "Could not save your data. Please try again." };
    }

    // 5. If everything went well, return a success status
    return { success: true };

  } catch (error) {
    // 6. Handle network errors or other unexpected issues with the fetch call
    console.error("Error submitting data to webhook:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
