import 'dotenv/config'
import fs from 'fs'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY   // service role, not anon — bypasses RLS
)

const rawContent = fs.readFileSync('content/raw-strand.md', 'utf-8')

// The source document names the strand; earlier runs stored the sub-strand here by mistake.
const strandHeading = rawContent.match(/^#\s+Strand:\s*(.+)$/m)

if (!strandHeading) {
  console.error('content/raw-strand.md needs a "# Strand: <name>" heading')
  process.exit(1)
}

const STRAND = { name: strandHeading[1].trim(), subject: 'Biology' }

/** Reuse the strand if it already exists, so re-running does not fork the content. */
async function resolveStrand() {
  const { data: existing, error: lookupError } = await supabase
    .from('strands')
    .select('id')
    .eq('name', STRAND.name)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (lookupError) return { error: lookupError }
  if (existing) return { strand: existing }

  const { data, error } = await supabase.from('strands').insert(STRAND).select().single()

  return error ? { error } : { strand: data }
}

async function generate() {
  const { strand, error: strandError } = await resolveStrand()

  if (strandError) {
    console.error('Strand lookup failed:', strandError)
    return
  }

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{
      role: "user",
      content: `You are helping a Grade 10 Biology teacher in Kenya who was not trained on this strand and has no internet or textbooks. Based ONLY on the curriculum content below, write a clear, simple explanation of each learning outcome she can use directly in class. If anything is unclear or not covered by the source content, say so explicitly rather than guessing.

Curriculum content:
${rawContent}

Format your response as markdown, one "## " heading per learning outcome, followed by short paragraphs and "- " bullets. The app renders this markdown directly, so use no other syntax.`
    }]
  })

  const generatedText = message.content[0].text

  const { error: contentError } = await supabase
    .from('content')
    .insert({
      strand_id: strand.id,
      content_type: 'explanation',
      body: generatedText
    })

  if (contentError) {
    console.error('Content insert failed:', contentError)
    return
  }

  console.log('✅ Content generated and saved to Supabase')
}

generate().catch(err => console.error('Script failed:', err))