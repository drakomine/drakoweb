// --- Configuration ---
const API_ENDPOINT = "http://gc1.lordcloud.ovh:25531/api/rank-purchase";
const API_KEY = "drakosecretkey"; // Matches the Skript option
const ADMIN_EMAIL = "drakomine.official@gmail.com";
const qrCodeImage = "IMG_20251028_214647.jpg"; // Placeholder path

const ranksData = [
    {
        name: 'VIP', price: 60, description: 'Budget: The essential upgrade.', color: 'yellow', isPopular: false, buttonText: 'Buy VIP', featureIconColor: '#facc15',
        features: [
            { text: '<strong>VIP Tag</strong> in Discord & Server' },
            { text: 'Can set <strong>2 homes</strong> at a time' },
            { text: 'Extra inventory <strong>Level 4 (bp)</strong>' },
            { text: 'Can have <strong>20 shops</strong> at a time' },
            { text: '<strong>3 extra hearts</strong>' },
            { text: 'Can use <strong>/rtp free</strong>' },
            { text: '<strong>$50 Daily Reward</strong>' },
            { text: 'Good Support' }
        ]
    },
    {
        name: 'VVIP', price: 110, description: 'Budget: The full server experience.', color: 'red', isPopular: true, buttonText: 'Buy VVIP', featureIconColor: '#f87171',
        features: [
            { text: '<strong>VVIP Tag</strong> in Discord & Server' },
            { text: 'Can set <strong>5 homes</strong> at a time' },
            { text: 'Extra inventory <strong>Level 6 (bp)</strong>' },
            { text: 'Can have <strong>50 shops</strong> at a time' },
            { text: '<strong>10 extra hearts</strong>' },
            { text: '<strong>Carry Villager</strong> in inventory' },
            { text: 'Can use <strong>/rtp free</strong>' },
            { text: '<strong>$100 Daily Reward</strong>' },
            { text: '<strong>Premium Support</strong>' }
        ]
    },
    {
        name: 'AURA+', price: 170, description: 'Budget: Maximum power and convenience.', color: 'purple', isPopular: false, buttonText: 'Buy AURA+', featureIconColor: '#c084fc',
        features: [
            { text: '<strong>AURA+ Tag</strong> in Discord & Server' },
            { text: 'Can set <strong>7 homes</strong> at a time' },
            { text: 'Extra inventory <strong>Level 6 (bp)</strong>' },
            { text: 'Can have <strong>60 shops</strong> at a time' },
            { text: 'Massive <strong>20 extra hearts</strong>' },
            { text: '<strong>All skills max (Level-10)</strong>' },
            { text: '<strong>Carry Villager</strong> in inventory' },
            { text: '<strong>Carry Mobs</strong> in inventory' },
            { text: 'Exclusive Command: <strong>Night Vision (/nv)</strong>' },
            { text: '<strong>$300 Daily Reward</strong>' },
            { text: '<strong>$3,000 Instant</strong> cash-in' },
            { text: 'Can use <strong>/rtp free</strong>' },
            { text: '<strong>Premium Support</strong>' }
        ]
    },
    {
        name: 'ELITE', price: 390, description: 'Premium: Power and exclusivity.', color: 'blue', isPopular: false, buttonText: 'Buy ELITE', featureIconColor: '#3b82f6',
        features: [
            { text: '<strong>ELITE Tag</strong> in Discord & Server' },
            { text: 'Can set <strong>7 homes</strong> at a time' },
            { text: 'Extra inventory <strong>Level 6 (bp)</strong>' },
            { text: 'Can have <strong>60 shops</strong> at a time' },
            { text: 'Massive <strong>20 extra hearts</strong>' },
            { text: '<strong>All skills max (Level-10)</strong>' },
            { text: '<strong>Carry Villager</strong> in inventory' },
            { text: '<strong>Carry Mobs</strong> in inventory' },
            { text: 'Exclusive Command: <strong>Night Vision (/nv)</strong>' },
            { text: '<strong>$300 Daily Reward</strong>' },
            { text: '<strong>$5,000 Instant</strong> cash-in' },
            { text: 'Can use <strong>/rtp free</strong>' },
            { text: '<strong>Premium Support</strong>' }
        ]
    },
    {
        name: 'SIGMA', price: 440, description: 'Premium: Ultimate power and status.', color: 'fuchsia', isPopular: true, buttonText: 'Buy SIGMA', featureIconColor: '#d946ef',
        features: [
            { text: '<strong>SIGMA Tag</strong> in Discord & Server' },
            { text: 'Can set <strong>7 homes</strong> at a time' },
            { text: 'Extra inventory <strong>Level 6 (bp)</strong>' },
            { text: 'Can have <strong>60 shops</strong> at a time' },
            { text: 'Massive <strong>20 extra hearts</strong>' },
            { text: '<strong>All skills max (Level-10)</strong>' },
            { text: '<strong>Carry Villager</strong> in inventory' },
            { text: '<strong>Carry Mobs</strong> in inventory' },
            { text: 'Exclusive Command: <strong>Night Vision (/nv)</strong>' },
            { text: '<strong>$300 Daily Reward</strong>' },
            { text: '<strong>$10,000 Instant</strong> cash-in' },
            { text: 'Can use <strong>/rtp free</strong>' },
            { text: '<strong>Premium Support</strong>' }
        ]
    },
    {
        name: 'GEN-Z', price: 490, description: 'Premium: The peak of server privilege.', color: 'cyan', isPopular: false, buttonText: 'Buy GEN-Z', featureIconColor: '#06b6d4',
        features: [
            { text: '<strong>GEN-Z Tag</strong> in Discord & Server' },
            { text: 'Can set <strong>7 homes</strong> at a time' },
            { text: 'Extra inventory <strong>Level 6 (bp)</strong>' },
            { text: 'Can have <strong>60 shops</strong> at a time' },
            { text: 'Massive <strong>20 extra hearts</strong>' },
            { text: '<strong>All skills max (Level-10)</strong>' },
            { text: '<strong>Carry Villager</strong> in inventory' },
            { text: '<strong>Carry Mobs</strong> in inventory' },
            { text: 'Exclusive Command: <strong>Night Vision (/nv)</strong>' },
            { text: '<strong>$300 Daily Reward</strong>' },
            { text: '<strong>$12,000 Instant</strong> cash-in' },
            { text: 'Can use <strong>/rtp free</strong>' },
            { text: '<strong>Premium Support</strong>' }
        ]
    }
];

