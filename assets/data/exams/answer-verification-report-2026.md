# Phase 17.2 - Madrasetna 3 Answer Verification Report (2026)

- Generated at: `2026-05-21T22:37:32`
- Scope: verification report only (no question-bank or UI changes).

## Files Used

### Local official PDFs (question mapping context)
- `Chemistry_AR_Model_1_2026.pdf`
- `Chemistry_AR_Model_2_2026.pdf`
- `Chemistry_AR_Model_3_2026.pdf`
- `Chemistry_AR_Model_4_2026.pdf`
- `Chemistry_AR_Model_5_2026.pdf`
- `Chemistry_AR_Model_6_2026.pdf`
- `Chemistry_AR_Model_7_2026.pdf`
- `Chemistry_AR_Model_8_2026.pdf`
- `Chemistry_AR_Model_9_2026.pdf`

### Madrasetna 3 links inspected
- Model 1: https://www.youtube.com/watch?index=87&list=PLucnAjsctIU54BnpaYy7MDrF5NKHWxkcS&v=kRFyhxyHtZY
- Model 2: https://www.youtube.com/watch?index=67&list=PLucnAjsctIU54BnpaYy7MDrF5NKHWxkcS&v=tlArKf2fOAQ
- Model 3: https://www.youtube.com/watch?index=48&list=PLucnAjsctIU54BnpaYy7MDrF5NKHWxkcS&v=vNIU8O8OEfc
- Model 4: https://www.youtube.com/watch?index=23&list=PLucnAjsctIU54BnpaYy7MDrF5NKHWxkcS&v=HJPnXZ-VTHk

## Transcript/Caption Availability Check

### Model 1
- Watch page reachable: `true`
- Caption tracks detected: `false`
- Arabic track detected: `false`
- Caption payload length: `None`
- Note: No caption tracks in player metadata.

### Model 2
- Watch page reachable: `true`
- Caption tracks detected: `true`
- Arabic track detected: `true`
- Caption payload length: `None`
- Note: caption fetch error: HTTPError

### Model 3
- Watch page reachable: `true`
- Caption tracks detected: `true`
- Arabic track detected: `true`
- Caption payload length: `None`
- Note: caption fetch error: HTTPError

### Model 4
- Watch page reachable: `true`
- Caption tracks detected: `true`
- Arabic track detected: `true`
- Caption payload length: `None`
- Note: caption fetch error: HTTPError

## Matching Scope (Model/Question -> questionId)

- Model 1: `20` questionId mappings found in `source-map-2026.json`.
- Model 2: `14` questionId mappings found in `source-map-2026.json`.
- Model 3: `13` questionId mappings found in `source-map-2026.json`.
- Model 4: `20` questionId mappings found in `source-map-2026.json`.

## Answers Extracted Per Model

- Model 1: `0`
- Model 2: `0`
- Model 3: `0`
- Model 4: `0`

## Extracted Answer Records

- High confidence (`madrasetna-3`): `0`
- Medium confidence (`madrasetna-derived-secondary`): `0`
- Low confidence (`reasoned`): `0`
- Total extracted answers: `0`

## Unmatched Questions

- Total unmatched (models 1-4 mapping set): `67`
- Full unmatched list is saved in `assets/data/exams/answer-map-2026-draft.json` under `unmatched`.

## Safety Decision

- `canAutoGrade` remains `false` for all unmatched records.
- No answer keys were marked verified in this phase due unavailable trusted transcript payloads in current environment.

## Recommended Next Step Before Updating App Bank

1. Obtain accessible Madrasetna transcript source (official captions export or manual transcript).
2. Re-run verification to populate `records` with `answerSourceType`, `answerSourceRef`, `timestamp`, and `canAutoGrade=true` only for high-confidence items.
3. Only after that, update `official-2026-models.json` answer keys in a separate phase.
