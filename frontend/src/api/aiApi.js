// All kommunikation med backend ligger här.
// Frontend pratar bara med vårt eget Web API – aldrig direkt med Gemini.
const API_URL = "http://localhost:5161/api/ai";

async function post(endpoint, data) {
    let response;
    try {
        response = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch {
        throw new Error("Kunde inte nå API:t. Är backend igång?");
    }

    const json = await response.json().catch(() => null);

    if (!response.ok) {
        // 400 = valideringsfel från DTO:n, 500 = fel från AiController (Ask)
        if (json?.errors)
            throw new Error(Object.values(json.errors).flat().join(" "));
        throw new Error(json?.error ?? `Något gick fel (${response.status})`);
    }

    return json.result;
}

export const summarize = (notes) => post("summarize", { notes });

export const createAgenda = (title, startTime, durationMinutes, topics) =>
    post("agenda", { title, startTime, durationMinutes, topics });

export const createInvitation = (title, dateTime, location, purpose) =>
    post("invitation", { title, dateTime, location, purpose });
