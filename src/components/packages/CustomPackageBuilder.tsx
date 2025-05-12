import React, { useState, useEffect } from 'react'

// Activity categories and the activities within each category
const activityCategories = [
  {
    id: 'culinary',
    name: 'Culinary Experiences',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    activities: [
      { id: 'dining-tour', name: 'Michelin-Quality Bitcoin Dining Tour', duration: '1 day', price: 0.01, description: 'A progressive dinner across Chef Júlio Pereira\'s exclusive restaurants' },
      { id: 'wine-cheese', name: 'Natural Wine & Local Cheese Tasting', duration: '3 hours', price: 0.005, description: 'Private tasting session of natural wines paired with Azorean artisanal cheeses' },
      { id: 'cooking-class', name: 'Madeiran Cooking Workshop', duration: '4 hours', price: 0.0075, description: 'Learn to cook traditional Madeiran dishes with local ingredients' },
    ]
  },
  {
    id: 'adventure',
    name: 'Outdoor Adventures',
    color: 'bg-green-100 text-green-800 border-green-200',
    activities: [
      { id: 'yacht-day', name: 'Luxury Bitcoin Yacht Day', duration: '1 day', price: 0.02, description: 'Full-day private yacht charter with stops at secluded beaches' },
      { id: 'adrenaline', name: 'Adrenaline Seeker\'s Package', duration: '1 day', price: 0.015, description: 'Experience climbing, canyoning and other extreme sports with professional guides' },
      { id: 'golf-retreat', name: 'Premium Bitcoin Golf Retreat', duration: '4 hours', price: 0.01, description: 'Golf at one of Madeira\'s most scenic courses' },
      { id: 'hiking', name: 'Guided Levada Walk', duration: '6 hours', price: 0.007, description: 'Hike along Madeira\'s famous levada water channels with stunning views' },
    ]
  },
  {
    id: 'wellness',
    name: 'Wellness & Relaxation',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    activities: [
      { id: 'wellness-journey', name: 'Bitcoin Wellness Journey', duration: '1 day', price: 0.018, description: 'A full day of wellness treatments, yoga sessions, and holistic health consultations' },
      { id: 'beauty-day', name: 'Beauty & Relaxation Day', duration: '5 hours', price: 0.012, description: 'Full-day beauty and wellness treatments at premium providers' },
      { id: 'yoga', name: 'Sunrise Yoga Session', duration: '1.5 hours', price: 0.003, description: 'Early morning yoga with ocean views' },
    ]
  },
  {
    id: 'cultural',
    name: 'Cultural Experiences',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    activities: [
      { id: 'artisan-tour', name: 'Traditional Madeira Artisan Tour', duration: '4 hours', price: 0.008, description: 'Hands-on workshops with traditional artisans' },
      { id: 'photography', name: 'Bitcoin Foodie Photography Tour', duration: '6 hours', price: 0.01, description: 'Guided food tour with professional photography instruction' },
      { id: 'history', name: 'Funchal Historical Tour', duration: '3 hours', price: 0.005, description: 'Guided walking tour of Funchal\'s historic sites' },
    ]
  },
]

// Package durations options
const durationOptions = [
  { id: '1-day', name: '1 Day Experience', nights: 0 },
  { id: '2-days', name: '2 Days / 1 Night', nights: 1 },
  { id: '3-days', name: '3 Days / 2 Nights', nights: 2 },
  { id: '5-days', name: '5 Days / 4 Nights', nights: 4 },
  { id: '7-days', name: '7 Days / 6 Nights', nights: 6 },
]

// Accommodation options
const accommodationOptions = [
  { id: 'none', name: 'No Accommodation', pricePerNight: 0 },
  { id: 'standard', name: 'Standard Bitcoin-Friendly Hotel', pricePerNight: 0.005 },
  { id: 'premium', name: 'Premium Hotel or Villa', pricePerNight: 0.01 },
  { id: 'luxury', name: 'Luxury Resort', pricePerNight: 0.02 },
]

