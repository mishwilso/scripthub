// lib/lexical/nodes/CustomCodeNode.ts
import { CodeNode, SerializedCodeNode } from '@lexical/code';
import type { EditorConfig, LexicalNode, NodeKey } from 'lexical';

export class CustomCodeNode extends CodeNode {
  static getType(): string {
    return 'code';
  }

  static clone(node: CustomCodeNode): CustomCodeNode {
    return new CustomCodeNode(node.__language, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    this.updateLineNumbers(element);
    return element;
  }

  updateDOM(
    prevNode: CustomCodeNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    this.updateLineNumbers(dom);
    return isUpdated;
  }

  private updateLineNumbers(element: HTMLElement): void {
    const textContent = this.getTextContent();
    const lineCount = textContent.split('\n').length;
    
    // Generate line numbers: "1\n2\n3\n4..."
    const lineNumbers = Array.from(
      { length: lineCount }, 
      (_, i) => i + 1
    ).join('\n');
    
    element.setAttribute('data-line-numbers', lineNumbers);
  }

  static importJSON(serializedNode: SerializedCodeNode): CustomCodeNode {
    const node = $createCustomCodeNode(serializedNode.language);
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON(): SerializedCodeNode {
    return {
      ...super.exportJSON(),
      type: 'code',
      version: 1,
    };
  }
}

export function $createCustomCodeNode(language?: string): CustomCodeNode {
  return new CustomCodeNode(language);
}

export function $isCustomCodeNode(node: LexicalNode | null | undefined): node is CustomCodeNode {
  return node instanceof CustomCodeNode;
}