
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🎮 Received request for content generation');
    const { type, petIndex } = await req.json();
    console.log('📝 Content type requested:', type, 'Pet index:', petIndex);

    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    // Pet-specific inspiration for more personalized content
    const petInspirations = [
      'warmth, comfort, gentle purring, cozy moments', // Cat
      'loyalty, faithful companionship, unconditional love, playful joy', // Dog  
      'tenderness, soft touches, gentle hops, peaceful meadows', // Bunny
      'clever wit, autumn warmth, mysterious beauty, forest magic', // Fox
      'calm serenity, peaceful balance, gentle strength, zen moments', // Panda
      'simple joys, natural beauty, refreshing rain, pond reflections' // Frog
    ];

    const petInspiration = petIndex !== undefined ? petInspirations[petIndex % petInspirations.length] : 'love, warmth, connection';

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'poetry':
        systemPrompt = `You are a heartfelt poet who creates genuine, romantic poetry. Write short, sincere poems that express deep love and care. Avoid clichés, gaming references, or digital metaphors. Focus on real human emotions and connections.`;
        userPrompt = `Write a short, heartfelt love poem in 1-3 sentences. It should be simple, sincere, and romantic — something you would say to someone you deeply care for. Draw gentle inspiration from themes of ${petInspiration}, but keep it natural and emotionally warm. Avoid clichés and obvious metaphors.`;
        break;
      case 'quote':
        systemPrompt = `You are a wise romantic who creates touching quotes about love and relationships. Write genuine, heartfelt quotes that express deep affection. Avoid clichés and focus on authentic emotions.`;
        userPrompt = `Write a short, heartfelt love quote in 1-2 sentences. It should be simple, sincere, and romantic — something you would say to someone you deeply care for. Draw gentle inspiration from themes of ${petInspiration}, but keep it natural and emotionally warm. Avoid clichés and obvious metaphors.`;
        break;
      case 'note':
        systemPrompt = `You are someone deeply in love writing a personal note to their beloved. Write warm, encouraging messages that feel genuine and heartfelt. Avoid clichés and gaming references.`;
        userPrompt = `Write a sweet, encouraging love note in 1-2 sentences. It should be simple, sincere, and romantic — something you would say to someone you deeply care for. Draw gentle inspiration from themes of ${petInspiration}, but make it feel like a personal message of love and support. Keep it natural and emotionally warm.`;
        break;
      default:
        throw new Error('Invalid content type');
    }

    console.log('🤖 Making request to OpenAI API with inspiration:', petInspiration);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API error:', response.status, response.statusText, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ OpenAI response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI API');
    }
    
    const content = data.choices[0].message.content.trim();

    // Remove quotes if the AI added them
    const cleanContent = content.replace(/^["']|["']$/g, '');

    const result = { 
      content: cleanContent,
      type: type,
      author: type === 'note' ? undefined : 'Anonymous',
      petInspiration: petInspiration
    };

    console.log('🎁 Returning generated content:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('💥 Error generating content:', error);
    
    // Always return a valid response, even if OpenAI fails
    const fallbackContent = {
      poetry: "In your eyes, I find my home, in your smile, my heart finds peace.",
      quote: "You are my favorite hello and my hardest goodbye.",
      note: "Just thinking of you makes my day brighter. You mean everything to me."
    };

    const { type } = await req.json().catch(() => ({ type: 'note' }));
    
    return new Response(JSON.stringify({ 
      content: fallbackContent[type] || fallbackContent.note,
      type: type,
      author: type === 'note' ? undefined : 'Anonymous',
      fallback: true
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
