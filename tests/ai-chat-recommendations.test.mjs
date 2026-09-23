import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { configureStore } from "@reduxjs/toolkit";

// Stub the API so these checks never contact live chat or billing endpoints.
const source = (await readFile(new URL("../src/redux/slice/aiChatSlice.js", import.meta.url), "utf8"))
  .replace('from "@reduxjs/toolkit"', `from ${JSON.stringify(import.meta.resolve("@reduxjs/toolkit"))}`)
  .replace('import { api } from "../baseApi";', `
    let response;
    export const setResponse = (value) => { response = value; };
    const api = { post: async () => ({ data: response }) };
  `);
const chat = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const reducer = chat.default;
const active = { ...reducer(undefined, { type: "init" }), sessionId: "old", chatFreeUsed: true };

test("referral keeps the supplied rate and preserves an omitted free allowance", async () => {
  const alternatives = [
    { name: "Meera", slug: "meera-joshi", chat_price: 25, expertise: { name: "Love", slug: "love" } },
    { name: "Raghav", slug: "raghav", chat_price: 40, expertise: { name: "Career", slug: "career" } },
  ];
  chat.setResponse({ reply: "Try a specialist", scope_limited: true, alternative_astrologers: alternatives, scope: { alternative_astrologers: [] }, billing_applied: false, counts_toward_free_limit: false });
  const store = configureStore({ reducer, preloadedState: active });
  await store.dispatch(chat.sendChatMessage({ sessionId: "old", message: "Career?" }));
  const message = store.getState().messages[0];
  assert.equal(message.alternative_astrologers[0].chat_price, 25);
  assert.equal(message.alternative_astrologers[1].chat_price, 40);
  assert.equal("chat_price" in message, false);
  assert.equal("scope" in message, false);
  assert.equal("counts_toward_free_limit" in message, false);
  assert.equal(message.scope_limited, true);
  assert.deepEqual(message.alternative_astrologers, alternatives);
  assert.equal("billing_applied" in message, false);
  assert.equal(store.getState().chatFreeUsed, true);
});

test("normal replies have no recommendations and preserve explicit false", async () => {
  chat.setResponse({ reply: "Normal reply", chat_free_used: false });
  const store = configureStore({ reducer, preloadedState: active });
  await store.dispatch(chat.sendChatMessage({ sessionId: "old", message: "Hello" }));
  assert.equal(store.getState().chatFreeUsed, false);
  assert.equal(store.getState().messages[0].scope_limited, false);
  assert.deepEqual(store.getState().messages[0].alternative_astrologers, []);
});

test("old polling and history responses do not overwrite the destination session", () => {
  const state = { ...active, sessionId: "new" };
  assert.deepEqual(reducer(state, chat.fetchChatStatus.fulfilled({ chat_active: true }, "request", "old")), state);
  assert.deepEqual(reducer(state, chat.fetchChatHistory.fulfilled({ messages: [] }, "request", "old")), state);
});

test("a failed stop keeps the current session", async () => {
  chat.setResponse({ status: false, message: "Could not stop chat" });
  const store = configureStore({ reducer, preloadedState: active });
  await assert.rejects(store.dispatch(chat.closeSession("old")).unwrap(), (error) => error === "Could not stop chat");
  assert.equal(store.getState().sessionId, "old");
});
