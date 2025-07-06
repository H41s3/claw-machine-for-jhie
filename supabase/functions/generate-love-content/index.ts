import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// Simple cache to prevent recent repetition (in production, use Redis or similar)
const recentContent = new Set<string>();

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

    // Romantic themes for girlfriend-focused content
    const romanticThemes = [
      'deep love and passion, intimate moments, romantic gestures, heartfelt emotions', // Passionate
      'gentle care and tenderness, sweet moments, soft affection, loving support', // Tender
      'adventure and excitement, shared dreams, growing together, romantic journeys', // Adventurous
      'peaceful love and harmony, shared moments together, deep connection, soulful romance', // Peaceful
      'joyful celebration of love, happy memories, laughter together, romantic fun', // Joyful
      'mysterious and enchanting love, magical moments, deep attraction, romantic mystery', // Mysterious
      'whimsical romance, playful love, sweet surprises, delightful moments', // Whimsical
      'intense passion, burning desire, electric connection, fiery love', // Intense
      'devoted love, steady commitment, unwavering dedication, gentle strength', // Devoted
      'magical romance, fairy tale love, enchanting moments, spellbinding connection' // Magical
    ];

    // Add variety with different romantic styles
    const styleVariations = [
      'deeply romantic and passionate',
      'sweet and tender',
      'playful and fun',
      'soulful and meaningful',
      'adventurous and exciting',
      'gentle and nurturing',
      'whimsical and charming',
      'intense and passionate',
      'devoted and loyal',
      'magical and enchanting'
    ];

    // Add more variety with specific contexts
    const contexts = [
      'morning love',
      'late night thoughts',
      'weekend adventures',
      'special occasions',
      'everyday romance',
      'future dreams',
      'past memories',
      'present moments',
      'timeless love',
      'romantic surprises'
    ];

    // Famous romantic writers and poets for inspiration
    const famousWriters = [
      'Pablo Neruda',
      'Rumi',
      'William Shakespeare',
      'Emily Dickinson',
      'Lord Byron',
      'Elizabeth Barrett Browning',
      'Robert Browning',
      'Sappho',
      'John Keats',
      'Percy Bysshe Shelley',
      'Walt Whitman',
      'Langston Hughes',
      'Maya Angelou',
      'Rainer Maria Rilke',
      'Khalil Gibran',
      'Oscar Wilde',
      'Jane Austen',
      'Charlotte Brontë',
      'Victor Hugo',
      'Alfred Lord Tennyson',
      'Rupi Kaur',
      'Courtney Peppernell',
      'Lang Leav'
    ];

    const romanticTheme = romanticThemes[Math.floor(Math.random() * romanticThemes.length)];
    const styleVariation = styleVariations[Math.floor(Math.random() * styleVariations.length)];
    const context = contexts[Math.floor(Math.random() * contexts.length)];
    const famousWriter = famousWriters[Math.floor(Math.random() * famousWriters.length)];
    const timestamp = Date.now(); // Add timestamp for uniqueness

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'poetry':
        systemPrompt = `You are a creative poet who writes ${styleVariation} poetry for a girlfriend. Create unique, heartfelt poems that feel personal and genuine. Focus on romantic love, deep emotions, and intimate connections. Each poem should be completely different from typical love poems. IMPORTANT: Make this poem about ${context} and use ${romanticTheme} as inspiration. Draw inspiration from the style of ${famousWriter} but make it original. ALWAYS keep it positive, uplifting, and happy - no sad or depressing themes! Write complete, coherent sentences that flow naturally. AVOID starting with "In the..." or similar repetitive openings. Be creative and varied in your sentence structure.`;
        userPrompt = `Write a short, ${styleVariation} love poem in 1-3 complete sentences for a girlfriend. Make it unique and unexpected while still being deeply romantic. Focus on ${context} and draw inspiration from themes of ${romanticTheme}. Be creative and avoid common phrases. Make each word count and create something memorable that expresses deep love. Draw inspiration from ${famousWriter}'s poetic style but make it completely original. Keep it happy, positive, and uplifting - no sadness or heartbreak! Write in complete, flowing sentences. AVOID starting with "In the..." or similar repetitive openings. Be creative and varied. Include a unique timestamp reference: ${timestamp}.`;
        break;
      case 'quote':
        systemPrompt = `You are a wise person who creates ${styleVariation} quotes about romantic love and relationships. Write genuine, heartfelt quotes that feel fresh and original. Focus on deep love and authentic emotions. Each quote should be unique and thought-provoking. IMPORTANT: Make this quote about ${context} and use ${romanticTheme} as inspiration. Draw inspiration from the wisdom of ${famousWriter} but make it original. ALWAYS keep it positive, uplifting, and happy - no sad or depressing themes! Write complete, coherent thoughts that are easy to understand. AVOID starting with "In the..." or similar repetitive openings. Be creative and varied in your sentence structure.`;
        userPrompt = `Write a short, ${styleVariation} love quote in 1-2 complete sentences for a girlfriend. Make it unique and memorable while still being deeply romantic. Focus on ${context} and draw inspiration from themes of ${romanticTheme}. Be creative and avoid common phrases. Create something that feels personal and expresses deep love. Draw inspiration from ${famousWriter}'s wisdom but make it completely original. Keep it happy, positive, and uplifting - no sadness or heartbreak! Write in clear, complete sentences. AVOID starting with "In the..." or similar repetitive openings. Be creative and varied. Include a unique timestamp reference: ${timestamp}.`;
        break;
      case 'note':
        systemPrompt = `You are someone writing a ${styleVariation} personal note to your girlfriend. Write warm, encouraging messages that feel genuine and heartfelt. Focus on romantic love and deep connection. Make each note feel personal and unique. IMPORTANT: Make this note about ${context} and use ${romanticTheme} as inspiration. Draw inspiration from the romantic style of ${famousWriter} but make it original. ALWAYS keep it positive, uplifting, and happy - no sad or depressing themes! Write complete, natural sentences that sound like a real person speaking. AVOID starting with "In the..." or similar repetitive openings. Be creative and varied in your sentence structure.`;
        userPrompt = `Write a sweet, ${styleVariation} love note in 1-2 complete sentences for your girlfriend. Make it unique and personal while still being deeply romantic. Focus on ${context} and draw inspiration from themes of ${romanticTheme}. Be creative and avoid common phrases. Make it feel like a genuine message of deep love from the heart. Draw inspiration from ${famousWriter}'s romantic style but make it completely original. Keep it happy, positive, and uplifting - no sadness or heartbreak! Write in natural, complete sentences. AVOID starting with "In the..." or similar repetitive openings. Be creative and varied. Include a unique timestamp reference: ${timestamp}.`;
        break;
      default:
        throw new Error('Invalid content type');
    }

    console.log('🤖 Making request to OpenAI API with inspiration:', romanticTheme);
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
        max_tokens: 200,
        temperature: 1.5,
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

    // Add to recent content to prevent repetition
    const contentKey = `${cleanContent.toLowerCase()}-${type}-${timestamp}`;
    recentContent.add(contentKey);
    
    // Keep only last 100 items to prevent memory issues
    if (recentContent.size > 100) {
      const firstItem = recentContent.values().next().value;
      recentContent.delete(firstItem);
    }

    const result = { 
      content: cleanContent,
      type: type,
      author: type === 'note' ? undefined : 'Anonymous',
      romanticTheme: romanticTheme
    };

    console.log('🎁 Returning generated content:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('💥 Error generating content:', error);
    
    // Always return a valid response, even if OpenAI fails
    const fallbackContent = {
      poetry: [
        "Your love is like sunshine breaking through clouds, warming my heart with every smile.",
        "In your eyes, I see the future we'll build together, beautiful and bright.",
        "Your laughter echoes in my dreams, making every night feel like a sweet serenade.",
        "Like stars that guide sailors home, your love lights my path through every storm.",
        "Your touch ignites fireworks in my soul, painting the sky with colors of joy.",
        "With every heartbeat, I fall deeper into the magic of loving you completely.",
        "Your love is the melody that makes my heart sing songs of endless devotion.",
        "Like morning dew on rose petals, your presence brings beauty to every moment.",
        "Your smile is the sunrise that brightens my darkest days with pure radiance.",
        "In your arms, I've found the home my heart has been searching for all along."
      ],
      quote: [
        "You are my favorite hello and my hardest goodbye.",
        "Love is not finding someone to live with, but finding someone you can't live without.",
        "In a world full of people, my eyes will always search for you.",
        "You don't just make my heart smile, you make my soul dance.",
        "Every love story is beautiful, but ours is my favorite.",
        "Your love is the greatest adventure I've ever embarked on.",
        "With you, every day feels like a beautiful new beginning.",
        "You're not just my love, you're my best friend and soulmate.",
        "In your arms, I've found my safe haven and my greatest joy.",
        "Your love makes every moment feel like pure magic.",
        // Famous literary quotes
        "Shall I compare thee to a summer's day? Thou art more lovely and more temperate. - William Shakespeare",
        "I have loved the stars too fondly to be fearful of the night. - Sarah Williams",
        "Love is not love which alters when it alteration finds. - William Shakespeare",
        "The best thing to hold onto in life is each other. - Audrey Hepburn",
        "Love is composed of a single soul inhabiting two bodies. - Aristotle"
      ],
      note: [
        "Just thinking of you makes my day brighter. You mean everything to me.",
        "Your presence in my life is like finding a rainbow after every storm.",
        "I'm so grateful for the way you make ordinary moments extraordinary.",
        "You have this incredible way of turning my worries into wonder.",
        "Thank you for being the person who makes my heart feel safe and loved.",
        "Every morning I wake up grateful that you're in my life.",
        "Your love gives me strength I never knew I had.",
        "You make every day feel like a beautiful adventure.",
        "Thank you for being the light that brightens my darkest days.",
        "Your love is the greatest gift I've ever received."
      ]
    };

    const { type } = await req.json().catch(() => ({ type: 'note' }));
    const contentArray = fallbackContent[type] || fallbackContent.note;
    const randomContent = contentArray[Math.floor(Math.random() * contentArray.length)];
    
    return new Response(JSON.stringify({ 
      content: randomContent,
      type: type,
      author: type === 'note' ? undefined : 'Anonymous',
      fallback: true
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
