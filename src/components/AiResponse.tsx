import { Fragment, type ReactNode } from 'react'
import { motion } from 'motion/react'

/**
 * The explanation body is written by Claude as markdown (see scripts/generate-content.js),
 * so it arrives with headings, bold labels and lists. These helpers turn that text into
 * readable blocks instead of one long paragraph.
 */

type Block =
  | { type: 'heading'; text: string; level: number }
  | { type: 'label'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'divider' }

const HEADING = /^(#{1,6})\s+(.*)$/
const RULE = /^\s*([-*_])\1{2,}\s*$/
const ORDERED_ITEM = /^\s*(\d+)[.)]\s+(.*)$/
const BULLET_ITEM = /^\s*[-*•]\s+(.*)$/
/** A line that is nothing but bold text, e.g. `**Simple Explanation for Class:**`. */
const LABEL_LINE = /^\*\*(.+?)\*\*:?\s*$/
/** `**Cell structure** — the basic unit of life` split into title and body. */
const TITLED_ITEM = /^\*\*(.+?)\*\*\s*[:—–-]*\s*([\s\S]*)$/
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`)/g

function parseAiText(source: string): Block[] {
  const blocks: Block[] = []
  let list: Extract<Block, { type: 'list' }> | null = null
  let paragraph: string[] = []
  let afterBlank = false

  const flushParagraph = () => {
    if (!paragraph.length) return

    const text = paragraph.join(' ')
    const label = text.match(LABEL_LINE)
    blocks.push(label ? { type: 'label', text: label[1].replace(/:$/, '') } : { type: 'paragraph', text })
    paragraph = []
  }

  for (const line of source.replace(/\r\n/g, '\n').split('\n')) {
    if (!line.trim()) {
      afterBlank = true
      flushParagraph()
      continue
    }

    if (RULE.test(line)) {
      flushParagraph()
      list = null
      blocks.push({ type: 'divider' })
      afterBlank = false
      continue
    }

    const heading = line.match(HEADING)
    if (heading) {
      flushParagraph()
      list = null
      blocks.push({ type: 'heading', text: heading[2].trim(), level: heading[1].length })
      afterBlank = false
      continue
    }

    const ordered = line.match(ORDERED_ITEM)
    const bullet = ordered ? null : line.match(BULLET_ITEM)
    if (ordered || bullet) {
      flushParagraph()
      const isOrdered = Boolean(ordered)
      if (!list || list.ordered !== isOrdered) {
        list = { type: 'list', ordered: isOrdered, items: [] }
        blocks.push(list)
      }
      list.items.push((ordered ? ordered[2] : bullet![1]).trim())
      afterBlank = false
      continue
    }

    // A wrapped or indented line right under a list item belongs to that item.
    if (list && !afterBlank) {
      list.items[list.items.length - 1] += ` ${line.trim()}`
      continue
    }

    list = null
    paragraph.push(line.trim())
    afterBlank = false
  }

  flushParagraph()
  return blocks
}

function renderInline(text: string): ReactNode {
  return text.split(INLINE).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-stone-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded bg-stone-100 px-1 py-0.5 font-mono text-[0.85em] text-emerald-800 dark:bg-white/10 dark:text-emerald-300">
          {part.slice(1, -1)}
        </code>
      )
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

const body = 'text-[0.9375rem] leading-7 text-stone-700 dark:text-stone-300'

function Heading({ text, level }: { text: string; level: number }) {
  if (level >= 3) {
    return (
      <h4 className="text-xs font-extrabold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
        {renderInline(text)}
      </h4>
    )
  }

  return (
    <h3
      className={
        level === 1
          ? 'text-lg font-black leading-snug text-stone-950 dark:text-white'
          : 'border-l-2 border-emerald-700 pl-3 text-base font-black leading-snug text-stone-950 dark:border-emerald-400 dark:text-white'
      }
    >
      {renderInline(text)}
    </h3>
  )
}

/** Numbered items usually lead with a bold outcome title, so give it its own line. */
function OrderedItem({ index, text }: { index: number; text: string }) {
  const titled = text.match(TITLED_ITEM)

  return (
    <li className="grid grid-cols-[1.75rem_1fr] gap-3 rounded-lg border border-stone-200/80 bg-white/60 p-3.5 dark:border-white/10 dark:bg-white/5">
      <span className="grid size-7 place-items-center rounded-full bg-emerald-700/10 text-xs font-extrabold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300">
        {index + 1}
      </span>

      <div className="min-w-0">
        {titled ? (
          <>
            <strong className="block text-[0.95rem] leading-snug text-stone-900 dark:text-white">{titled[1]}</strong>
            {titled[2] && <p className={`mt-1.5 ${body}`}>{renderInline(titled[2])}</p>}
          </>
        ) : (
          <p className={body}>{renderInline(text)}</p>
        )}
      </div>
    </li>
  )
}

export function AiResponse({ text }: { text: string }) {
  const blocks = parseAiText(text)

  return (
    <div className="max-w-[68ch] space-y-3.5">
      {blocks.map((block, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index, 8) * 0.05, duration: 0.35 }}
          className={block.type === 'heading' && index > 0 ? 'pt-2.5' : undefined}
        >
          {block.type === 'heading' && <Heading level={block.level} text={block.text} />}

          {block.type === 'label' && (
            <p className="text-xs font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {block.text}
            </p>
          )}

          {block.type === 'paragraph' && <p className={body}>{renderInline(block.text)}</p>}

          {block.type === 'divider' && <hr className="border-stone-200/80 dark:border-white/10" />}

          {block.type === 'list' &&
            (block.ordered ? (
              <ol className="grid gap-2.5">
                {block.items.map((item, itemIndex) => (
                  <OrderedItem key={itemIndex} index={itemIndex} text={item} />
                ))}
              </ol>
            ) : (
              <ul className="grid gap-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="grid grid-cols-[0.75rem_1fr] gap-2.5">
                    <span className="mt-3 size-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
                    <p className={body}>{renderInline(item)}</p>
                  </li>
                ))}
              </ul>
            ))}
        </motion.div>
      ))}
    </div>
  )
}
