# AI chat recommendations

## Where the code lives

1. `src/redux/slice/aiChatSlice.js` reads two extra fields from the send-message response: `scope_limited` and `alternative_astrologers`. It attaches them directly to the assistant message. Each alternative contains its own `chat_price`.
2. `src/components/AIChatBot/AstrologerRecommendations.jsx` shows the astrologer's name, expertise and supplied price, then asks for confirmation.
3. `src/components/AIChatBot/AIChatBot.jsx` stops the current chat and opens `/ai-chat/{astrologer.slug}/{astrologer.expertise.slug}`. The original question is prefilled, not automatically sent.

There is no helper file in `lib` and no extra API call for pricing. Billing stays on the backend. Unused response fields such as `billing_applied` and `counts_toward_free_limit` are not added to the chat state.

## Small session safeguards

- Wait for stop-chat to succeed before navigating. Show an error if it fails.
- Clear the old session, timer state and follow-up questions when a new session starts.
- Ignore old history/status responses that arrive after switching.
- Use `??` for `chat_free_used` so an explicit `false` is preserved. An omitted value in a message response leaves the existing allowance unchanged.

## Backend response

Use `scope_limited: true` for referrals and omit it or return `false` for normal replies. Read each recommended rate from `alternative_astrologers[].chat_price`, for example `25`. Missing or invalid rates disable switching for that astrologer.

Multiple recommendations can have different prices. The confirmation displays the selected astrologer's own price. The nested `scope` object and other unused response fields are ignored.

History must include `scope_limited` and `alternative_astrologers` (with each astrologer's `chat_price`) on each assistant message to show recommendations after refresh.

## Checks

Run `node --test tests/ai-chat-recommendations.test.mjs` and `npm run build`. Live billing and history persistence require an authenticated browser check.
