import { CodeNode, SerializedCodeNode } from "@lexical/code";
import type { EditorConfig, LexicalNode, NodeKey } from "lexical";

// ============================================================================
// CUSTOM CODE NODE - Simple extension of CodeNode
// ============================================================================

export class CustomCodeNode extends CodeNode {
  static getType(): string {
    return "custom-code";
  }

  static clone(node: CustomCodeNode): CustomCodeNode {
    return new CustomCodeNode(node.__language ?? undefined, node.__key);
  }

  constructor(language?: string, key?: NodeKey) {
    // Default to javascript if no language specified
    super(language || "javascript", key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    element.classList.add("custom-code-block");
    return element;
  }

  updateDOM(
    prevNode: CodeNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    // @ts-expect-error - Lexical's updateDOM has strict this typing
    return super.updateDOM(prevNode, dom, config);
  }

  static importJSON(serializedNode: SerializedCodeNode): CustomCodeNode {
    const node = $createCustomCodeNode(serializedNode.language as string);
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON(): SerializedCodeNode {
    return {
      ...super.exportJSON(),
      type: "custom-code",
    };
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function $createCustomCodeNode(language?: string): CustomCodeNode {
  return new CustomCodeNode(language);
}

export function $isCustomCodeNode(
  node: LexicalNode | null | undefined
): node is CustomCodeNode {
  return node instanceof CustomCodeNode;
}