let currentModalRank = null;
let modalState = { username: '', platform: 'Java', email: '' };

// --- Utility Functions ---

/** Shows a custom message modal (replacing alert/confirm) */
const showMessageModal = (message) => {
    document.getElementById('modal-message').textContent = message;
    document.getElementById('message-modal').classList.remove('hidden');
};

/** Closes the custom message modal */
window.closeMessageModal = () => {
    document.getElementById('message-modal').classList.add('hidden');
};

// --- Main Logic Functions ---

const renderRanks = () => {
    document.getElementById('ranks-container').innerHTML = ranksData.map(rank => {
        const featuresHtml = rank.features.map(f => `<li class="flex items-start"><span class="mr-2 text-${rank.color}-400">✓</span><div>${f.text}</div></li>`).join('');
        
        // Determine if it is a Premium Rank for the Gradient Text
        const isPremiumRank = ['ELITE', 'SIGMA', 'GEN-Z'].includes(rank.name);

        return `
            <section class="rank-card rounded-2xl p-6 shadow-xl ${rank.isPopular ? 'active-rank md:scale-105' : ''}">
                <div class="text-center mb-6">
                    ${rank.isPopular ? '<div class="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-2">Most Popular</div>' : ''}
                    <h2 class="${isPremiumRank ? 'text-3xl font-bold aura-gradient-text' : 'text-3xl font-bold'}" style="${!isPremiumRank ? `color: ${rank.featureIconColor}` : ''}">${rank.name}</h2>
                    <p class="text-base text-gray-400">${rank.description}</p>
                    <div class="mt-3">
                        <span class="text-5xl font-black text-white">₹${rank.price}</span>
                        <span class="text-xl font-medium text-gray-400">/ Month</span>
                    </div>
                </div>
                <ul class="space-y-3 text-sm mb-8 list-none p-0">${featuresHtml}</ul>
                <button onclick="openModal('${rank.name}')" class="w-full bg-${rank.color}-600 hover:bg-${rank.color}-500 font-bold py-3 rounded-xl text-white">${rank.buttonText}</button>
            </section>
        `;
    }).join('');
};

window.openModal = (rankName) => {
    currentModalRank = ranksData.find(r => r.name === rankName);
    modalState = { username: '', platform: 'Java', email: '' };
    showStep(1);
    document.getElementById('payment-modal').classList.remove('hidden');
};

window.closeModal = () => {
    document.getElementById('payment-modal').classList.add('hidden');
};

