const OpenAI = require('openai');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @desc    Generate campaign image using OpenAI DALL-E
// @route   POST /api/images/generate
// @access  Private
exports.generateCampaignImage = async (req, res) => {
  try {
    const { templateData, userData } = req.body;

    console.log('Received request:', { templateData, userData });

    // Determine image size based on aspect ratio
    const aspectRatio = templateData.layout?.aspectRatio || '1:1';
    let imageSize = '1024x1024'; // Default square
    
    if (aspectRatio === '16:9') {
      imageSize = '1792x1024'; // Landscape
    } else if (aspectRatio === '9:16') {
      imageSize = '1024x1792'; // Portrait
    }

    // Create a detailed DALL-E prompt for the campaign image
    const dallePrompt = `Professional marketing campaign poster for "${userData.productName}".

⚠️ CRITICAL SPELLING REQUIREMENT ⚠️
ALL TEXT MUST USE CORRECT ENGLISH SPELLING ONLY. 
Verify every word is spelled correctly in standard English.
DO NOT use made-up words or misspellings.

Product: "${userData.productName}"
Platform: ${userData.platform}
Style: ${templateData.name} - ${userData.tone}
Target: ${userData.audience}

Design Requirements:
- Clean, minimal design with limited text
- Product name "${userData.productName}" as main headline (VERIFY CORRECT SPELLING)
- Modern gradient backgrounds (${userData.platform} optimized)
- Professional photography style
- High contrast, bold typography
- Abstract shapes and modern graphics
- Premium aesthetic
${userData.specialOffer ? `- Feature: "${userData.specialOffer}"` : ''}
- No people or faces
- Focus on visual impact over text

If including any text beyond the product name, use ONLY these correctly spelled words:
- Smart, Premium, Professional, Quality, Innovation
- Technology, Modern, Advanced, Reliable, Trusted
- ${userData.keyFeatures ? userData.keyFeatures.split(',').map(f => f.trim()).join(', ') : ''}

IMPORTANT: Minimize text in the image. Focus on stunning visuals and design.
Any text that IS included must be spelled 100% correctly in English.`;

    console.log('Generating image with DALL-E...');
    console.log('Prompt:', dallePrompt);

    // Generate image using OpenAI DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: dallePrompt,
      n: 1,
      size: imageSize,
      quality: "hd",
      style: "vivid"
    });

    const generatedImageUrl = response.data[0].url;
    console.log('DALL-E generated image URL:', generatedImageUrl);

    // Generate marketing content (captions, hashtags, slogans) using GPT
    console.log('Generating marketing content with GPT...');
    const contentPrompt = `Generate engaging marketing content for this campaign:

Product: ${userData.productName}
Category: ${userData.category}
Target Audience: ${userData.audience}
Tone: ${userData.tone}
Platform: ${userData.platform}
Description: ${userData.productDescription || 'Premium quality product'}
Key Features: ${userData.keyFeatures || 'Innovative and reliable'}
${userData.specialOffer ? `Special Offer: ${userData.specialOffer}` : ''}
Goal: ${userData.targetGoal || 'engagement'}

Provide:
1. A catchy slogan (one line)
2. Three engaging captions for ${userData.platform} (varying lengths: short, medium, long)
3. 10-15 relevant hashtags (mix of popular and niche)
4. A clear call-to-action

Format the response as JSON with keys: slogan, captions (array), hashtags (array), callToAction`;

    let marketingContent = {
      slogan: `${userData.productName} - ${userData.tone} excellence`,
      captions: [
        `${userData.productName} is here! ${userData.specialOffer || 'Get yours today!'}`,
        `Discover ${userData.productName} - ${userData.keyFeatures || 'premium quality'}. Perfect for ${userData.audience}.`,
        `Looking for ${userData.category} that delivers? ${userData.productName} brings you ${userData.keyFeatures || 'innovation and quality'}. ${userData.specialOffer || 'Experience the difference today!'}`
      ],
      hashtags: userData.hashtags ? userData.hashtags.split(/[\s,]+/).filter(h => h) : [`#${userData.productName.replace(/\s+/g, '')}`, `#${userData.category}`, `#${userData.platform}`],
      callToAction: `Shop ${userData.productName} Now!`
    };

    try {
      const contentResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional marketing copywriter. Generate engaging, platform-optimized marketing content. Always respond with valid JSON only."
          },
          {
            role: "user",
            content: contentPrompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      const generatedText = contentResponse.choices[0].message.content;
      console.log('GPT generated content:', generatedText);
      
      // Try to parse JSON response
      try {
        const parsedContent = JSON.parse(generatedText);
        marketingContent = parsedContent;
      } catch (parseError) {
        console.log('Could not parse GPT response as JSON, using fallback content');
      }
    } catch (gptError) {
      console.error('GPT content generation error:', gptError.message);
      console.log('Using fallback marketing content');
    }

    // Try to upload to Cloudinary if configured
    let finalImageUrl = generatedImageUrl;
    let cloudinaryId = null;

    if (process.env.CLOUDINARY_CLOUD_NAME && 
        process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name') {
      try {
        const uploadResult = await cloudinary.uploader.upload(generatedImageUrl, {
          folder: 'campaign_images',
          public_id: `campaign_${userData.productName.replace(/\s+/g, '_')}_${Date.now()}`,
          resource_type: 'image',
          transformation: [
            { quality: 'auto:best' },
            { fetch_format: 'auto' }
          ]
        });
        finalImageUrl = uploadResult.secure_url;
        cloudinaryId = uploadResult.public_id;
        console.log('Image uploaded to Cloudinary:', finalImageUrl);
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError.message);
        console.log('Using OpenAI URL instead');
      }
    } else {
      console.log('Cloudinary not configured, using OpenAI URL');
    }

    res.status(200).json({
      success: true,
      imageUrl: finalImageUrl,
      cloudinaryId: cloudinaryId,
      dallePrompt: dallePrompt, // Include the AI prompt used
      generatedContent: {
        slogan: marketingContent.slogan,
        captions: marketingContent.captions,
        hashtags: marketingContent.hashtags,
        callToAction: marketingContent.callToAction,
        summary: `Campaign generated for ${userData.productName} using DALL-E 3 and GPT-3.5`
      }
    });

  } catch (error) {
    console.error('Image generation error:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to generate campaign image',
      error: error.message
    });
  }
};
