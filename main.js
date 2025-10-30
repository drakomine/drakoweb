// Store current checkout data globally
let checkoutData = {
    rankName: '',
    basePrice: 0,
    finalPrice: 0,
    username: '',
    platform: '',
    email: ''
};

const COUPON_DISCOUNT = 20; // ₹20 off
const RECIPIENT_EMAIL = 'drakomine.official@gmail.com';
const API_TOKEN_PLACEHOLDER = 'YOUR_SECRET_SKRIPT_API_TOKEN_HERE';

// Utility to perform the counting animation
function countUp(targetId, finalValue) {
    const element = document.getElementById(targetId);
    let current = 0;
    const duration = 1500;
    const stepTime = 10;
    const totalSteps = duration / stepTime;
    const stepValue = finalValue / totalSteps;

    const timer = setInterval(() => {
        current += stepValue;
        if (current >= finalValue) {
            clearInterval(timer);
            // Ensure member count shows 50+ as requested
            element.textContent = targetId === 'member-count' ? `${finalValue}+` : finalValue;
        } else {
            element.textContent = Math.round(current);
        }
    }, stepTime);
}

// --- Price & UI Updates ---

function updatePriceDisplay(basePrice) {
    const finalPrice = basePrice - COUPON_DISCOUNT;
    
    document.getElementById('base-price-display').textContent = `₹${basePrice}`;
    document.getElementById('coupon-discount-display').textContent = `-₹${COUPON_DISCOUNT}`;
    document.getElementById('total-price-display').textContent = `₹${finalPrice}`;

    checkoutData.basePrice = basePrice;
    checkoutData.finalPrice = finalPrice;
}

// --- Modal Controls ---

function openModal(rankName, basePrice) {
    checkoutData.rankName = rankName;
    
    document.getElementById('modal-rank-title').textContent = `Checkout: ${rankName}`;
    updatePriceDisplay(basePrice);
    
    // Reset to form step and ensure payment/api steps are hidden
    document.getElementById('step-form').classList.remove('hidden');
    document.getElementById('step-payment').classList.add('hidden');
    document.getElementById('step-api').classList.add('hidden');

    // Show modal with transition
    const modal = document.getElementById('payment-modal');
    modal.classList.remove('pointer-events-none', 'opacity-0', 'hidden');
    modal.classList.add('flex');
    document.getElementById('modal-content').classList.remove('scale-95');
    document.getElementById('modal-content').classList.add('scale-100');
}

function closeModal() {
    const modal = document.getElementById('payment-modal');
    document.getElementById('modal-content').classList.remove('scale-100');
    document.getElementById('modal-content').classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('pointer-events-none', 'opacity-0', 'hidden');
        modal.classList.remove('flex');
        document.getElementById('checkout-form').reset();
        // Reset the radio button state visually
        document.querySelectorAll('input[name="platform"]').forEach(radio => {
            radio.checked = false;
        });
    }, 300);
}

// --- Checkout Flow ---

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedPlatform = document.querySelector('input[name="platform"]:checked');
    if (!selectedPlatform) {
        // Use a simple console message instead of alert()
        console.error("Please select a platform (Java or Bedrock)."); 
        return;
    }

    // Collect user input
    checkoutData.username = document.getElementById('username').value.trim();
    checkoutData.email = document.getElementById('email').value.trim();
    checkoutData.platform = selectedPlatform.value;

    // Update payment and Skript API details
    document.getElementById('final-amount-display').textContent = `Final Amount: ₹${checkoutData.finalPrice}`;
    document.getElementById('api-token-code').textContent = API_TOKEN_PLACEHOLDER;
    
    // API Payload: Ensures only the base rank name (e.g., "VVIP") is used
    const baseRank = checkoutData.rankName.split(' ')[0];
    document.getElementById('api-payload-code').textContent = JSON.stringify({
        rank: baseRank, 
        username: checkoutData.username,
        platform: checkoutData.platform
    }, null, 2);

    // Show payment and API steps, hide form step
    document.getElementById('step-form').classList.add('hidden');
    document.getElementById('step-payment').classList.remove('hidden');
    document.getElementById('step-api').classList.remove('hidden');
});


function sendMailProof() {
    const subject = `DRAKOMINE RANK PURCHASE: ${checkoutData.rankName} for ${checkoutData.username}`;
    
    // Create the body with collected data and instructions
    const body = `
Dear DRAKOMINE Team,

A new rank purchase has been made.

--- USER DETAILS ---
Username: ${checkoutData.username}
Platform: ${checkoutData.platform}
Email: ${checkoutData.email}
--------------------

--- PURCHASE SUMMARY ---
Rank Purchased: ${checkoutData.rankName}
Amount Paid: ₹${checkoutData.finalPrice}
Payment Date: ${new Date().toLocaleDateString('en-IN')}
--------------------------

Please process the rank upgrade after confirming the payment proof.

Payment Proof (upload screenshot): [PLEASE ATTACH THE PAYMENT SCREENSHOT HERE]
`;

    // Use mailto: protocol
    const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    
    // Open user's default email client
    window.location.href = mailtoLink;
}

// --- Immediate Execution Code (Replaces window.onload) ---

// Initialize Lucide icons immediately
lucide.createIcons();

// Start the counting animation for Purchases (Target: 6)
countUp('purchase-count', 6);

// Start the counting animation for Members (Target: 50 for 50+)
countUp('member-count', 50);

// Close modal if user clicks outside the content (on the backdrop)
document.getElementById('payment-modal').addEventListener('click', function(e) {
    if (e.target.id === 'payment-modal') {
        closeModal();
    }
});