window.showStep = (step) => {
    const finalPrice = currentModalRank.price - 20;
    if (step === 1) {
        document.getElementById('modal-step-1').innerHTML = `
            <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-red-500">✕</button>
            <h3 class="text-2xl font-bold text-white mb-4">Checkout: ${currentModalRank.name}</h3>
            <div class="p-3 bg-gray-800 rounded-lg border border-gray-700 mb-4">
                <div class="flex justify-between"><span>Original Price:</span><span class="line-through">₹${currentModalRank.price}</span></div>
                <div class="flex justify-between text-yellow-400"><span>Discount (DRAKO):</span><span>- ₹20</span></div>
                <div class="flex justify-between mt-2 pt-2 border-t border-gray-600 text-xl font-bold"><span>Total:</span><span>₹${finalPrice}</span></div>
            </div>
            <form id="details-form" class="space-y-4">
                <input type="text" id="username" placeholder="Minecraft Username" required class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"/>
                <div class="flex gap-4 platform-selector">
                    <input type="radio" id="java" name="platform" value="Java" checked class="hidden"/>
                    <label for="java" class="flex-1">Java</label>
                    <input type="radio" id="bedrock" name="platform" value="Bedrock" class="hidden"/>
                    <label for="bedrock" class="flex-1">Bedrock</label>
                </div>
                <input type="email" id="email" placeholder="Email (Optional)" class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"/>
                <button type="submit" class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl">Proceed to Payment</button>
            </form>
        `;
        document.getElementById('details-form').onsubmit = (e) => {
            e.preventDefault();
            modalState.username = document.getElementById('username').value.trim();
            modalState.platform = document.querySelector('input[name="platform"]:checked').value;
            modalState.email = document.getElementById('email').value.trim();
            if (!modalState.username) {
                showMessageModal('Please enter your Minecraft Username.');
                return;
            }
            showStep(2);
        };
        document.getElementById('modal-step-1').classList.remove('hidden');
        document.getElementById('modal-step-2').classList.add('hidden');
    } else {
        document.getElementById('modal-step-2').innerHTML = `
            <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-red-500">✕</button>
            <h3 class="text-2xl font-bold text-white mb-4 text-center">Scan to Pay</h3>
            <p class="text-gray-400 text-center mb-4">Scan the QR code to pay <strong class="text-white">₹${finalPrice}</strong></p>
            <div class="flex justify-center mb-4">
                <div class="p-2 bg-white rounded-lg border-2 border-gray-400">
                    <img src="${qrCodeImage}" alt="Payment QR Code" class="rounded-md w-64 h-64" onerror="this.onerror=null;this.src='https://placehold.co/256x256/1f2937/d1d5db?text=QR+Code+Placeholder';"/>
                </div>
            </div>
            <div class="text-sm bg-gray-800 p-3 rounded-lg border border-gray-700 mb-4">
                <p><strong>Username:</strong> <span class="font-mono">${modalState.username}</span></p>
                <p><strong>Rank:</strong> <span class="font-mono">${currentModalRank.name}</span></p>
                <p><strong>Platform:</strong> <span class="font-mono">${modalState.platform}</span></p>
                <p><strong>Email:</strong> <span class="font-mono">${modalState.email || 'N/A'}</span></p>
            </div>
            <button onclick="handleConfirmationAndRedirect()" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl mb-2">I've Paid! Submit Proof</button>
            <button onclick="showStep(1)" class="w-full text-gray-400 hover:text-white py-2">Back to details</button>
        `;
        document.getElementById('modal-step-1').classList.add('hidden');
        document.getElementById('modal-step-2').classList.remove('hidden');
    }
};

/** Sends the purchase data to the Skript API endpoint */
const sendRankConfirmation = async () => {
    const finalPrice = currentModalRank.price - 20;

    const payload = {
        username: modalState.username,
        rank: currentModalRank.name,
        platform: modalState.platform,
        price: finalPrice, // Send the final discounted price
        email: modalState.email
    };

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY // Custom header for API key authentication
            },
            body: JSON.stringify(payload)
        });
        
        const responseText = await response.text();

        if (response.ok) {
            console.log('Skript API Success:', responseText);
        } else {
            console.error('Skript API Error:', responseText);
            showMessageModal(`Error submitting purchase to server: ${responseText || response.statusText}. Please contact staff.`);
        }
    } catch (error) {
        console.error('Network Error connecting to Skript API:', error);
        showMessageModal('Warning: Could not instantly connect to the server API. The purchase details have been prepared for email submission (the next step).');
    }
};


/** Handles both sending data and opening mail app (Combines previous functionality) */
window.handleConfirmationAndRedirect = () => {
    // 1. Send the data to the Skript API (non-blocking)
    sendRankConfirmation();

    // 2. Prepare and redirect to the email client (the original functionality)
    const subject = encodeURIComponent(`DRAKOMINE Rank Purchase - ${modalState.username}`);
    const body = encodeURIComponent(`Username: ${modalState.username}\nRank: ${currentModalRank.name}\nPlatform: ${modalState.platform}\nEmail: ${modalState.email || 'Not provided'}\n\n--- Please attach your payment screenshot here ---`);
    
    // Give a short delay before redirecting to allow the user to read the message.
    setTimeout(() => {
        window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
    }, 50);

    closeModal();
    showMessageModal('Purchase details submitted! Check your server for rank approval. Please also attach your payment screenshot to the email client that just opened.');
};

document.getElementById('payment-modal').addEventListener('click', (e) => {
    if (e.target.id === 'payment-modal') closeModal();
});

const animateCounter = (el, end) => {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (timestamp) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(end * progress);
        if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
};

// --- Initialization ---
window.onload = () => {
    renderRanks();
    animateCounter(document.getElementById('purchase-count'), 6);
    animateCounter(document.getElementById('member-count'), 50);
}
