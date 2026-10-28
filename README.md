# TXT Audio Reader

A small, private text-to-speech reader that runs in your browser on your own computer. Open a text file, a Markdown/Obsidian note, an EPUB or a PDF, and have it read aloud with a natural-sounding voice. You can also save it as audio (one WAV file per chapter).

It was built as a personal tool for listening back to my own writing. Hearing your words in another voice makes it easier to notice what doesn't flow, what's unclear, or what needs more work.

## What it does

- **Reads** `.txt`, `.md` (including Obsidian notes), `.epub` and `.pdf` files, or text you paste in.
- **Cleans up Markdown** before reading: frontmatter, `#tags`, `[[links]]`, comments, bullets and emojis are left out, so you hear the words, not the formatting.
- **Splits long documents into chapters** (at `#`/`##` headings, EPUB chapters, or groups of 10 PDF pages), so you can jump in anywhere.
- **Highlights** the passage being read. Click any sentence to start from there.
- **Listening notes:** tag a passage while listening ("Too long", "Not clear", "Needs research", "Sounds off", or your own note) and export the list as Markdown.
- **Saves audio** as WAV, per chapter or for all chapters.
- **English and Dutch:** British English voices via [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), and Dutch/Flemish voices via [Piper](https://github.com/rhasspy/piper). A Dutch file is detected and switches to a Dutch voice automatically.
- **Remembers** your favourite voice per language and your speed setting.

## How to use it

You need a computer with Python 3 (included with, or easily installed on, macOS and Linux) and a modern browser. Chrome or Edge is fastest, because they can use your graphics chip. Firefox and Safari work, but more slowly.

**On a Mac:** double-click `Start TXT Audio Reader.command` (or the Chrome version). The first time, macOS may block it: right-click → Open → Open. A Terminal window opens and the reader appears in your browser. Keep that window open while you use it; close it to stop.

**Anywhere else:** in this folder, run

```
python3 -m http.server 8765 --bind 127.0.0.1
```

and open `http://localhost:8765` in your browser.

The page must be opened through `localhost`, not by double-clicking `index.html`, because browsers don't allow the voice engine to start from a plain file.

The first time you use each engine, the voice model is downloaded (roughly 80–300 MB for Kokoro, about 60 MB per Dutch voice). After that it's cached by your browser.

## Privacy

Your documents never leave your computer. All text processing and speech generation happens locally in your browser. Nothing is uploaded, and there are no accounts, analytics or tracking.

The page does load its libraries and voice models from public sources (jsDelivr, cdnjs and Hugging Face), the first time and whenever your browser's cache is cleared. Those services can see that a download happened, but not what you're reading.

## Intended use and ethics

This is a tool for **personal use**: reviewing your own writing, listening to your own notes, or listening to texts you're allowed to use, such as course material for your own study.

Please keep it that way:

- **No DRM circumvention.** This tool does not, and will not, remove or bypass copy protection. DRM-protected EPUBs or PDFs won't work, and requests or contributions to add that won't be accepted.
- **Respect copyright.** Turning a book into audio is making a copy. Listening to something privately for yourself is one thing; sharing, publishing or selling audio made from someone else's work is something else and generally needs the rights holder's permission. Laws differ per country, so check what applies to you.
- **Be honest about synthetic voices.** If you publish audio made with this tool (for example of your own writing, or in your music), say that the voice is computer-generated, and don't present it as a real person's voice.
- **No impersonation.** Don't use it to make audio that pretends to be a real, identifiable person, or to mislead people.
- **Accessibility first.** Text-to-speech is also an important accessibility aid. If you use it for that, great: the same respect for other people's work applies.

## Third-party software and voices

This project contains only its own code. The engines, libraries and voice models are loaded from their original sources at runtime and remain under their own licences:

| Component | Used for | Licence |
|---|---|---|
| [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) / [kokoro-js](https://www.npmjs.com/package/kokoro-js) | English voices | Apache 2.0 |
| [vits-web](https://github.com/diffusionstudio/vits-web) | Running Piper in the browser | MIT |
| [Piper voices](https://huggingface.co/rhasspy/piper-voices) | Dutch/Flemish voices | Varies per voice, see each model card |
| [ONNX Runtime Web](https://github.com/microsoft/onnxruntime) | Running the models | MIT |
| [PDF.js](https://github.com/mozilla/pdf.js) | Reading PDFs | Apache 2.0 |
| [JSZip](https://github.com/Stuk/jszip) | Reading EPUBs | MIT or GPLv3 |

Each Piper voice is trained on its own dataset and has its own licence, and some voices may restrict commercial use. If you want to use generated audio in anything beyond personal use (a published track, for instance), check that voice's model card first.

## Credits

Created by Maurice Hissink ([harmonicworks](https://github.com/harmonicworks)): the idea, design choices and testing. Built together with Claude (Anthropic), which wrote most of the code.

## Licence

The code in this repository is released under the [MIT Licence](LICENSE). That covers the code only, not the voice models or the texts you read with it.

## Disclaimer

This software is provided as-is, without warranty. You are responsible for how you use it and for making sure you have the right to use the texts you feed it. Nothing in this README is legal advice.
