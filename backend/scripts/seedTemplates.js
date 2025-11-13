const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || './database.sqlite',
  logging: false,
});
global.sequelize = sequelize;

const Template = require('../models/Template');

const defaultTemplates = [
  {
    name: 'Instagram Story',
    category: 'social',
    description: 'Vertical 9:16 format perfect for Instagram Stories with bold text and eye-catching visuals',
    isPremium: false,
    layout: { aspectRatio: '9:16', orientation: 'vertical', sections: ['header', 'visual', 'cta'] },
    styleGuide: { fontSize: 'large', emphasis: 'visual-first', ctaPosition: 'bottom' }
  },
  {
    name: 'Facebook Feed Post',
    category: 'social',
    description: 'Square 1:1 format optimized for Facebook feed with balanced text and image',
    isPremium: false,
    layout: { aspectRatio: '1:1', orientation: 'square', sections: ['image', 'headline', 'description'] },
    styleGuide: { fontSize: 'medium', emphasis: 'balanced', ctaPosition: 'inline' }
  },
  {
    name: 'LinkedIn Sponsored Content',
    category: 'social',
    description: 'Professional template for LinkedIn with focus on credibility and clear messaging',
    isPremium: false,
    layout: { aspectRatio: '4:3', orientation: 'landscape', sections: ['logo', 'headline', 'body', 'cta'] },
    styleGuide: { fontSize: 'medium', emphasis: 'text-first', tone: 'professional' }
  },
  {
    name: 'Email Newsletter',
    category: 'email',
    description: 'Clean email template with header, body sections, and clear call-to-action',
    isPremium: false,
    layout: { width: '600px', sections: ['header', 'hero', 'content-blocks', 'footer'] },
    styleGuide: { fontSize: 'readable', spacing: 'comfortable', ctaStyle: 'button' }
  },
  {
    name: 'Display Banner 728x90',
    category: 'display',
    description: 'Leaderboard banner ad with concise messaging',
    isPremium: false,
    layout: { width: '728px', height: '90px', sections: ['logo', 'message', 'cta'] },
    styleGuide: { fontSize: 'small', emphasis: 'cta', animation: 'subtle' }
  },
  {
    name: 'Google Display 300x250',
    category: 'display',
    description: 'Medium rectangle display ad for Google network',
    isPremium: false,
    layout: { width: '300px', height: '250px', sections: ['visual', 'headline', 'cta'] },
    styleGuide: { fontSize: 'medium', emphasis: 'visual', ctaPosition: 'bottom-right' }
  },
  {
    name: 'Premium Video Ad',
    category: 'video',
    description: 'Video ad template with storyboard sections for 15-30 second spots',
    isPremium: true,
    layout: { duration: '15-30s', aspectRatio: '16:9', sections: ['hook', 'problem', 'solution', 'cta'] },
    styleGuide: { pacing: 'fast', emphasis: 'visual-storytelling', music: 'upbeat' }
  },
  {
    name: 'Minimalist Modern',
    category: 'social',
    description: 'Clean, minimalist design with lots of white space and modern typography',
    isPremium: true,
    layout: { aspectRatio: '1:1', orientation: 'square', sections: ['centered-text', 'minimal-visual'] },
    styleGuide: { fontSize: 'large', emphasis: 'typography', palette: 'monochrome' }
  }
];

async function seedTemplates() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    
    console.log('Seeding templates...');
    
    for (const templateData of defaultTemplates) {
      const [template, created] = await Template.findOrCreate({
        where: { name: templateData.name, category: templateData.category },
        defaults: templateData
      });
      
      if (created) {
        console.log(`✓ Created template: ${template.name}`);
      } else {
        console.log(`- Template already exists: ${template.name}`);
      }
    }
    
    console.log('\n✅ Template seeding complete!');
    console.log(`Total templates: ${await Template.count()}`);
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
    process.exit(1);
  }
}

seedTemplates();
