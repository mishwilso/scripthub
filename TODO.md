# Formatting Tools - Implementation TODO
 
## Format.tsx (Sidebar Panel) — `src/components/editor/Tools/Format.tsx`
 
### TEXT Section
 
- [x] **Font Family** — Uncomment and wire up `applyFontFamily()` so selecting a font from the dropdown actually applies it via `$patchStyleText` (line ~498)
- [x] **Font Weight** — Uncomment and wire up `applyFontWeight()` so the weight dropdown applies via `$patchStyleText` (line ~510)
- [x] **Text Color** — Uncomment and wire up `applyTextColor()` so picking a color applies it to the selection (line ~547)
- [ ] **Highlight Color** — Uncomment and wire up `applyHighlightColor()` so picking a highlight applies `background-color` (line ~557)
- [x] **Line Spacing** — Uncomment and wire up `applyLineHeight`, `applyLetterSpacing`, `applyWordSpacing` handlers (line ~568). Currently the +/- buttons only `console.log`
- [x] **Detect font-family from selection** — Sync `selectedFontStyle` state with the current selection using `$getSelectionStyleValueForProperty`
- [x] **Detect font-weight from selection** — Sync `selectedFontWeight` state with the current selection
- [x] **Detect text color from selection** — Sync `selectedTextColor` with the current selection's `color` style
- [ ] **Detect highlight color from selection** — Sync `selectedHighlightColor` with the current selection's `background-color` style

### STYLING Section
 
- [ ] **Quote button** — Replace `console.log` with `$setBlocksType(selection, () => $createQuoteNode())` (line ~1213). Add toggle-off logic and active state detection
- [ ] **Code block button** — Replace `console.log` with `$setBlocksType(selection, () => $createCodeNode())` (line ~1227). Requires `$createCodeNode` import and `CodeNode` registration
- [ ] **Link button** — Replace `console.log` with a URL input modal/popover, then `editor.dispatchCommand(TOGGLE_LINK_COMMAND, url)` (line ~1241). Detect if already a link for toggle-off
- [ ] **Clear formatting button** — Implement `clearFormatting()` to strip bold/italic/underline/strikethrough + reset color, background-color, font-size, font-family, font-weight via `$patchStyleText` (line ~1251)
- [ ] **Image button** — Open a file picker or URL modal, then insert a custom `ImageNode` (line ~1262). Requires custom Lexical node implementation
 
### ALIGNMENT Section
 
- [ ] **Align Left** — Replace `console.log` with `editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')` (line ~1300)
- [ ] **Align Center** — Replace `console.log` with `editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')` (line ~1308)
- [ ] **Align Right** — Replace `console.log` with `editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')` (line ~1316)
- [ ] **Align Justify** — Replace `console.log` with `editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')` (line ~1324)
- [ ] **Detect current alignment** — Use the update listener to read current element alignment and set `currentAlignment` state for active button highlighting
 
---
 
## ToolBar.tsx (Floating Bottom Bar) — `src/components/editor/ToolBar.tsx`
 
### Color Pickers
 
- [ ] **Text Color picker** — Replace `console.log` with a color picker popover component. Apply via `$patchStyleText(selection, { color })` (line ~195)
- [ ] **Highlight Color picker** — Replace `console.log` with a color picker popover component. Apply via `$patchStyleText(selection, { 'background-color': color })` (line ~203)
- [ ] **Detect text color from selection** — In the update listener, read `color` style and update `currentTextColor` + the color indicator bar (line ~154)
- [ ] **Detect highlight color from selection** — In the update listener, read `background-color` style and update `currentHighlightColor` + indicator bar
 
### Insert Elements
 
- [ ] **Link button** — Replace `console.log` with a URL input modal, then `editor.dispatchCommand(TOGGLE_LINK_COMMAND, url)` (line ~247). Add `active={isLink}` state detection
- [ ] **Image button** — Replace `console.log` with file picker + `ImageNode` insertion (line ~257). Requires custom `ImageNode`
- [ ] **Quote button** — Replace `console.log` with `$setBlocksType` + `$createQuoteNode()` (line ~267). Add `active={isQuote}` toggle and state detection
- [ ] **Divider button** — Replace `console.log` with `editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)` (line ~276). Register `HorizontalRuleNode` in editor config
 
### Indentation
 
- [ ] **Decrease Indent** — Replace `console.log` with `editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)` (line ~288)
- [ ] **Increase Indent** — Replace `console.log` with `editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)` (line ~296)
 
### Selection State Detection
 
- [ ] **Detect link state** — In the update listener, check if the current node is a `LinkNode` and set `isLink` + `linkUrl` (line ~154)
- [ ] **Detect quote state** — In the update listener, check if the current block is a `QuoteNode` and set `isQuote`
 
---
 
## Shared / Cross-Cutting
 
- [ ] **ImageNode** — Create a custom Lexical `ImageNode` for both Format.tsx and ToolBar.tsx image insertion
- [ ] **LinkNode registration** — Ensure `LinkNode` is registered in the editor config (nodes array)
- [ ] **CodeNode registration** — Ensure `CodeNode` is registered in the editor config
- [ ] **QuoteNode registration** — Ensure `QuoteNode` is registered in the editor config
- [ ] **HorizontalRuleNode registration** — Ensure `HorizontalRuleNode` is registered in the editor config
- [ ] **Reusable color picker component** — Consider extracting the color picker from Format.tsx into a shared component usable by both Format.tsx and ToolBar.tsx