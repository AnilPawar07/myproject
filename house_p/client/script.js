// Animation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add staggered animation to form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        setTimeout(() => {
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
    
    // Load locations
    onPageLoad();
});

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i = 0; i < uiBathrooms.length; i++) {
        if(uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i = 0; i < uiBHK.length; i++) {
        if(uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    
    // Show loading state
    const button = document.getElementById('estimate-button');
    button.classList.add('loading');
    
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    
    // Hide previous result
    estPrice.classList.remove('show');
    
    // Simulate API call (since we don't have a real backend)
    setTimeout(() => {
        // Calculate a random price between 50-150 lakhs based on inputs
        const basePrice = 50;
        const sqftFactor = parseFloat(sqft.value) / 1000 * 20;
        const bhkFactor = bhk * 5;
        const bathFactor = bathrooms * 3;
        const locationFactor = location.selectedIndex * 2;
        
        const estimatedPrice = (basePrice + sqftFactor + bhkFactor + bathFactor + locationFactor).toFixed(2);
        
        // Update result
        estPrice.querySelector('h2').textContent = `₹ ${estimatedPrice} Lakhs`;
        
        // Show result with animation
        estPrice.classList.add('show');
        
        // Remove loading state
        button.classList.remove('loading');
        
        // Add pulse animation to result
        estPrice.style.animation = 'none';
        setTimeout(() => {
            estPrice.style.animation = 'pulse 0.5s ease';
        }, 10);
    }, 1500);
}

function onPageLoad() {
    console.log("document loaded");
    
    // In a real application, we would fetch locations from an API
    // For this demo, we'll use a predefined list
    const locations = [
        "Electronic City",
        "Rajaji Nagar",
        "Whitefield",
        "Indiranagar",
        "Jayanagar",
        "JP Nagar",
        "Bannerghatta Road",
        "Hebbal",
        "HSR Layout",
        "Marathahalli",
        "Koramangala",
        "Sarjapur Road",
        "Yelahanka"
    ];
    
    var uiLocations = document.getElementById("uiLocations");
    $('#uiLocations').empty();
    
    // Add the default option
    var defaultOpt = new Option("Choose a Location", "");
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    $('#uiLocations').append(defaultOpt);
    
    // Add all locations with a slight delay for animation effect
    locations.forEach((location, index) => {
        setTimeout(() => {
            var opt = new Option(location);
            $('#uiLocations').append(opt);
        }, index * 50);
    });
    
    // Add input animations
    const inputElements = document.querySelectorAll('input, select');
    inputElements.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const card = document.querySelector('.card');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    card.style.transform = `translateY(-5px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

document.addEventListener('mouseleave', function() {
    const card = document.querySelector('.card');
    card.style.transform = 'translateY(-5px) rotateY(0deg) rotateX(0deg)';
});

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(style);