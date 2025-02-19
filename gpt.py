from openai import OpenAI

client = OpenAI(
    api_key="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"
)

completion = client.chat.completions.create(
    store=True,
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "write a haiku about ai"}],
)


print(completion.choices[0].message)
