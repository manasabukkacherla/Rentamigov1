"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeProperty = void 0;
const normalizeProperty = (item) => ({
    id: item._id || item.propertyId || '',
    propertyId: item.propertyId || '',
    title: item.basicInformation?.title ||
        item.title ||
        item.pgDetails?.name ||
        item.basicInformation?.propertyName ||
        'Untitled Property',
    location: `${item.basicInformation?.address?.city || ''}, ${item.basicInformation?.address?.state || ''}` ||
        item.basicInformation?.address ||
        item.pgDetails?.address ||
        item.basicInformation?.street ||
        '',
    propertyName: item.metadata?.propertyName || item.metaData?.propertyName || '',
    type: item.metadata?.propertyType || item.metaData?.propertyType || '',
    listingType: 'Owner',
    price: item.rent?.expectedRent ||
        item.rentalTerms?.rentDetails?.expectedRent ||
        item.rentalDetails?.expectedRent ||
        item.pricingDetails?.propertyPrice ||
        item.priceDetails?.propertyPrice ||
        item.price?.expectedPrice ||
        item.leaseTerms?.leaseDetails?.leaseAmount?.amount ||
        item.leaseAmount?.amount ||
        item.leaseTerms?.leaseTerms?.leaseDetails?.leaseAmount?.amount ||
        item.leaseTerms?.leaseAmount?.amount ||
        0,
    area: item.propertyDetails?.area?.totalArea ||
        item.propertySize ||
        item.propertyDetails?.builtUpAreaSqft ||
        item.propertyDetails?.superBuiltUpAreaSqft ||
        item.Agriculturelanddetails?.totalArea ||
        item.plotDetails?.totalPlotArea ||
        item.plotDetails?.totalArea ||
        0,
    image: item.media?.photos?.exterior?.[0] ||
        item.media?.photos?.plot?.[0] ||
        'https://via.placeholder.com/400x300?text=No+Image',
    postedDate: item.metadata?.createdAt instanceof Date
        ? item.metadata.createdAt.toISOString().slice(0, 10)
        : '',
    status: (item.metadata?.status || item.metaData?.status || 'active').toLowerCase(),
    intent: item.metadata?.intent || item.metaData?.intent || '',
    furnishing: item.propertyDetails?.furnishingStatus || 'Unfurnished',
    views: item.metadata?.views || 0,
    inquiries: item.metadata?.inquiries || 0,
    bedrooms: item.propertyDetails?.bedrooms || 0,
    bathrooms: item.propertyDetails?.bathrooms || 0,
    postedBy: {
        type: item.metadata?.postedBy?.type || 'owner',
        name: item.metadata?.postedBy?.name || 'Unknown'
    },
    description: item.metadata?.description || item.metaData?.description || '',
    sqft: (item.propertyDetails?.area?.totalArea || 0).toString()
});
exports.normalizeProperty = normalizeProperty;
