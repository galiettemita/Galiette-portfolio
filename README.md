# Galiette Mita — Portfolio

## Open the site
Unzip the whole folder and open `index.html` in your browser. Keep the CSS, JavaScript, and PDF alongside it. No install or build step is needed. Google Fonts are optional; system fonts are used offline.

## This revision
- Mobile Pros and ClassMaker lead the gallery and the opening snapshot.
- The gallery keeps Personal AI Agent, Medical Imaging, and PneumoScan.
- Early-stage projects are intentionally omitted until there is tangible work to show.
- CUB remains a current leadership role, without claiming future achievements.
- The red / cream / charcoal design, personal writing, supporting work, and resume PDF are retained.
- Neither Google Docs resume was edited. The included PDF is the same snapshot as the previous portfolio, not a live Google Doc connection.

## Add real demo recordings later
Five featured-project video slots remain available:
- `videos/mobile-pros.mp4`
- `videos/classmaker.mp4`
- `videos/ai-agent.mp4`
- `videos/medical-ai.mp4`
- `videos/pneumoscan.mp4`

No recordings are included. Leave `src` empty in `media.js` until the actual recording exists. To add a video, place it in videos/ and set its entry, e.g.:

```js
"classmaker": {"src": "videos/classmaker.mp4", "poster": ""}
```

Use real recordings with sample or anonymized data. Videos play muted while in view, pause off-screen, and offer a manual pause control. Reduced-motion users start playback manually. An optional poster can be stored in posters/ and referenced in the same entry.

Early-stage projects can be added later once there is real work to show; until then, keep the portfolio focused on tangible work.

## Sharing
The separate single-file HTML preview embeds this site's CSS, JavaScript, and resume PDF. It can be opened directly without unzipping. Use this folder as the editable source.

This package has not been publicly deployed. A local file path or ChatGPT attachment is not a public website URL.