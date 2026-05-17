class AiService {
  async generateSchema(prompt: string) {
    if (prompt.trim().length === 0) throw Error("Please enter a prompt");

    const res = await fetch("/api/generate-schema", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error ?? "Server Error");
    }

    const { schema } = await res.json();
    return schema;
  }
}

const aiService = new AiService();
export default aiService;
