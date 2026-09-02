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

async function generate() {
  const { data: strand, error: strandError } = await supabase
    .from('strands')
    .insert({ name: 'Introduction to Biology', subject: 'Biology' })
    .select()
    .single()

  if (strandError) {
    console.error('Strand insert failed:', strandError)
    return
  }

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: `You are helping a Grade 10 Biology teacher in Kenya who was not trained on this strand and has no internet or textbooks. Based ONLY on the curriculum content below, write a clear, simple explanation of each learning outcome she can use directly in class. If anything is unclear or not covered by the source content, say so explicitly rather than guessing.

Curriculum content:
${rawContent}

Format your response as a numbered list, one explanation per learning outcome.`
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