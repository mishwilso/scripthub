import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from "lexical";

export type SerializedCaptionNode = Spread<
  {
    // Add custom properties here (e.g., text, align)
    type: "caption";
    version: 1;
  },
  SerializedElementNode
>;

export class CaptionNode extends ElementNode {
  static getType(): string {
    return "caption";
  }

  static clone(node: CaptionNode): CaptionNode {
    return new CaptionNode(node.__key);
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    // DOM ELEMENT TIME!!
    const element = document.createElement("div");
    const theme = config.theme;
    if (theme.caption) {
      element.className = theme.caption;
    }
    element.setAttribute("role", "note");
    element.setAttribute("aria-label", "Caption");
    return element;
  }

  updateDOM(
    _prevNode: this,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    // Returning false tells lexical that this node does not need
    // DOM element replacing with a new cioy from createDOM
    return false;
  }

  static create(): CaptionNode {
    return new CaptionNode();
  }

  exportJSON(): SerializedCaptionNode {
    return {
      ...super.exportJSON(),
      type: "caption",
      version: 1,
    };
  }

  static importJSON(serializedNode: SerializedCaptionNode): CaptionNode {
    return new CaptionNode();
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (domNode.classList.contains("editor-caption")) {
          return {
            conversion: convertCaptionElement,
            priority: 1,
          };
        }
        return null;
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("caption");
    element.className = "editor-caption";
    element.setAttribute("role", "note");
    element.setAttribute("aria-label", "Caption");
    return { element };
  }

  // Allow for text content inside
  canBeEmpty(): boolean {
    return true;
  }

  // Makes it a block
  isInline(): boolean {
    return false;
  }
}

function convertCaptionElement(): DOMConversionOutput {
  return { node: $createCaptionNode() };
}

export function $createCaptionNode() {
  return new CaptionNode();
}

export function $isCaptionNode(
  node: LexicalNode | null | undefined
): node is CaptionNode {
  return node instanceof CaptionNode;
}
