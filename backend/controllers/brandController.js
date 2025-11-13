const BrandProfile = require('../models/BrandProfile');

// Get company's brand profile
exports.getBrandProfile = async (req, res) => {
  try {
    if (!req.companyId) {
      return res.status(400).json({ success: false, message: 'User is not associated with a company' });
    }
    
    const profile = await BrandProfile.findOne({ where: { companyId: req.companyId } });
    
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Brand profile not found' });
    }
    
    res.status(200).json({ success: true, brandProfile: profile });
  } catch (error) {
    console.error('getBrandProfile error:', error);
    res.status(500).json({ success: false, message: 'Error fetching brand profile' });
  }
};

// Create or update brand profile
exports.upsertBrandProfile = async (req, res) => {
  try {
    if (!req.companyId) {
      return res.status(400).json({ success: false, message: 'User is not associated with a company' });
    }
    
    const {
      brandName,
      logoUrl,
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily,
      brandVoice,
      tagline,
      brandGuidelines,
      customData
    } = req.body;
    
    const [profile, created] = await BrandProfile.findOrCreate({
      where: { companyId: req.companyId },
      defaults: {
        companyId: req.companyId,
        brandName,
        logoUrl,
        primaryColor,
        secondaryColor,
        accentColor,
        fontFamily,
        brandVoice,
        tagline,
        brandGuidelines,
        customData
      }
    });
    
    if (!created) {
      // Update existing profile
      await profile.update({
        brandName: brandName !== undefined ? brandName : profile.brandName,
        logoUrl: logoUrl !== undefined ? logoUrl : profile.logoUrl,
        primaryColor: primaryColor !== undefined ? primaryColor : profile.primaryColor,
        secondaryColor: secondaryColor !== undefined ? secondaryColor : profile.secondaryColor,
        accentColor: accentColor !== undefined ? accentColor : profile.accentColor,
        fontFamily: fontFamily !== undefined ? fontFamily : profile.fontFamily,
        brandVoice: brandVoice !== undefined ? brandVoice : profile.brandVoice,
        tagline: tagline !== undefined ? tagline : profile.tagline,
        brandGuidelines: brandGuidelines !== undefined ? brandGuidelines : profile.brandGuidelines,
        customData: customData !== undefined ? customData : profile.customData
      });
    }
    
    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? 'Brand profile created' : 'Brand profile updated',
      brandProfile: profile
    });
  } catch (error) {
    console.error('upsertBrandProfile error:', error);
    res.status(500).json({ success: false, message: 'Error saving brand profile' });
  }
};
