"use server"

export async function submitName(quizData: { [key: string]: string | null }) {
  try {
    console.log("Submitting name data:", quizData)

    const webhookUrl =
      "https://get.flwg.cc/webhook/d9afc0f144dd2f70ad5558bf7532212d48947016bc01a515b64a9d8f71823961"

    const payload = {
      tag: "liven fr - usuario criado",
      type: "usuario-criado",
      data: quizData,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Webhook response not ok:", response.status, response.statusText)
      return { success: false, error: "Failed to submit data" }
    }

    const result = await response.text()
    console.log("Webhook response:", result)

    return { success: true }
  } catch (error) {
    console.error("Error submitting name:", error)
    return { success: false, error: "Network error occurred" }
  }
}