export function CustomPackageBuilder() {
  const [selectedDurationId, setSelectedDurationId] = useState<string>(durationOptions[0].id);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string>(accommodationOptions[0].id);
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Find selected objects based on IDs
  const selectedDuration = durationOptions.find(d => d.id === selectedDurationId);
  const selectedAccommodation = accommodationOptions.find(a => a.id === selectedAccommodationId);

  // Recalculate price when selections change
  useEffect(() => {
    let newTotal = 0;

    // Accommodation cost
    const nights = selectedDuration?.nights ?? 0;
    const pricePerNight = selectedAccommodation?.pricePerNight ?? 0;
    newTotal += nights * pricePerNight;

    // Activities cost
    selectedActivityIds.forEach(activityId => {
      activityCategories.forEach(category => {
        const activity = category.activities.find(act => act.id === activityId);
        if (activity) {
          newTotal += activity.price;
        }
      });
    });

    setTotalPrice(newTotal);

  }, [selectedDurationId, selectedAccommodationId, selectedActivityIds, selectedDuration, selectedAccommodation]);

  // Handle activity selection toggle
  const handleActivityToggle = (activityId: string) => {
    setSelectedActivityIds(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSubmit = () => {
    // In a real app, this would send the data to a backend or trigger another action
    console.log("Custom Package Request:");
    console.log("Duration:", selectedDuration);
    console.log("Accommodation:", selectedAccommodation);
    console.log("Selected Activities:", selectedActivityIds);
    console.log("Estimated Total Price (BTC):", totalPrice.toFixed(5)); // Format for display
    alert(`Selections submitted (check console). Estimated Price: ${totalPrice.toFixed(5)} BTC`);
  };

  // Styling constants based on "sunset warm" theme on top of gradient bg
  const builderBg = "bg-warm-sand"; // Main background for the builder component itself
  const primaryText = "text-deep-amber"; // Primary text within the builder
  const secondaryText = "text-amber-700"; // Slightly darker amber for secondary details (using Tailwind's default amber)
  const titleText = "text-bitcoin"; // Bitcoin orange for titles
  const accentColor = "text-bitcoin focus:ring-bitcoin"; // Accent for inputs
  const buttonBg = "bg-bitcoin hover:bg-bitcoin/90"; // Bitcoin button
  const itemBg = "bg-white hover:bg-orange-50"; // Background for individual options (radio/checkbox labels)
  const itemBorder = "border-soft-peach"; // Border for items

  return (
    // Apply warm background, rounded corners, shadow to lift it off the page gradient
    <div className={`${builderBg} bg-opacity-95 p-6 sm:p-8 rounded-xl shadow-lg space-y-8 ${primaryText}`}>

      {/* Duration Selection */}
      <fieldset className="space-y-3">
        <legend className={`text-lg font-semibold ${titleText} mb-3`}>Choose Your Trip Duration</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {durationOptions.map((option) => (
            <label key={option.id} className={`flex items-center p-3 rounded-md border ${itemBorder} ${itemBg} cursor-pointer transition-colors`}>
              <input
                type="radio"
                name="duration"
                value={option.id}
                checked={selectedDurationId === option.id}
                onChange={(e) => setSelectedDurationId(e.target.value)}
                className={`h-4 w-4 ${accentColor} border-deep-amber focus:ring-offset-warm-sand`}
              />
              <span className={`ml-3 text-sm font-medium ${primaryText}`}>{option.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Accommodation Selection */}
      <fieldset className="space-y-3">
        <legend className={`text-lg font-semibold ${titleText} mb-3`}>Choose Accommodation</legend>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {accommodationOptions.map((option) => (
            <label key={option.id} className={`flex items-center p-3 rounded-md border ${itemBorder} ${itemBg} cursor-pointer transition-colors`}>
              <input
                type="radio"
                name="accommodation"
                value={option.id}
                checked={selectedAccommodationId === option.id}
                onChange={(e) => setSelectedAccommodationId(e.target.value)}
                className={`h-4 w-4 ${accentColor} border-deep-amber focus:ring-offset-warm-sand`}
              />
              <div className="ml-3">
                 <span className={`block text-sm font-medium ${primaryText}`}>{option.name}</span>
                 {option.pricePerNight > 0 && (
                    <span className={`block text-xs ${secondaryText}`}>({option.pricePerNight.toFixed(3)} BTC/night)</span>
                 )}
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Activity Selection */}
      <fieldset>
        <legend className={`text-lg font-semibold ${titleText} mb-5`}>Select Activities</legend>
        <div className="space-y-6">
          {activityCategories.map((category) => (
            // Use subtle borders to group activities within the warm background
            <div key={category.id} className={`p-4 rounded-lg border ${itemBorder} bg-white/50 space-y-3`}> 
              <h3 className={`text-md font-semibold ${titleText} mb-2`}>
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.activities.map((activity) => (
                  <label key={activity.id} className={`flex items-start p-3 rounded-md border ${itemBorder} ${itemBg} cursor-pointer transition-colors`}>
                    <input
                      type="checkbox"
                      value={activity.id}
                      checked={selectedActivityIds.includes(activity.id)}
                      onChange={() => handleActivityToggle(activity.id)}
                      className={`mt-1 h-4 w-4 ${accentColor} border-deep-amber rounded focus:ring-offset-warm-sand`}
                    />
                    <div className="ml-3 flex-1">
                      <span className={`block text-sm font-medium ${primaryText}`}>{activity.name}</span>
                      <span className={`block text-xs ${secondaryText} italic`}>{activity.duration}</span>
                      <p className={`mt-1 text-xs ${secondaryText}`}>{activity.description}</p>
                    </div>
                     {/* Price in Bitcoin Orange */}
                     <span className={`ml-4 text-sm font-semibold ${titleText} whitespace-nowrap`}>{activity.price.toFixed(3)} BTC</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Total Price Display */}
      <div className={`pt-6 border-t ${itemBorder}`}> 
        <div className="flex justify-between items-center">
          <span className={`text-xl font-bold ${titleText}`}>Estimated Total Price:</span>
          <span className={`text-xl font-bold ${titleText}`}>{totalPrice.toFixed(5)} BTC</span>
        </div>
         <p className={`text-xs ${secondaryText} mt-2`}>
           Final price may vary based on availability and specific arrangements. This is an estimate for planning purposes.
         </p>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className={`inline-flex items-center justify-center rounded-md border border-transparent ${buttonBg} px-6 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-bitcoin focus:ring-offset-2 focus:ring-offset-warm-sand transition-colors disabled:opacity-50`}
          disabled={!selectedDuration || !selectedAccommodation} 
        >
          Review Selections & Request Quote
        </button>
         <p className={`text-xs ${secondaryText} mt-3`}>
           Submitting this form sends your preferences to our team for detailed planning and a final quote.
         </p>
      </div>
    </div>
  );
}
